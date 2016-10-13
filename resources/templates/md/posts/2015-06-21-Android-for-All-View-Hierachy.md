{:title "Android - 术语剖析 - View Hierarchy（视图层次结构）"
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
**ViewGroup** 是大视图,其中可包含小视图。小视图称为 ViewGroup 的 **子视图**,可以是 TextView 或　ImageView。ViewGroup 称为其子视图的 **父视图**。每个子视图都 **嵌套**（完全包含）在其父视图内。子视图可具有其自己的子视图。例如,插图中显示了包含三个子视图的垂直 LinearLayout。第一个是具有两个子视图的 RelativeLayout。
<br>
<br>
始终存在一个包含其余所有视图(如果存在)的视图,称为 **根视图**。其余视图是根视图的子视图、二级子视图或三级子视图等等。因此这些视图构成了家族树,称为 **视图层次结构**。

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

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-View-Hierachy.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
