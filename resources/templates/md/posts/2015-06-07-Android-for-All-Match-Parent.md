{:title "Android - 术语剖析 - match_parent"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**视图** 是屏幕上的矩形区域。例如，**TextView** 显示文本，**ImageView** 显示图像。
<br>
<br>
每个视图都包含在一个更大的视图中，即 **父视图**，假定最大视图的父视图为矩形玻璃屏幕。
<br>
<br>
要想水平扩展视图以占用父视图的全部宽度，需要将视图的 layout_width 属性设置为特殊值 **match_parent**。同样，要想垂直扩展视图以占用父视图的全部高度，需要将 layout_height 设置为
**match_parent**。

<br>
## 代码示例
***

```
<ImageView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:src="@drawable/mountains"
    android:scaleType="centerCrop"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Match-Parent.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
