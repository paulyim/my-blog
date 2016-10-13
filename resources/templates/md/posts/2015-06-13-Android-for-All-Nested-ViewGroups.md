{:title "Android - 术语剖析 - Nested ViewGroups（嵌套式 ViewGroup）"
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
**ViewGroup** 是大视图，其中可包含小视图。小视图称为 ViewGroup 的 **子视图**，可以是 TextView 或 ImageView。ViewGroup 称为其子视图的 **父视图**。每个子视图都 **嵌套**（完全包含）在其父视图内。
<br>
<br>
子视图可具有其自己的子视图。例如，图例显示了一个包含两个子视图的 vertical LinearLayout。第一个子视图是包含三个子视图的 horizontal LinearLayout，第二个子视图是包含四个子视图的 RelativeLayout。这四个子视图的其中一个子视图自身还有一个子视图。

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Nested-ViewGroups.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
