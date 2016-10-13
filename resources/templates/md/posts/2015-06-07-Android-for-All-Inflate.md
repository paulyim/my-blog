{:title "Android - 术语剖析 - Inflate"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**XML** 代表“可扩展标记语言”。它是一种表示法，用于编写以层次结构或家族树形式组织的信息。
<br>
<br>
可在 XML 文件中列出我们想要创建并显示在屏幕上的 Java 对象:TextView、ImageView 和 Button。
<br>
<br>
但该文件实际上并不 包含 这些对象。只是用于 描述 对象及其在屏幕中相对位置的文本文件。
<br>
<br>
创建 XML 文件中所描述对象的过程称为 **inflation**。要对文件使用 inflate 方法，请将 **资源 ID**（标识号）传递到 **inflator** 对象，读取文件并创建文件中描述的对象。
<br>
<br>
通常，我们没有将标识号直接传递到 inflator，而是将其传递到名为 <a href="http://developer.android.youdaxue.com/reference/android/app/Activity.html#setContentView(int)">setContentView</a> 的 Activity 方法。此方法将完成两项工作：代替我们将编号传递到 inflator，将产生的结果显示在屏幕上。

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Inflate.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
