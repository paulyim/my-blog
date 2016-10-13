{:title "Android - 术语剖析 - layout_margin"
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
默认情况下，两个视图彼此相邻放置。如果不想让两个视图相互接触，可以沿着一个视图的一条边留出一部分 **空白**。事实上，可要求沿着视图的全部四条边各留出一部分空白。

<br>
## 代码示例
***

```
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#FFC400"
        android:text="The"/>
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginLeft="8dp"
        android:background="#2196F3"
        android:text="End"/>
</LinearLayout>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Layout-Margin.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
