{:title "Android - 术语剖析 - LinearLayout"
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
**LinearLayout** 是一种常见的 ViewGroup。它将其子视图排成垂直列或水平行。

<br>
## 代码示例
***

```
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="some content"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="some content"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="some content"/>
</LinearLayout>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Linear-Layout.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
