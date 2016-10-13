{:title "Android - 术语剖析 - OnClickListener"
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
设备内部是称为 **变量** 的容器，用于存储数字或文本片段等值。变量中的值很容易改变，因此称之为“变量”。
<br>
<br>
能够包含小变量的大变量称为 **对象**。小变量称为对象的 **域** 或 **成员**，且小变量往往自身便是对象。也就是说我们可以将小对象存储在大对象中。还可向对象附加称为 **方法** 的一系列指令，实际上是小程序。不能更改对象的方法。这些方法永久附加到该对象上。
<br>
<br>
对象分多种 **类**。例如，**ImageView** 类的对象显示图像，触摸 **Button** 类的对象时，对象会作出响应。给定类的所有对象都附有完全相同的方法集。例如，每个 Button 类对象都有一个 <a href="http://developer.android.youdaxue.com/reference/android/widget/TextView.html#setEnabled(boolean)">setEnabled（boolean）</a> 方法，确定是否可以触摸 Button。
<br>
<br>
但通常，我们需要执行不同操作（例如“采购”和“取消”）的两个或多个 Button。通过将不同的方法附加到各个 Button 无法实现这一要求。所有的 Button 都属于同一个类，因此必须具有完全相同的方法。类似
地，从 "play" 变为 "pause" 的 Button 必须在不改变方法的前提下进行。
<br>
<br>
解决方案是创建一个名为 [OnClickListener](http://developer.android.youdaxue.com/reference/android/view/View.OnClickListener.html) 的单独对象。附加到监听器的方法是 onClick（View），其中包含要在触摸 Button 后执行的指令。（在 Android 的早期版本中，“单击”一词即表示“触摸”。）监听器存储在 Button 的一个域中，在触摸发生之前一直处于睡眠状态。触摸时，会自动执行附加到监听器的 onClick 方法。
<br>
<br>
Button 有许多个类，每个类都有一组不同的方法，这让我们很难进行区分。但 OnClickListener 是一种非常简单的对象类型。我们可以创建这样两个监听器：其中一个监听器的 onClick 方法包含“采购”指令，
另外一个监听器的 onClick 执行“取消”指令。然后，可将这两个监听器存储到不同的 Button 中，从而在触摸每个 Button 时产生不同的行为。由于可更改域的内容，因此可将 Button 中的“播放”监听器替换为“暂停”监听器。
<br>
<br>
另外，还可使用另外一种方式来设置要在触摸 Button 时执行的方法。如果使用 XML 布局文件中的 `<Button>` 元素创建 Button，则可以使用该元素的 [android:onClick](http://developer.android.youdaxue.com/reference/android/view/View.html#attr_android:onClick) 属性指定方法。这一方便的备选方案专为不改变行为的 Button 提供。

<br>
## 代码示例
***

```java
Button button = (Button) findViewById(R.id.button);
button.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        String s = "Thanks for touching the button.";
        Toast t = Toast.makeText(MainActivity.this, s, Toast.LENGTH_LONG);
        t.show();
    }
});
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-onClickListener.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
