{:title "Android - ADB 常用命令"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

ADB，即 [Android Debug Bridge](https://developer.android.youdaxue.com/studio/command-line/adb.html)，它是 Android 开发/测试人员不可或缺的开发工具，也是 Android 设备玩家的好玩具。

<br>
## 基本用法
***

adb 命令的基本语法如下：

```
$ adb [-d|-e|-s <serialNumber>] <command>
```

如果只有一个设备/模拟器连接时，可以省略掉 `[-d|-e|-s <serialNumber>]` 这一部分，直接使用 `adb <command>`。

如果有多个设备/模拟器连接，则需要为命令指定目标设备。

<table class="table table-bordered">
<thead>
<tr>
<th>参数</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>-d</td>
<td>指定当前唯一通过 USB 连接的 Android 设备为命令目标</td>
</tr>
<tr>
<td>-e</td>
<td>指定当前唯一运行的模拟器为命令目标</td>
</tr>
<tr>
<td>-s <serialNumber></td>
<td>指定相应 serialNumber 号的设备/模拟器为命令目标</td>
</tr>
</tbody>
</table>

在多个设备/模拟器连接的情况下较常用的是 `-s <serialNumber>` 参数，`serialNumber` 可以通过 `adb devices` 命令获取。如：

```
$ adb devices

List of devices attached
08a81d750222234b	device
emulator-5554	device
```

输出里的 `08a81d750222234b` 和 `emulator-5554` 即为 serialNumber。比如这时想指定 `08a81d750222234b` 这个设备来运行 `adb` 命令获取屏幕分辨率：

```
$ adb -s 08a81d750222234b shell wm size
```

<br>
## 查询已连接设备/模拟器
***

命令：

```
$ adb devices
```

输出示例：

```
List of devices attached
08a81d750222234b	device
emulator-5554	device
```

输出格式为 `[serialNumber] [state]`，serialNumber 即我们常说的 SN，state 有如下几种：

* `offline` —— 表示设备未连接成功或无响应。

* `device` —— 设备已连接。注意这个状态并不能标识 Android 系统已经完全启动和可操作，在设备启动过程中设备实例就可连接到 adb，但启动完毕后系统才处于可操作状态。

* `no device` —— 没有设备/模拟器连接。

以上输出显示当前已经连接了两台设备/模拟器，08a81d750222234b 与 emulator-5554 分别是它们的 SN。从 emulator-5554 这个名字可以看出它是一个 Android 模拟器。

<br>
## 安装 APK
***

命令格式：

```
$ adb install [-lrtsdg] <path_to_apk>
```

参数：

`adb install` 后面可以跟一些可选参数来控制安装 APK 的行为，可用参数及含义如下：

<table class="table table-bordered">
<thead>
<tr>
<th>参数</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>-l</td>
<td>将应用安装到保护目录 /mnt/asec</td>
</tr>
<tr>
<td>-r</td>
<td>允许覆盖安装</td>
</tr>
<tr>
<td>-t</td>
<td>允许安装 AndroidManifest.xml 里 application 指定 android:testOnly="true" 的应用</td>
</tr>
<tr>
<td>-s</td>
<td>将应用安装到 sdcard</td>
</tr>
<tr>
<td>-d</td>
<td>允许降级覆盖安装</td>
</tr>
<tr>
<td>-g</td>
<td>授予所有运行时权限</td>
</tr>
</tbody>
</table>

<br>
## 卸载应用
***

命令：

```
$ adb uninstall [-k] <packagename>
```

`<packagename>` 表示应用的包名，`-k` 参数可选，表示卸载应用但保留数据和缓存目录。

<br>
## 清除应用数据与缓存
***

命令：

```
$ adb shell pm clear <packagename>
```

`<packagename>` 表示应用名包，这条命令的效果相当于在设置里的应用信息界面点击了「清除缓存」和「清除数据」。

<br>
## 复制设备里的文件到电脑
***

命令：

```
$ adb pull <设备里的文件路径> [电脑上的目录]
```

其中 `电脑上的目录` 参数可以省略，默认复制到当前目录。

例：

```
adb pull /sdcard/sr.mp4 ~/tmp/
```

**注意：** 设备上的文件路径可能需要 root 权限才能访问，如果你的设备已经 root 过，可以先使用 `adb shell` 和 `su` 命令在 `adb shell` 里获取 root 权限后，先 `cp /path/on/device /sdcard/filename` 将文件复制到 sdcard，然后 `adb pull /sdcard/filename /path/on/pc`。

<br>
## 复制电脑里的文件到设备
***

命令：

```
$ adb push <电脑上的文件路径> <设备里的目录>
```

例：

```
adb push ~/sr.mp4 /sdcard/
```

**注意：** 设备上的文件路径普通权限可能无法直接写入，如果你的设备已经 root 过，可以先 `adb push /path/on/pc /sdcard/filename`，然后 `adb shell` 和 `su` 在 `adb shell` 里获取 root 权限后，`cp /sdcard/filename /path/on/device`。

<br>
## 查看日志
***

```
$ adb logcat
```

<br>
## 重启
***

```
$ adb reboot
```

<br>
## 刷机相关命令
***

<br>
### 重启到 Recovery 模式
***

```
$ adb reboot recovery
```

<br>
### 从 Recovery 重启到 Android
***

```
$ adb reboot
```

<br>
### 重启到 Fastboot 模式
***

```
$ adb reboot bootloader
```

<br>
### 通过 sideload 更新系统
***

如果我们下载了 Android 设备对应的系统更新包到电脑上，那么也可以通过 adb 来完成更新。

以 Recovery 模式下更新为例：

1. 重启到 Recovery 模式：

```
$ adb reboot recovery
```

2. 在设备的 Recovery 界面上操作进入 Apply update-Apply from ADB：

**注：** 不同的 Recovery 菜单可能与此有差异，有的是一级菜单就有 Apply update from ADB。

3. 通过 adb 上传和更新系统：

```
$ adb sideload <path-to-update.zip>
```

<br>
## 参考
***

* <https://developer.android.com/studio/command-line/adb.html>
* <https://developer.android.com/studio/command-line/shell.html>
* <https://developer.android.com/studio/command-line/logcat.html>
* <https://github.com/mzlogin/awesome-adb>
