{:title "Android - 术语剖析 - layout_weight"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**视图** 是屏幕上的矩形区域。**LinearLayout** 是大视图，其中可包含小视图，即 **子视图**。**horizontal** LinearLayout 将其子视图排成一行，而 **vertical** LinearLayout 将其子视图排成一列。
<br>
<br>
horizontal LinearLayout 中的每个子视图都可以为自己申请一个最小的宽度。如果布局足够宽，则在满足这些请求之后将会剩下一些宽度。
<br>
<br>
之后，系统会在要求平分宽度的子视图中平分剩下的宽度。每个子视图要求平分的数量称为该子视图的 **布局权重**。
<br>
<br>
在代码样例和图例中，horizontal LinearLayout 包含三个子视图，要求的 layout_width 总计为 48dp。这远远小于布局的宽度。这样，EditText 子视图要求平分剩余的宽度，而另外两个子视图不要求平分宽
度。因此，剩余宽度共分为一份，EditText 会进行扩展以填充其要求平分的宽度。
<br>
<br>
vertical LinearLayout 的子视图也适用类似的规则。如果 LinearLayout 足够高，将会在要求平分高度的子视图之间分配剩余垂直空间。

<br>
## 代码示例
***

```
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:padding="16dp">
    <ImageView
        android:layout_width="24dp"
        android:layout_height="24dp"
        android:layout_gravity="center_vertical"
        android:src="@drawable/ic_chat"/>
    <EditText
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_weight="1"
        android:textAppearance="?android:textAppearanceMedium"
        android:hint="Send Message"/>
    <ImageView
        android:layout_width="24dp"
        android:layout_height="24dp"
        android:layout_gravity="center_vertical"
        android:src="@drawable/ic_send"/>
</LinearLayout>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Layout-Weight.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
