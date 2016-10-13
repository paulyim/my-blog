{:title "Android - 术语剖析 - ViewGroup"
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
**ViewGroup** 是大视图，其中可包含小视图。小视图称为 ViewGroup 的 **子视图**，可以是 TextView 或 ImageView。ViewGroup 称为其子视图的 **父视图**。插图显示了最常见的 ViewGroup 之一，即垂直的 **LinearLayout**。
ViewGroup 本身可能是透明的，仅用于包含及放置其子视图。但其子视图几乎始终可见。

<br>
## 代码示例
***

```
<!-- Create the View hierarchy in the picture. -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <ImageView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:src="@drawable/ramen"/>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:layout_centerHorizontal="true"
            android:text="Combo #1"/>
    </RelativeLayout>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Ramen House"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="This place is amazing!"/>
</LinearLayout>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-ViewGroup.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
