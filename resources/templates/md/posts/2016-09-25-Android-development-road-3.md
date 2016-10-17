{:title "Android - 开发历程回顾（3）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

之前提到了编写 Android 程序之前应先了解 **Test（测试）** 和 **Code（写代码）** 的初步，这一篇继续来讲 **Code** 的 **第三部分**。

* [Android - 开发历程回顾（0）](/posts-output/2016-09-10-Android-development-road-0.html)
* [Android - 开发历程回顾（1）](/posts-output/2016-09-18-Android-development-road-1.html)
* [Android - 开发历程回顾（2）](/posts-output/2016-09-24-Android-development-road-2.html)

<br>
##　第三部分
***

当走过第一第二部分之后，我相信大部分的 Android App 规划已经不是什么问题，但比较困惑的是之后呢？我应该往 **广** 的方向发展，还是往 **深** 的方向钻研？这点我目前也没有肯定答案，看以后造化吧。回到正题，看图：

<img src="http://oem503hzx.bkt.clouddn.com/Android-dev-road-3.png" width="800"/>

<br>
###　Gradle(Groovy)
***

我觉得接触 **Gradle** 久了以后，会自然而然地去接触 **Groovy** 这门语言，用来编写 Gradle 。
<br>
<br>
譬如如何利用 **Product flavors** 去快速部署不同外观但相同内容的 **Application**，或是利用 Gradle 自动产生对应的版本号、跑自动测试等等。
<br>
<br>
值得高兴的是 **Android Studio** 内建了许多强大的 **Gradle Script** ，我通常搞懂相关 Script 是干什么的就能顺利的使用这些功能。
<br>
<br>
相关资源推荐：
* [Gradle Android 插件用户指南翻译](http://avatarqing.github.io/Gradle-Plugin-User-Guide-Chinese-Verision/build_variants/product_flavors.html)
* [Android productFlavors & sourceSets 介紹](http://blog.xuite.net/saso0704/wretch/417989281)

<br>
###　RxJava
***

**RxJava** 应该是近一两年内最红火的程序写法了，相关网络资源超级多，就不多赘述。

<br>
###　Cross Platform Language
***

如果想要发展“双刀流”（Android, IOS），**React Native** 或是比较古老的 **Cordova** 都可以，最近跟人交流时也有听过使用 **CMake** 实现 **非 UI** 的程序架构，供不同平台的语言使用，感兴趣就自己去了解吧！相关资源：
* [React Native](https://facebook.github.io/react-native/)
* [React Native 中文网](http://reactnative.cn/)
* [Apache Cordova](https://cordova.apache.org/)
* [CMake](https://cmake.org/)

<br>
###　AOSP
***

如果想搞清楚 Android 四大组件是如何实现的，或是想知道 Android 从开机到用户界面这一整套流程机制是如何运行的，可以花些时间钻研这个，我提供一些相关资源吧：
* [AOSP 官网](https://source.android.com/)
* [AndroidXRef](http://androidxref.com/)

<br>
###　Domain knowhow
***

或许你的工作注重的是非程序方面的商业逻辑，那么就会有许多值得探索的地方，有时候要解决一些现实中的需求，需要的不只是程序的专业，而是一些非程序的专业知识，如何与程序结合，也是一门技艺。
<br>
<br>
***
以上是我这两年接触 Android 开发的一点心得，趁这段时间比较闲，就把这两年来学到的东西，系统性的自我分析一下，希望能给自己一个更清楚的认识，从而在未来 Android 开发的路上走得更远。
