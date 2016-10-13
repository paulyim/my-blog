{:title "Android - 术语剖析 - Style（样式）"
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
当 TextView 未指定前景或背景颜色时，将使用默认设置，如透明背景加灰色文本。这是因为 TextView 应用了默认属性集，我们称之为 **样式**。
<br>
<br>
插图中显示了 BlackOnYellow 和 WhiteOnGreen 两种样式，样式可在 styles.xml 文件中进行创建。之后可轻松应用到另一 XML 文件的 TextView 中。

<br>
## 代码示例
***

```
<!-- Create the styles in the file styles.xml. -->
<resources>
    <style name="BlackOnYellow">
        <item name="android:background">#FFFF00</item>
        <item name="android:textColor">#000000></item>
    </style>
    <style name="WhiteOnGreen">
        <item name="android:background">#00FF00</item>
        <item name="android:textColor">#FFFFFF</item>
    </style>
</resources>

<!-- Use the styles in the file activity_main.xml. -->
<TextView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    style="@style/BlackOnYellow"
    android:text="Hello"/>
<TextView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    style="@style/WhiteOnGreen"
    android:text="Hello"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Style.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
