{:title "Android - 术语剖析 - findViewById"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**计算机** 是按照一系列称为 **程序** 的指令运行的机器。**Android 设备** 便是计算机，应用是使用 **Java** 语言编写的程序。设备内部是称为 **变量** 的容器，用于存储数字或文本片段等 **值**。**对象** 是一种较大变量，其中可包含较小变量。我们可向对象附加称为 **方法** 的一系列指令，实际上是小程序。
<br>
<br>
对象分多种 **类**（类型）。例如，[ImageView](http://developer.android.youdaxue.com/reference/android/widget/ImageView.html) 类的对象可在屏幕上显示图像，[TextView](http://developer.android.youdaxue.com/reference/android/widget/TextView.html) 类对象可显示文本片段。通常使用 **XML** 语言编写[布局文件](http://developer.android.youdaxue.com/guide/topics/ui/declaring-layout.html#write)来创建这些 **视图对象**，用于描述对象以及对象在屏幕中的位置。
<br>
<br>
给定类的每个对象都附有相同的方法集。例如，[活动](http://developer.android.youdaxue.com/guide/components/activities.html)类的每个对象都具有创建[用户界面](https://developer.android.com/guide/topics/ui/overview.html)对象的方法：即 ImageView、TextView、Button 等用户能够在屏幕上看到的内容。
<br>
<br>
创建视图对象后，还需要使用活动对象分别对这些对象进行配置。这就是每个视图对象都有一个 [ID 编号](http://developer.android.youdaxue.com/guide/topics/ui/declaring-layout.html#id) 的原因。这些编号使得应用中使用 Java 编写的部分与使用 XML 编写的部分之间能够相互通讯。具体地说，利用这些编号，使用 Java 创建的对象方法可以调用使用 XML 创建的对象方法。
<br>
<br>
各视图的 ID 编号存储在可传递至活动方法的 Java 变量中。该变量通过在布局文件的视图对象描述中写入变量名称进行创建。例如，在代码示例中创建名为 R.id.today（R 代表“资源”）的变量，用于存储 TextView 的 ID 编号。通过在布局文件的 TextView 描述中写入属性 android:id="@id+/today"，可完成创建。
<br>
<br>
每个活动都有一个名为 [findViewById](http://developer.android.youdaxue.com/reference/android/app/Activity.html#findViewById(int) 的方法，用于查找已给出其 ID 编号的视图对象。代码示例会将变量 R.id.today 传递给此方法，用于查找 TextView。如果运行正确，返回值(方法生成的结果)将引用 TextView，即允许活动调用 TextView 方法的一条信息片段。为方便使用此引用必须将其存储于只能存储“引用 TextView”这一种类型值的特殊用途变量中。
<br>
<br>
由于调用 findViewById 可查找许多不同类（TextView、ImageView 等）的视图对象，因此其返回值为常规用途引用，可能引用这些类中任何一个的对象。必须将返回值从常规 **转换**（转变）至特殊后，才能将该返回值存储到特殊用途变量中。此方向的转换称为 **向下转换**，由括号中的命令 TextView 执行。
<br>
<br>
另一项要求是，findViewById 必须在执行 [setContentView](http://developer.android.youdaxue.com/reference/android/app/Activity.html#setContentView(int) 后执行，该方法用于创建 TextView 及布局文件中描述的其他视图对象。JavaScript 的程序员会发现 Android findViewById 与 JavaScript getElementById 相类似。

<br>
## 代码示例
***

```
<!-- Excerpt from the layout file activity_main.xml. -->
<TextView
    android:id="@+id/today"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"/>
```

```java
// Excerpt from the file MainActivity.java.
// When the app is launched, put the current date (but not the time) into the TextView.
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    TextView today = (TextView) findViewById(R.id.today);
    if (today != null) {
        // The Date object also contains the current time.
        Date todaysDate = new Date();
        DateFormat justTheDate = DateFormat.getDateInstance();
        String s = justTheDate.format(todaysDate);
        today.setText(s);
    }
}
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-findViewById.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
