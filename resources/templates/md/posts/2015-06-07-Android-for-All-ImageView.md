{:title "Android - 术语剖析 - ImageView"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**视图** 是屏幕上的矩形区域。有一种视图是 **ImageView**，用于显示图标或照片等图像。
<br>
<br>
屏幕上的 ImageView 由 Android 设备内部的 Java 对象绘制。事实上，Java 对象是真正的 **ImageView**。但是在谈到用户所看到的内容时，将屏幕上的矩形区域视为 "ImageView" 将更为方便。

<br>
## 代码示例
***

```
<ImageView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:src="@drawable/cake"
    android:scaleType="centerCrop"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-ImageView.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
