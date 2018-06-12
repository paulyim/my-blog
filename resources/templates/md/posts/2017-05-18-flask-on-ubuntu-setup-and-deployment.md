{:title "Flask 项目部署到 Ubuntu 服务器"
 :layout :post
 :tags  ["web"]
 :toc true}


<br>
## 安装要求
***

* Ubuntu 16.04
* nginx 1.4.6
* gunicorn 19.1.1
* Python 2.7.8
* Pip 1.5.4
* virtualenv 1.11.4
* Flask 0.10.1
* Supervisor 3.0b2


<br>
## 第一步 - 配置
***

<br>
#### 添加一个新的用户
***

```shell
$ adduser newuser
$ adduser newuser sudo
```

新建一个带有 `sudo` 权限的用户。

<br>
#### 安装依赖
***

使用新建的用户 `ssh` 登录到服务器，安装以下依赖包：

```shell
$ sudo apt-get update
$ sudo apt-get install -y python python-pip python-virtualenv nginx gunicorn
```

<br>
#### 配置 Flask
***

在服务器上新建一个目录，如 `/home/www` ，用来存储后面要发布的项目：

```shell
$ sudo mkdir /home/www && cd /home/www
```

通过 `virtualenv` 创建单独的项目运行环境：

```shell
$ sudo virtualenv env
$ source env/bin/activate
```

安装 `Flask`:

```shell
$ sudo pip install Flask==0.10.1
```

然后配置项目：

```shell
$ sudo mkdir flask_project && cd flask_project
$ sudo vim app.py
```

添加以下代码到 `app.py`:

```python
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/')
def index():
	return 'Flask is running!'


@app.route('/data')
def names():
	data = {"names": ["张三", "李四", "王五"]}
	return jsonify(data)


if __name__ == '__main__':
	app.run()
```

> `vim` 的基本使用：通过 `sudo vim app.py` 打开文件后，按下键盘 `i` 进入编辑模式，添加以上代码，按下键盘 `esc` 退出编辑模式回到命令模式，最后输入 **:wq** 指令保存文件并退出 `vim` 编辑器。

配置项目 `static` 目录：

```shell
$ sudo mkdir static
```

然后在 `static` 目录下新建一个 `index.html` 文件并添加测试内容：

```html
<h1>Test!</h1>
```

<br>
#### 配置 Nginx
***

启动 `nginx`:

```shell
$ sudo /etc/init.d/nginx start
```

然后：

```shell
$ sudo rm /etc/nginx/sites-enabled/default
$ sudo touch /etc/nginx/sites-available/flask_project
$ sudo ln -s /etc/nginx/sites-available/flask_project /etc/nginx/sites-enabled/flask_project
```

> 上面，删除了 `nginx` 默认的配置文件，然后创建一个新的配置文件（`flask_project`），最后，软链接这个配置文件到 `nginx` 的启用目录，这样一来，`nginx` 启动后会自动装载这个文件。


现在，配置 `flask_project` 文件：

```shell
$ sudo vim /etc/nginx/sites-enabled/flask_project
```

```Text
server {
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    location /static {
        alias  /home/www/flask_project/static/;
    }
}
```

通过上面的配置，当 `Http` 请求 `/` 就会被 **反向代理** 到服务器本地的端口 **8000**。

同时，上面也配置了项目的静态文件指定目录 `/home/www/flask_project/static/`，这样可以相应地提高网站的访问速度。


保存文件，重启 `nginx`:

```shell
$ sudo /etc/init.d/nginx restart
```

**执行测试：**

```shell
$ cd /home/www/flask_project/
$ gunicorn app:app -b localhost:8000
```

打开浏览器输入：**http://你的IP地址或域名**

就会看到 **“Flask is running!”** 的文字，测试另外一个： **http://你的IP地址或域名/data**，最后测试一下静态目录：**http://你的IP地址或域名/static**


<br>
## 第二步 - Supervisor
***

通过第一步的配置，Flask 应用已经可以正常运行了，但是有一个弊端：每次项目有改动都要手动通过 `gunicorn` 重启应用，这样太过繁琐，通过 `Supervisor` 可以实现自动化。

<br>
#### 配置 Supervisor
***

`SSH` 登录到服务器，然后安装 `Supervisor`:

```shell
$ sudo apt-get install -y supervisor
```

然后创建配置文件：

```shell
$ sudo vim /etc/supervisor/conf.d/flask_project.conf
```

添加：

```Text
[program:flask_project]
command = gunicorn app:app -b localhost:8000
directory = /home/www/flask_project
user = newuser
```

**执行测试：**

```shell
$ sudo pkill gunicorn
```

通过 `supervisor` 启动 `gunicorn`:

```shell
$ sudo supervisorctl reread
$ sudo supervisorctl update
$ sudo supervisorctl start flask_project
```

> 更多 `Supervisor` 自定义配置信息参考：[官方文档](http://supervisord.org/index.html)


<br>
## 第三步 - 部署
***

通过 `git` 来代替手动上传项目到服务器，可以减少繁琐的重复操作和提高工作效率。

<br>
#### 配置 Git
***

同样，`SSH` 登录到远程服务器，然后安装 Git:

```shell
$ sudo apt-get install -y git
```

然后执行以下命令创建一个新的 **git 仓库**，用来存储本地上传的项目文件：

```shell
$ sudo mkdir /home/git && cd /home/git
$ sudo mkdir flask_project.git && cd flask_project.git
$ sudo git init --bare
```

<br>
#### 配置 Git Post-Receive Hook
***

```shell
$ sudo vim hooks/post-receive
```

添加：

```shell
#!/bin/sh
GIT_WORK_TREE=/home/www/flask_project git checkout -f
```

通过上面的配置，`git` 的每次 `push` 都会同步到项目运行的所在目录 `/home/www/flask_project`

设置上面配置文件为可执行：

```shell
$ sudo chmod +x hooks/post-receive
```

**测试**：

回到本地项目的路径（**flask_project**）添加上面配置好的 **git 远程仓库**：

```shell
$ git init
$ git remote add production root@你的IP地址或域名:/home/git/flask_project.git
```
> 【你的IP地址或域名】修改为你实际的 **IP** 或 **域名**

在本地修改一下 `app.py` 的内容：

```python
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/')
def index():
	return 'Flask is running!'


@app.route('/data')
def names():
	data = {
		"names": ["张三", "李四", "王五"],
		"ages": [30, 40, 50]
	}
	return jsonify(data)


if __name__ == '__main__':
	app.run()
```

通过 `git` 同步本地的修改到远程仓库：

```shell
$ git add -A
$ git commit -am "initial"
$ git push production master
```

`SSH` 登录到远程服务器，通过 `Supervisor` 重启 `gunicorn`:

```shell
$ sudo supervisorctl restart flask_project
```

检查内容是否已经同步：**http://你的IP地址或域名/data**


<br>
## 第四步 - 自动化
***

你真的想手动配置一台服务器吗？ 当然，这对学习来说很好，但是这很繁琐。幸运的是，可以通过 `Fabric` 自动化这个过程。除了设置 `nginx`，`gunicorn`，`Supervisor` 和 `Git` 之外，其它可由一个脚步文件自动化，具体可以参考这个示例项目：[repo](https://github.com/realpython/flask-deploy) 该应用程序特定于上面所介绍的 `flask_project`，你可以根据实际需求自定义相应的配置。
> 你应该从文件中删除用户名和密码，并将它们放置在不受版本控制的单独配置文件中，或者在远程服务器上设置 SSH 密钥，以便你不需要密码即可登录。另外，请确保将 `env.hosts` 变量更新为你的 IP 或域名。


<br>
## 工作流
***

一旦具备了以上示例项目的环境配置，本地切换到项目 `flask-deploy` 目录，要在远程服务器以及你的应用程序上设置基本配置，请运行以下命令：

<br>
### 配置命令

***
```shell
$ fab create
```

你的应用程序现在应该可以运行了，在浏览器中测试一下。

<br>
### 部署命令
***

想要使用 Git Hooks 进行部署？在本地 Flask 项目目录中初始化一个 git 本地仓库，然后对 Flask 应用程序进行一些本地更改，然后运行以下命令进行部署：

```shell
$ fab deploy
```

在浏览器中再次检查你的应用程序，确保你的更改已同步。

<br>
### 运行状态
***

最后，你可以使用以下命令检查 `Supervisor` 进程是否正常运行，以确保你的应用程序处于运行状态：

```shell
$ fab status
```

<br>
### 回滚
***

人非圣贤孰能...

只要你还在编码，事情就会不时出错。在你的本地开发环境中，一切都正常工作，但在生产环境可能就会崩溃。因此，制定一个快速恢复 `Git` 提交版本的策略非常重要。查看 `fabfile.py` 中的 `rollback()` 方法，它可以让你快速恢复到上一个正常工作的代码版本。

回滚命令：

```shell
$ fab rollback
```

然后，你可以在本地更新代码以修复错误，然后重新部署。
