{:title "Android - 开发历程回顾（2）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

之前提到了编写 Android 程序之前应先了解 **Test（测试）** 和 **Code（写代码）** 的初步，这一篇继续来讲 **Code** 的 **第二部分**。

* [Android - 开发历程回顾（0）](/posts-output/2016-09-10-Android-development-road-0.html)
* [Android - 开发历程回顾（1）](/posts-output/2016-09-18-Android-development-road-1.html)

<br>
##　第二部分
***

<img src="http://oem503hzx.bkt.clouddn.com/Android-dev-road-2.png" width="800"/>

我认为当熟悉了一些 Android 的基础架构后，就可以开始了解上面这四个比较 **进阶** 的知识了，譬如：

<br>
###　Third Party Libraries（开源库）
***

原则上，就是看一看网络上人家提供的程序，有些程序是可以直接帮助你完成想做的事情，既然有人造好轮子了，也就不用自己造轮子。可以让事情的进展更快，又可以学习到别人的程序架构，**何乐而不为呢***？
<br>
<br>
我自己平常是看以下几个 Github 上的项目，看到新的东西就去想自己大概要怎么把它实现出来，大约需要几天，有空就去实践吧，欢迎交流：
* [GitHub Android Libraries Top 100](https://github.com/Freelander/Android_Data/blob/master/Android-Librarys-Top-100.md)
* [Libraries for developers](https://play.google.com/store/apps/details?id=com.desarrollodroide.repos&hl=zh_TW)

<br>
###　Design Pattern（设计模式）
***

随着写程序解决的问题多了以后，会发现有很多问题不是那么的好解决，会去想有没有更好的解法，这时你就该开始看一看 **Design Pattern** 了。一方面可以验证你的想法，也可以知道别人如何优雅地解决这些问题。譬如前一部分的 **Adapter** 就是一个经典的 **Design Pattern** 。
<br>
<br>
相关的书籍网络上很多，我自己主要是参考以下：
* <http://openhome.cc/Gossip/DesignPattern/>
* <http://teddy-chen-tw.blogspot.tw/search/label/Patterns>
* <https://nlhsueh.gitbooks.io/oose/content/manuscript/ch5DesignPattern.html>
* <https://wirelessr.gitbooks.io/working-life/content/c_design_pattern.html>

<br>
###　OOP(Object-oriented programming)（面向对象编程）
***

其实我自己是写程序的过程中慢慢去体会和理解这个东西的，我也不知道自己算不算是很懂 **OOP** 了，但应该还是有点感觉的。
<br>
<br>
简单来说就是写程序要面向对象，拟人化，这样在解决问题的时候就会非常符合人的直觉，而不会觉得很复杂或是很让人思考起来很不舒服。
<br>
<br>
这块知识我比较建议去看相关的实体书籍，网络上的资源东一块、西一块的，看着看着可能就更不懂了，未来有机会我再整理一套我自己对 **OOP** 的看法...

<br>
###　DI (Dependency Inversion Principle)（依赖反转原则）
***

我以前写程序的时候也不是很懂这个东西，一直到我后来程序写得越来越复杂后，发现测试开始很麻烦的时候，才开始接触这个概念。
> program to an interface, not an implementation

<br>
写接口，而非实现。
<br>
少用继承，多用接口。
<br>
<br>
这部分我还不知道如何清楚的描述，就不多说。下面列出我在学习时看的一些网络资源：
* [Wiki](https://en.wikipedia.org/wiki/Dependency_inversion_principle)
* [乱谈软体设计（5）：Dependency-Inversion Principle](http://teddy-chen-tw.blogspot.hk/2012/01/5dependency-inversion-principle.html)
* [Android 中的依赖注入：Dagger 函数库的使用（一）](https://asce1885.gitbooks.io/android-rd-senior-advanced/content/androidzhong_de_yi_lai_zhu_ru_ff1a_dagger_han_shu_ku_de_shi_yong_ff08_yi_ff09.html)

<br>
<br>
Android 有些 Framework 就是为了方便实现这个概念而开发的，譬如 **Dagger** 。
<br>
<br>
我自己觉得 **OOP** 和 **DI** 是对立且需要兼备的能力，对立的原因是因为为了顾及 **DI** ，写程序时要考虑得非常多（可能是我相关的知识还不熟悉吧），而兼备的原因是因为，良好的 **OOP** 设计可以让架构非常完善和便于后期改进，而良好的 **DI** 可以让测试变得非常简单和方便。
<br>
<br>
这两者在做 **系统架构** 时都是非常重要的技能，我觉得自己目前在这方面仍需努力。
