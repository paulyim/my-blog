{:title "Android - 术语剖析 - XML Tag（XML 标记）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**可扩展标记语言**（XML）是一种表示法,编写的文件包含称为 **元素** 的信息片段。为表明元素的开始和结束,我们编写 **标记**。标记易于识别,因为它始终以字符 < 和 > 开始和结束。标记还包括所标记开始和结束元素（如 LinearLayout）的名称。
<br>
<br>
元素通常由一对标记加上两个标记间的所有内容组成。这种情况下,一对标记中的第二个标记以字符 </ 开始,我们称第二个标记 **闭合** 第一个标记。
<br>
<br>
不需要括任何内容的元素可由单一标记组成。这种情况下,标记以字符 /> 结束,我们称这种标记为 **自闭合标记**。

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-XML-Tag.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
