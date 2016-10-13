{:title "Android - 术语剖析 - Padding（内边距）"
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
如果我们将视图的宽度或高度设置为特殊值 **wrap_content**，视图将收缩并包围内容。为防止视图包围得过紧，我们可以在每一边指定一个 **内边距**。

<br>
## 代码示例
***

```
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:background="#C0C0C0"
    android:text="CLAUSTROPHOBIA"/>
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:paddingLeft="16dp"
    android:paddingRight="16dp"
    android:paddingTop="8dp"
    android:paddingBottom="8dp"
    android:background="#C0C0C0"
    android:text="CLAUSTROPHOBIA"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Padding.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
