{:title "Android - 术语剖析 - XML"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**XML** 代表“可扩展标记语言”。它是一种表示法，用于编写以 **层次结构** 或家族树形式组织的信息。示例包括主题的罗马数字轮廓、部门和分支的企业组织结构图或州、县和市的列表。
<br>
<br>
一个州可以包含许多县，且一个县可以包含许多市。但是每个市只能属于一个县，且每个县只能属于一个州。在 XML 中，我们称每个数据项目可包含许多 **子项**，但每个子项只能包含在一个 **父项** 中。
<br>
<br>
家族树结构使 XML 成为描述 Android 应用的屏幕布局的理想语言，应用的屏幕布局由称为 **视图** 的矩形区域组成。该布局总是以大视图包含小视图，小视图继而包含更小视图的形式存在。

<br>
## 代码示例
***

```
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Hello"/>
    <ImageView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:src="@drawable/mountain"/>
    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Press me"
        android:onClick="doSomething"/>
</LinearLayout>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-XML.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
