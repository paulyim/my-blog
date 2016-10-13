{:title "Android - 术语剖析 - Hardcode（硬编码）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**计算机** 是按照一系列称为 **程序** 的指令运行的机器。**Android 设备** 便是计算机，**应用** 是程序。
<br>
<br>
向应用提供信息的方式之一是将信息写入应用指令中：add 10 + 20，或使 TextView 的宽为 100dp，这称为向应用中 **硬编码** 信息。
<br>
<br>
上述指令中的 **TextView** 是 **视图** 示例，是屏幕上可显示信息的矩形区域。视图可以包含在较大视图中，这个大视图称为其 **父视图**。假设包含 TextView 的父视图宽度为 100dp，若希望 TextView 与父视图等宽，则可以写入上述指令。将 100dp 值用硬编码写入指令的缺点之一是，如果想要更改 TextView 父视图的宽度则必须要重新写入该值。
<br>
<br>
这是我们避免写入 **硬编码值** 的原因之一。如果能够写入一条指令，指示 TextView 自动从其父视图获取宽度，就可以减少我们的记忆负担。减少维护也就意味着减少程序错误。

<br>
## 代码示例
***

```
<!-- This TextView has its width hardcoded into it. -->
<LinearLayout
    android:layout_width="100dp"
    android:layout_height="wrap_content"
    android:orientation="vertical">
    <TextView
        android:layout_width="100dp"
        android:layout_height="wrap_content"
        android:text="Hello"/>
</LinearLayout>
<!-- This TextView gets its width from its parent. -->
<LinearLayout
    android:layout_width="100dp"
    android:layout_height="wrap_content"
    android:orientation="vertical">
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Hello World"/>
</LinearLayout>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Hardcode.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
