{:title "Cryogen-使用Clojure编写的一个静态网站生成器"
 :layout :post
 :tags  ["cryogen"]
 :toc true}

 <br>
 ***
 <br>

 **本博客站点使用 [Cryogen](http://cryogenweb.org/index.html) + [Github Pages](https://pages.github.com/) 搭建而成。**

 本文只作 Cyrogen 的介绍，关于 Github Pages 可查看官方文档或参看这篇博文：[搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)

<br>
## 特性
***

* 使用 Markdown (默认) 或者 AsciiDoc 发布博文或页面
* 文章支持标签分类
* 生成表格内容
* 支持原生的 HTML 页面
* 代码高亮
* 支持 Disqus
* 生成网站地图
* 生成 RSS
* 可编译 Sass/SCSS 文件

<br>
## 安装条件
***

需要安装好 [Leiningen][1] 2.5.0 或以上版本。

[1]: https://github.com/technomancy/leiningen

<br>
## 开始使用
***

<br>
### 使用 lein 创建一个新的模板项目
***

使用以下命令创建一个 Cryogen 站点模板：

```
lein new cryogen my-blog
```

<br>
### 运行项目
***

lein 带有内置的 web 容器，在生成的 `my-blog` 根目录执行以下命令：

```
lein ring server
```

ring 容器被启动后，项目 `resources/templates` 目录的内容更改会被自动同步更新。

<br>
### 站点配置
***

通过 `templates/config.edn` 文件可以配置站点信息，如下所示：

```clojure
{:site-title         "My Awesome Blog"
 :author             "Bob Bobbert"
 :description        "This blog is awesome"
 :site-url           "http://blogawesome.com/"
 :post-root          "posts"
 :page-root          "pages"
 :post-root-uri      "posts-output"
 :page-root-uri      "pages-output"
 :tag-root-uri       "tags-output"
 :author-root-uri    "authors-output"
 :blog-prefix        "/blog"
 :rss-name           "feed.xml"
 :rss-filters        ["cryogen"]
 :recent-posts       3
 :post-date-format   "yyyy-MM-dd"
 :sass-src           nil
 :sass-dest          nil
 :theme              "blue"
 :resources          ["img"]
 :keep-files         [".git"]
 :disqus?            false
 :disqus-shortname   ""
 :ignored-files      [#"\.#.*" #".*\.swp$"]
 :posts-per-page     5
 :blocks-per-preview 2
 :previews?          false
 :clean-urls?        true}
```

详细说明可以参考官方文档 ["Configuration"](http://cryogenweb.org/docs/configuration.html)

<br>
### Markdown 或者 AsciiDoc
***

Cryogen 默认使用 Markdown 生成站点内容，如果想使用 AsciiDoc，修改项目（e.g. `my-blog`）`project.clj` 文件的 `:dependencies` 属性，将 `cryogen-markdown` 改为 `cryogen-asciidoc` 即可。

`cryogen-markdown` ：编译器会编译 `resources/templates/md` 目录下以 `.md` 的文件。

`cryogen-markdown` ：编译器会编译 `resources/templates/asc` 目录下以 `.asc` 的文件。

<br>
### 设置网站主题
***

Cryogen 自带了两个主题模板，通过 `resources/templates/themes` 目录的 `config.edn` 文件的属性 `:theme` 进行配置。

<br>
### 自定义网站布局
***

Cryogen 使用 [Selmer](https://github.com/yogthos/Selmer) 模板引擎定义网站布局，具体用法请参考官方文档。

布局文件被放在项目的  `resources/templates/themes/{theme}/html` 目录下，`base.html` 作为站点的默认布局文件，可以在这个文件加入你的 CSS 和 JavaScript 静态资源。

在发布站点文章时，通过 `:layout` 属性指定布局样式，每个 `.html` 页面都应该继承 `base.html` 这个文件，通过 Selmer 模板技术的属性 `content` 区分每个页面的内容，如下所示：

```xml
{% extends "templates/html/layouts/base.html" %}
{% block content %}
<div id="posts-by-tag">
    <h2>Posts tagged {{name}}</h2>
    <ul>
    {% for post in posts %}
        <li>
            <a href="{{post.uri}}">{{post.title}}</a>
        </li>
    {% endfor %}
    </ul>
</div>
{% endblock %}
```

<br>
### 代码语法高亮
***

Cryogen 使用 [Highlight.js](https://highlightjs.org/) 支持代码语法高亮，通过 `templates/js/highlight.pack.js` 文件可以添加更多语言。

 ` initHighlightingOnLoad`  函数在 `{theme}/html/base.html` 已被调用。

```xml
<script>hljs.initHighlightingOnLoad();</script>
```

<br>
## 发布你的站点
***

网站静态内容被生成在 `resources/public` 这个目录，将这个目录下的内容发布到你的服务器即可。

以下为 Nginx 容器的部署文件示例，如果是 linux 操作系统，文件通常被放在：`/etc/nginx/sites-available/default`

```javascript
server {
  listen 80 default_server;
  listen [::]:80 default_server ipv6only=on;
  server_name localhost <yoursite.com> <www.yoursite.com>;

  access_log  /var/log/blog_access.log;
  error_log   /var/log/blog_error.log;

  location / {
    alias       /var/blog/;
    error_page  404 = /404.html;
  }
}
```


将 `yoursite.com` 换成你的站点域名，然后将项目 `resources/public` 下的内容复制到 `/var/blog/`，最后，你还应该添加一个文件`/var/blog/404.html`，完成。

更多关于部署的信息请参考官方文档 [这里](http://cryogenweb.org/docs/deploying-to-github-pages.html)。
