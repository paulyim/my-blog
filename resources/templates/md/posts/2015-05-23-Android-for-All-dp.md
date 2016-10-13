{:title "Android - 术语剖析 - 与密度无关的像素（dp）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**Android 设备** 的屏幕由称为 **像素** 的发光点行和列构成。设备可根据 **屏幕密度** 移动，即屏幕上的每英寸像素数（或点/英寸）。例如，mdpi（或中等密度设备）具有 160 点/英寸，而 xxhdpi（超高密度设备）具有 480 点/英寸。
<br>
<br>
如果我们以像素值指定视图大小，则视图在较高密度设备上将显得很小，也就是将许多像素装填到较小区域内。如果按钮过小，则用户触摸将比较困难。
<br>
<br>
为在不同屏幕密度的设备间实现一致物理大小的视图，我们使用称为[与密度无关的像素](http://developer.android.youdaxue.com/guide/topics/resources/more-resources.html#Dimension)的度量单位（**dp** 或 **dip**，发音为 "dee pee" **或** "dip"）。在 mdpi 设备上，1 dp 等于 1 像素。在 xxhdpi 设备上，1 dp 等于 3 像素，[其他设备](http://developer.android.youdaxue.com/design/style/devices-displays.html)以此类推。按照材料设计指南，屏幕上的任何触摸目标均应[至少为 48dp 宽乘以 48dp高](http://www.google.com/design/spec/layout/metrics-keylines.html#metrics-keylines-touch-target-size)。这样，一台设备上的应用按钮将与使用不同屏幕密度在设备上运行的相同应用中的按钮大致具有相同物理大小。
<br>
<br>
Android 设备将自动处理从 dp 到像素值的转换，因此开发人员在其布局中指定尺寸时使用 dp 值即可。
<br>
<br>
例如，dp 值可用于指定在插图中显示视图的宽度和高度。

<br>
## 代码示例
***

```
<TextView
    android:layout_width="160dp"
    android:layout_height="80dp"
    android:background="#00FF00"
    android:text="Hello"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-dp.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
