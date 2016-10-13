{:title "Android - 术语剖析 - Button"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**视图** 是屏幕上的矩形区域。有一种视图是 **Button**，显示一段文本。触摸时，正确配置的 Button 会指示
Android 设备执行 **方法**，即一系列指令，如小程序。
<br>
<br>
屏幕上的 Button 由 Android 设备内部的 Java 对象绘制。事实上，Java 对象是真正的 **Button**。但是在
谈到用户所看到的内容时，将屏幕上的矩形区域视为“按钮”将更为方便。

<br>
## 代码示例
***

```
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:padding="8dp"
    android:background="#00FF00"
    android:text="Force stop"
    android:onClick="forceStop"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Button.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
