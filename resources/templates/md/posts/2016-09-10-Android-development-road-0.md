{:title "Android - 开发历程回顾（0）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

接触 Android 开发已经两年了，总结一下自己从无到有的 Android 开发技术学习历程。

首先来看张图：

<img src="http://oem503hzx.bkt.clouddn.com/Android-dev-road-0u0.png" width="800"/>

我认为 Android 程序开发主要分为 **测试** 和 **写代码** 两个部分，如果完成没有编程基础的，建议先从 **Java** 语法开始学习，推荐一本 Bruce Eckel 写的 [Java 编程思想](https://www.gitbook.com/book/quanke/think-in-java/details)。打好 Java 基础后，就开始看 Android 官方文档和指南。
<br>
<br>
我当初是有系统学习过 Java 和从事 Java Web 工作的，根据个人情况，如果你觉得上面一本不够学习，可以多找几本，但作为基础入门，上面那本是经典中的经典。
<br>
<br>
十分建议打好 Java 基础再进行 Android 开发技术学习，虽然现在不使用 Java 也可以进行开发（clojure, kotlin, scala），但因为 Android API 是基于 Java 语法写的，如果不懂 Java，后面学习代码肯定会比较困难和容易造成卡壳。

<br>
## Test
***

先介绍 Test 的原因是因为我觉得学习程序开发时，如果先有测试的概念，在未来写程序的时候会减少一些技术债。
<br>
<br>
我自己测试这块的经验是比较少的，因为一开始没有这种意识，工作上也没有人带，等到后面接触到测试这块的时候才发现有很多东西要学习。
<br>
<br>
同样，来看张图：

<img src="http://oem503hzx.bkt.clouddn.com/Android-dev-road-0u1.png" width="800"/>

根据我的经验，Android 测试主要分成 3 个部分。分别是 **持续整合环境**、**UI/UX test**、**Unit test**，这三个测试对应着不同的事情，但结合起来刚好完整覆盖 Android 程序的内容。

<br>
### Unit Test
***

最小单元测试，一般来说就是测试非 UI 的功能，譬如 API 或者程序逻辑、计算等等。这部分的网络资源很多，以下罗列几个帮助我在学习测试的时候，省去很多功夫的资源，在了解 **单元测试** 的时候，会接触到一个很重要的概念 **Dependency inversion**，以及如何架构你的 Android 程序才能让测试更简单，方便测试等等。

* [30天快速上手 TDD](https://dotblogs.com.tw/hatelove/archive/2012/11/02/learning-tdd-in-30-days-day1-tdd-guidance.aspx)
* [单元测试命名方法](http://teddy-chen-tw.blogspot.tw/2016/05/blog-post_12.html)
* [Unit Test 的概念](https://hungyanbin.gitbooks.io/android-unit-test/content/chapter1.html)
* [面向对象程序设计的五大原则](http://www.hitripod.com/blog/2011/12/object-oriented-design-five-principles-solid/)

<br>
### UI/UX Test
***

前段时间，业界网友分享了一个非常酷的 **UI/UX test** 工具，觉得很有用，还未深入去学习（要学习另外一门编程语言 Ruby...），不过觉得在测试中挺重要的。
<br>
<br>
简而言之，这些工具可以让你编写测试脚本，然后让程序自己去测试你写好的程序，这样可以减少重复的劳动。
<br>
<br>
在程序越来越大和上线给用户使用跟收集回馈和 Bug 的时候，这一步就会起很大的作用。

* [Introduction to Calabash](https://developer.xamarin.com/guides/testcloud/calabash/introduction-to-calabash/)

<br>
<br>
**Calabash** 的好处是可以跨平台测试。

<br>
### 持续整合环境
***

目前我在摸索 **Jenkins**，持续整合环境的好处是你可以写一些脚本，让指定 Git 上的程序在指定时间运行测试脚本，收集当前版本程序的测试覆盖度如何，有没有 Bug，如果都没有的话就可以将程序上传到 Git Server，或直接打包 Apk 进行发布等。
<br>
<br>
这个方面的知识我还在继续摸索，觉得 **Jenkins** 很多地方都不是很懂！会接触的东西大概有 Gradle、Groovy 语法，和一些 Script 。
<br>
<br>
了解 **测试** 和知道一些测试相关的原则，会让你在写程序的时候少走一些弯路，但由于这些概念比较抽象，建议有个大概思路即可，毕竟你是学习写 Android 程序的。
<br>
<br>
如何兼顾程序产出跟后续的测试编写等等的尺度要由你自己拿捏，免得一头栽进写测试程序，而耽误了主程序的开发进展。
