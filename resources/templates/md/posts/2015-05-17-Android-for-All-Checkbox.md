{:title "Android - 术语剖析 - Checkbox"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**计算机** 是按照一系列称为 **程序** 的指令运行的机器。**Android 设备** 便是计算机，**应用** 是程序。在 Android
设备内部，**变量** 是用于保存数字或文本片段等 **值** 的容器。**对象** 是大变量，其中可包含小变量。我们可向
对象附加称为 **方法** 的一系列指令，实际上是小程序。对象分多种 **类**（类型）。
<br>
<br>
Android 应用的屏幕由称为 **视图** 的矩形区域组成。例如，**checkbox** 是外观和作用都像复选框的触摸敏感
视图:我们可以轻击选中或取消选中。请参阅材料设计规范中的 [Checkbox（复选框）](http://www.google.com/design/spec/components/selection-controls.html#selection-controls-checkbox) 和 [Checkboxes Guide（复选框指南）](http://developer.android.youdaxue.com/guide/topics/ui/controls/checkbox.html)。
<br>
<br>
屏幕上的每个视图都由对应的 Java 对象绘制。例如，复选框由 [CheckBox](http://developer.android.youdaxue.com/reference/android/widget/CheckBox.html) 类的对象绘制。事实上，
Java 对象是真正的复选框。但是在谈到用户所看到的内容时，将屏幕上的矩形区域视为“复选框”将更为
方便。
<br>
<br>
**CheckBox** 对象有一个名为 [isChecked](http://developer.android.youdaxue.com/reference/android/widget/Checkable.html#isChecked) 的方法，返回 **true** 或 **false** 以指示复选框当前是否已选中。

<br>
## 代码示例
***

```
<!-- Two elements in the file activity_main.xml. -->
<CheckBox
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/sprinkles"
    android:onClick="clickSprinkles"/>

<CheckBox
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/cherry"
    android:onClick="clickCherry"/>
```

```java
// Two methods of class MainActivity in the file MainActivity.java.
public void clickSprinkles(View view) {
    CheckBox checkBox = (CheckBox) view;
    String message;
    if (checkBox.isChecked()) {
        message = "Thanks for selecting sprinkles.";
    } else {
        message = "Thanks for not selecting sprinkles.";
    }
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
}

public void clickCherry(View view) {
    CheckBox checkBox = (CheckBox) view;
    int resourceId;
    if (checkBox.isChecked()) {
        resourceId = R.string.cherry;
    } else {
        resourceId = R.string.no_cherry;
    }
    checkBox.setText(getString(resourceId));
}
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Checkbox.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
