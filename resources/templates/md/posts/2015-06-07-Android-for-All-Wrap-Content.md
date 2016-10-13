{:title "Android - 术语剖析 - wrap_content"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**视图** 是屏幕上的矩形区域，通常包含一些内容。例如，**TextView** 包含文本，**ImageView** 包含图像，而称为 **ViewGroup** 的特殊类型视图内部包含较小的视图。
<br>
<br>
我们可以用给定距离指定视图的宽度或高度。我们也可以将其指定为特殊值 **wrap_content**，以围绕其内容压缩视图。为防止视图把自身包围得过紧，我们还可以指定特定的内边距量。

<br>
## 代码示例
***

```
<TextView
    android:layout_width="120dp"
    android:layout_height="40dp"
    android:background="#FFC300"
    android:text="HELLO"/>
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:background="#FFC300"
    android:text="HELLO"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Wrap-Content-1.png" width="600"/>

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Wrap-Content-2.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
