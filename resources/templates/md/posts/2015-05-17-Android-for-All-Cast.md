{:title "Android - 术语剖析 - Cast"
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
我们编写 **表达式**，如 10 + 20 或 "cup" + "cake"
在应用的指令中，指示设备计算值，如 30 或 "cupcake"。值有多种类型:30 是 **integer**（整数），
"cupcake" 是 **string**（一段文本）。
<br>
<br>
每个表达式都有特定类型的 **值**。例如，10 + 20 的值是 integer **类型**。在应用的指令中，有时一种类型的
表达式中需要编写其他类型的表达式。出现这种情况时，我们需要在表达式前面加上 **cast**。cast 就像化
妆舞会上戴的面具。在程序周围的对象看来，表达式像是另外一种类型。
<br>
<br>
cast 不会对它所施加到的表达式造成任何影响。面具下，表达式的值仍保持原始类型。

<br>
## 代码示例
***

```java
// The value of the expression
// findViewById(R.id.textView)
// is of type View. The parenthesized (TextView) is a cast.
// The value of the larger expression
// (TextView) findViewById(R.id.textView)
// is of type TextView.
TextView textView = (TextView) findViewById(R.id.textView);
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Cast.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
