{:title "Android - 术语剖析 - Parse（解析）"
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
由于 Android 设备还不能可靠地理解英语，因此我们必须以更简单的语言（如 Java 和 XML）编写应用。然后，桌面应用程序 Android Studio 将应用的文件从这些 **编程语言** 转换为 Android 设备能够理解的语言。
<br>
<br>
每种编程语言均有其自己的语法、标点和组织规则。例如，XML 文件始终包含一个数据项，该数据项中可能包含更小的项，而每个更小的项还可能包含再小的项。代码样例显示了一个 LinearLayout，其中包含两个子项，而第二个子项自身还有一个 **子项**。
<br>
<br>
读取 XML 文件的第一步是 **解析** 该文件:分解该文件，确保所有组成部分均存在且顺序和关系均正确。解析 XML 或 Java 文件类似于将人类语言句子解析为各个组成部分。XML 解析将生成信息树，显示要在屏
幕上创建和显示的对象之间的关系。

<br>
## 代码示例
***

```
<!-- A fuller version of the XML file parsed in the illustration. -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="1"/>
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"/>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="2a"/>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="2b"/>
    </LinearLayout>
</LinearLayout>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Parse.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
