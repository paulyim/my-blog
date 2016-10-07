{:title "Android - 应用程序架构 - （2015-11-07更新）"
 :layout :post
 :tags  ["android"]
 :toc true}

 <br>
 ***
 <br>

## 概述
***

当第一次构建 Android 应用程序时，大多数开发者可能都会应用 **MVC（Model View Controller）** 模式去开发应用程序，将所有的逻辑代码都写在 `activities` 或者 `fragments` 中，这种开发模式简单直接，也是传统开发应用程序的标准模式（web 开发非常适合），但是，在 Android 开发中，由于这种开发方式会导致业务逻辑代码紧紧地跟 Android 底层框架、生命周期和事件耦合在一起，这样会使得编写测试代码变得非常困难，因为测试代码是跟 `activities` 或者 `fragments` 独立开的，而且随着代码量大了维护也会变得麻烦。


有问题出现，必定就会有解决问题的人出现。因此，大家（开发界）熟知的“Bob 叔叔”（Robert Martin），在简洁架构的基本原则下，提出了一种更适合 Android 开发的架构模式，它也是分为三个层面：1. 显示给用户的内容（**presentation layer**（表现层）），2.应用程序的业务逻辑（**domain or use case layer**（业务逻辑层）），3. 应用程序的数据模型（**data layer**（数据模型层））。其中，表现层在最外面，业务逻辑层在中间，数据模型层在最里面。如下图所示：


<img src="http://oem503hzx.bkt.clouddn.com/Android-Clean-Architecture.png" />


要清楚每一层都有它们自己的数据模型，层与层之间可以交换数据，但不能跨层，通常也只是往一个方向交换数据（例如：外部向内部，或者内部向外部）。数据肯定是需要被交换的，层与层之间交换的数据模型也是对应的。通过这种方式，层与层之间的数据变化才能独立开来。


在数据模型层，所有类型的数据源（例如：文件、网络、内存）都应该应用 **Repository** 设计模式。按照最初提出者的介绍，它是衔接数据映射层和域之间的一个纽带，作用相当于一个在内存中的域对象集合。客户端对象把查询的一些实体进行组合，并把它们提交给 **Repository**。对象能够从 **Repository** 中移除或者添加，就好比这些对象在一个 **Collection** 对象上进行数据操作，同时映射层的代码会对应地从数据库中取出相应的数据。


上面的架构模式尝试应用 [单一职责原则](https://en.wikipedia.org/wiki/Single_responsibility_principle) 到 Android 开发中。 (观看资料 [this Droidcon talk](https://www.youtube.com/watch?v=-oZswd1j5H0) 或者 [this Droidcon 2016 talk](https://www.youtube.com/watch?v=R89ufpJI3SY)).

<br>
### 迁移到简明架构（Clean Architecture）
***

如果你想将应用迁移到以上的架构模式，不需要从零开始去重写代码，最好的方式是将你的逻辑代码从 `activities` 或者 `fragments` 中抽取出来，然后按照 **Model-View-Presenter (MVP)** 的架构模式去组织你的逻辑代码，可以参考以下示例：

* <https://github.com/Arello-Mobile/Moxy/>
* <http://www.tinmegali.com/en/model-view-presenter-android-part-1/>
* <https://medium.com/mobiwise-blog/android-basic-project-architecture-for-mvp-72f4b33252d0>
* <http://antonioleiva.com/mvp-android/>
* <https://github.com/konmik/konmik.github.io/wiki/Introduction-to-Model-View-Presenter-on-Android>
* <http://thefinestartist.com/android/mvp-pattern>
* <https://www.youtube.com/watch?v=BlkJzgjzL0c>
* <https://github.com/antoniolg/androidmvp>

<br>
## 模板
***

以下项目模板是遵从上面介绍的架构模式进行开发的：

* <https://github.com/dmilicic/Android-Clean-Boilerplate>
* <https://github.com/android10/Android-CleanArchitecture>
* <https://github.com/googlesamples/android-architecture>

<br>
## 参考
***

Clean architecture:

* <https://medium.com/@dmilicic/a-detailed-guide-on-developing-android-apps-using-the-clean-architecture-pattern-d38d71e94029>
* <https://www.youtube.com/watch?v=BlkJzgjzL0c>
* <http://fernandocejas.com/2014/09/03/architecting-android-the-clean-way/>
* <http://fernandocejas.com/2015/07/18/architecting-android-the-evolution/>
* <https://github.com/dmilicic/android-clean-sample-app>
* <https://speakerdeck.com/romainpiel/ingredients-for-a-healthy-codebase/>
* <http://macoscope.com/blog/model-view-presenter-architecture-in-android-applications/>
* <https://github.com/macoscope/RoomBookerMVP/tree/master/mvp/src/main/java/com/macoscope/>

MVVM Pattern:
* <https://labs.ribot.co.uk/approaching-android-with-mvvm-8ceec02d5442>
