{:title "Android - 术语剖析 - Activity.onCreate"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**计算机** 是按照一系列称为 **程序** 的指令运行的机器。**Android 设备** 便是计算机，**应用** 是程序。设备内部是
称为 **变量** 的容器，用于存储数字或文本片段等 **值**。
<br>
<br>
能够包含小变量的大变量称为 **对象**。还可向对象附加称为 **方法** 的一系列指令，实际上是小程序。。执行
方法指令时，便是在 **调用** 该方法。
<br>
<br>
对象有许多个 **类**，其中一个类是 **Activity**。启动应用时，将自动创建一个属于此类的对象，然后调用其
中一个名为 [onCreate](http://developer.android.youdaxue.com/reference/android/app/Activity.html#onCreate(android.os.Bundle) 的对象方法。此方法的指令指示设备为应用创建并显示 **用户界面**。此界面由屏幕上
的信息显示区域和触摸敏感区(如按钮)组成。
<br>
<br>
当此应用的用户界面被其他应用覆盖时(例如，电话响起时)，将自动调用 Activity 对象的其他方法。当
不再需要应用的用户界面，可销毁该界面时，将调用最后一个方法 [onDestroy](http://developer.android.com/reference/android/app/Activity.html#onDestroy()。onCreate 是 Activity 对
象众多[生命周期](http://developer.android.youdaxue.com/reference/android/app/Activity.html#ActivityLifecycle)方法中的第一个方法。

<br>
## 代码示例
***

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // The following statement creates and displays the user interface.
        setContentView(R.layout.activity_main);
    }

}
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Activity-OnCreate.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
