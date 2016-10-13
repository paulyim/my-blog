{:title "Android - 术语剖析 - 事件驱动编程（Event-Driven Programming）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**计算机** 是按照一系列称为 **程序** 的指令运行的机器。**Android 设备** 便是计算机，**应用** 是程序。
<br>
<br>
如果此应用为 **顺序** 程序，则设备在应用的第一条指令处启动，并按照编写指令的顺序或按照指令本身指示的顺序来执行指令。由于已编写指令，所以我们可提前预测设备的操作。
<br>
<br>
如果应用为 **事件驱动程序**，则可将其划分为多个部分，并且在收到来自外部世界的刺激时，设备会从一个部分跳转到另一个部分。例如，当手指触摸按钮时，我们可跳转到执行按钮建议操作的应用部分。在事件驱动编程中，无法提前预测设备的操作，因为操作取决于用户的想法。

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Event-Driven-Programming.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
