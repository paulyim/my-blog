{:title "Android - 术语剖析 - View（视图）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**视图** 是屏幕上可见的矩形区域。视图具有宽度和高度，有时还具有背景色。
<br>
<br>
插图显示了三种不同类型的视图。**ImageView** 显示图像，如图标或照片。**TextView** 显示文本。**Button** 是对触摸敏感的 TextView:用手指点击时即会做出响应。**ViewGroup** 是大视图，通常不可见，其内部包含并可放置较小视图。
<br>
<br>
屏幕上的视图由 Android 设备内部的 Java 对象绘制。事实上，Java 对象是真正的 **视图**。但是在谈论用户所见时，将屏幕上的矩形区域视为“视图”比较方便。

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-View.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
