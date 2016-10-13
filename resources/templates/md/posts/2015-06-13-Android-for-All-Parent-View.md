{:title "Android - 术语剖析 - Parent View（父视图）"
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
**ViewGroup** 是大视图，其中可包含小视图。小视图称为 ViewGroup 的 **子视图**，可以是 TextView 或 ImageView。ViewGroup 称为其子视图的 **父视图**。图例显示了一个 vertical **LinearLayout** 父视图，其内部 **嵌套** 了三个子视图。
<br>
<br>
子视图可具有其自己的子视图。例如，大 ViewGroup 可以包含更小的 ViewGroup，更小的 ViewGroup 可以包含 TextView。

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Parent-View.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
