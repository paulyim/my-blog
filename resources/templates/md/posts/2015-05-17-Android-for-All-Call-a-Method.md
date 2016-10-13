{:title "Android - 术语剖析 - 调用方法（Call a Method）"
 :layout :post
 :tags  ["android"]
 :toc true
 :draft? true}

<br>
***
<br>

## 概述
***

计算机是按照一系列称为程序的指令运行的机器。Android 设备便是计算机,应用是程序。设备内部是
称为变量的容器,用于存储数字或文本片段等值。

对象是变量,但在以下两个方面特殊。第一,对象中可包含更小的变量,即对象的域。例如,在
MediaPlayer 对象中可能包含多个域,用于存储正在播放的声音文件的名称、音量等级、文件回放的当
前位置以及指示是否采用无限循环方式播放文件。

第二,我们可向对象附加称为方法的一系列指令,实际上是小程序。例如,我们的 MediaPlayer 对象可
能具有 play、pause 和 stop 方法。对象的方法可使用对象内部这些方法所附加到的域。例如,play 方法
需要使用全部四个域。

当指示计算机执行对象的方法时,便是在调用该方法。例如,我们可以调用 MediaPlayer 的 play 方法,
让其执行播放声音文件的指令。

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Call-a-Method.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
