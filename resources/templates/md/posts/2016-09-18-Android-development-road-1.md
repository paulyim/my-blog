{:title "Android - 开发历程回顾（1）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

上次提到 Android 程序开发主要分为 **Test（测试）** 和 **Code（写代码）** 两个部分，上一篇博客文章已经讲了 **Test** 部分，而这一篇来讲 **Code** 。

* [Android - 开发历程回顾（0）](/posts-output/2016-09-10-Android-development-road-0.html)

<br>
##　Code
***

当你有个 Java 基础后，就可以开始学习 Android 程序编写了。我将 **Code** 这部分总结为三个部分，在学习的过程中，建议边学边做，有些比较难懂的知识可以先跳过，后面再慢慢消化它。根据我的经历，有些一开始不懂的知识，到后面自然而然就懂了，只要你实践得够多。

<br>
## 第一部分
***

<img src="http://oem503hzx.bkt.clouddn.com/Android-dev-road-1.png" width="800"/>

首先，要弄懂 Android 程序 **四大组件** 的基本，包括 **生命周期**，如何构建，以及用途，深入一点可以探讨它们是如何被实现出来的。

* Android 四大组件以及它们的生命周期
<http://www.unood.me/2012/11/android.html>
<http://kunhsien.blogspot.tw/2013/02/androidandroidactivity.html>
<http://y23462001.pixnet.net/blog/post/365646108-android-%E5%9B%9B%E5%A4%A7%E5%85%83%E4%BB%B6>
* Context
<http://huli.logdown.com/posts/260701-android-what-is-the-context>
<http://bxbxbai.github.io/2014/07/16/context/>

<br>
也可顺便看一看 Fragement 是什么，它的生命周期又是如何的。

<br>
### UI Widgets/Container/Layouts
***

当对基本组件熟悉后，就可以去理解 Android 程序的一些 **组件** 用法，如：LinearLayout, RelativeLayout, Button, EditText...
<br>
<br>
随着工作你会慢慢的理解越来越多的组件和它们如何使用，值得一提的是如果想对程序理解得更透彻的话，可以一步一步往基础组件看下去，譬如几乎所有的组件都继承自 **View**，那么 View 是怎么被实现出来的呢？它又是如何处理触碰事件的呢？等等。

<br>
### Adapter/ListView/Recycler View
***

这是 Android 程序的一个非常重要的 **Design Pattern**，至于 **Design Pattern** 是什么，要了解到什么程度，我觉得这个阶段你可以先不用花时间理解，后续的部分会提及到着一块，现在要搞懂的是 **Adapter** 的概念。
<br>
<br>
为何要先理解 Adapter 呢？因为 Android 有一个重要且用得非常频繁的组件 **ListView**，在 Android 5.0 以后，Google 推出了 **RecyclerView**，简单的说就是优化过的 ListView，要使用它们就要先学习 **Adapter**，因为它是这些组件的 **核心单元**。

<br>
### Thread
***

Android 程序几乎都要进行网络传输的，而在 Android 里面是限制 **UI Thread** 是执行网络操作的，所以要花时间理解 **多线程（Thread）** 的知识，这也算是 Android 开发的重点和难点吧。

<br>
### Call Back
***

Android 组件的事件处理（如点击事件）以及网络操作等，都要使用到 **Call back** 机制，彻底了解 Call back 机制，可以让你的程序不会出现让人啼笑皆非的架构。

<br>
### Else
***

其他的 **Coding style**, 团队合作用的 **Git**, **Android Studio Plugins**, **Coding tips**, 以及 **Clean Code** 等等的知识都能帮助你在写程序的时候，更好跟团队合作，以及拥有更高效率的产出。
<br>
<br>
林林种种打了一堆，其实很多东西网络上都有相关资源，可以自己去搜寻，这部分的知识也是学不完的，不过大致上就这些，把这些东西都理解好了，就可以进入下一阶段的探索。
