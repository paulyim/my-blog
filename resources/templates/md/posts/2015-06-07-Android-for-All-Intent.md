{:title "Android - 术语剖析 - Intent"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**计算机** 是按照一系列称为 **程序** 的指令运行的机器。**Android 设备** 便是计算机，**应用** 是程序。**变量** 是设备中能够包含数字或文本片段等 **值** 的容器。能够包含小变量的大变量称为 **对象**。我们可向对象附加称为 **方法** 的一系列指令，实际上是小程序。
<br>
<br>
对象分多种 **类**。例如，每个应用至少包含一个 **Activity** 类的对象。此类的对象包含能够指示设备在屏幕上显示 **用户界面**（如图像、按钮和文本片段）的方法。除了显示界面，每个 Activity 对象类都可以完成一项有用的工作。可以拨打电话、发送电子邮件或播放视频。
<br>
<br>
一个应用中的 Activity 对象可以向同一应用甚至其他应用中的其他 Activity 对象寻求帮助。第一个 Activity 可以通过加上 "I am looking for an Activity that is capable of displaying a Google map" 或 "I am looking for an Activity that can scan a barcode" 来描述其需求。该对象将此描述加载到 [Intent](http://developer.android.youdaxue.com/guide/components/intents-filters.html) 类型的对象中，然后发送意图以搜索 Android 设备。
<br>
<br>
设备上的每个应用都包含一个 **清单文件**，其中列出了该应用中各 Activity 类的名称。此清单还包含 **过滤** 器，用于描述每个 Activity 的功能。Intent 对象将会检查这些清单。如果找到了满足需求的 Activity 类，将创建一个该类的对象并执行其 [onCreate](http://developer.android.youdaxue.com/reference/android/app/Activity.html#onCreate(android.os.Bundle) 方法。如果未找到，便向原始 Activity 返回这一坏消息。

<br>
## 代码示例
***

```java
// One Activity object can execute the following code
// to create another Activity object that can make a phone call.
// The other Activity will then make the call.
Uri uri = Uri.parse("tel:2121234567");
// Uniform Resource Identifier contains phone number
Intent intent = new Intent(Intent.ACTION_CALL, uri);
try {
    startActivity(intent);
} catch (ActivityNotFoundException exception) {
    textView.setText("could not find an Activity that meets the requirements: " + exception);
}
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Intent.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
