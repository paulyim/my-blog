{:title "Android - 术语剖析 - 布尔（Boolean）"
 :layout :post
 :tags  ["android"]
 :toc true
 :draft? true}

<br>
***
<br>

## 概述
***

计算机是按照一系列称为程序的指令运行的机器。Android 设备便是计算机,应用是程序。

应用能够指示设备操纵数字或文本片段等值。值分多种类型。例如,包含分数的数值为 float 类型,整数
为 int 类型。int 类型的值可能有几十亿个,其中包括熟悉的数字 1、2 和 3,int 值可能由多种运算(包
括加法和减法)计算得出。

布尔类型并不常见,因为这种类型只有两个值:true 和 false。布尔值可能由两个数字进行比较得出。

例如,如果我们检查 x 是否等于 y,结果将是布尔类型,结果的值将是 true 或 false。该类型以 19 世纪
逻辑学家乔治· 布尔的名字进行命名。

变量是设备内部可包含值的容器。布尔变量是包含布尔值的变量。此类型的变量可以记录比较结果,供
以后在应用中使用。通常,布尔变量的名称为 "is" 后接形容词。

<br>
## 代码示例
***

```java
// Remember whether or not the user won the game.
boolean isWinner;
if (score >= 100) {
    isWinner = true;
} else {
    isWinner = false;
}
// Start a new game.
score = 0;
String message;
if (isWinner) {
    message = "You’re a person who has won before.";
} else {
    message = "I’m glad you’re going to try it again.";
}
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Boolean.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
