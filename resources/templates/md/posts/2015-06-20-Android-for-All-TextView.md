{:title "Android - 术语剖析 - TextView"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**视图** 是屏幕上的矩形区域。**TextView** 是一种视图类型，显示一行或多行文本。
<br>
<br>
屏幕上的 TextView 由 Android 设备内部的 Java 对象绘制。事实上，Java 对象是真正的 **TextView**。但是在谈论用户所见时，将屏幕上的矩形区域视为 "TextView" 比较方便。

<br>
## 代码示例
***

```
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:padding="8dp"
    android:textSize="24sp"
    android:text="Hello"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-TextView.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
