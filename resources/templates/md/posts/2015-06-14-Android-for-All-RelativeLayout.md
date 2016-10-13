{:title "Android - 术语剖析 - RelativeLayout"
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
**ViewGroup** 是大视图，其中可包含小视图。小视图称为 ViewGroup 的 **子视图**，可以是 TextView 或 ImageView。ViewGroup 称为其子视图的 **父视图**。
<br>
<br>
**RelativeLayout** 是一种常见的 ViewGroup，允许我们相对于其自身的边缘放置其子项。例如，图例中的
三个子项分别放置在 RelativeLayout 的三个角上。RelativeLayout 还允许我们相对于彼此之间的关系来
安排子项:可将一个子项放置在另一个子项的右侧，甚至可以重叠。

<br>
## 代码示例
***

```
<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_alignParentTop="true"
        android:text="upper left"/>
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:layout_alignParentTop="true"
        android:text="upper right"/>
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_alignParentBottom="true"
        android:text="lower left"/>
</RelativeLayout>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-RelativeLayout.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
