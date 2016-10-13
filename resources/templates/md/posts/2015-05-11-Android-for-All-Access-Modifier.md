{:title "Android - 术语剖析 - 访问修饰符（Access Modifier）"
 :layout :post
 :tags  ["android"]
 :toc true
 :draft? true}

<br>
***
<br>

## 概述
***

计算机是按照一系列称为程序的指令运行的机器。Android 设备便是计算机,应用是程序。设备内部是
称为变量的容器,用于存储数字或文本片段等值。

对象是变量,但在以下两个方面特殊。第一,对象中可包含更小的变量,即对象的域。第二,我们可向
对象附加称为方法的一系列指令,实际上是小程序。

对象分多种类(类型)。每个给定类的对象都有一组相同的域和方法。针对每个类,我们必须编写定
义:即属于此类的所有对象的域和方法列表。

代码样例是 Car 类的定义。每个 Car 对象都包含一个名为 mModel 的域,用于存储该特定 Car 对象的型
号。每个 Car 对象也有两个构造函数方法,创建 Car 时,必须调用(执行)其中的一个方法。每个构造
函数为新建 Car 对象的 mModel 域赋值,同时调用 setup 方法以完成对象设置。

类定义为类的每个域和方法指定一个访问修饰符。例如,类 Car 的构造函数为 public:可在应用的其他
类对象的方法中调用这些构造函数。这样,其他类的对象便可创建 Car 类的对象。另一方面,mModel
域为 private:只能在该域所属的类的方法内使用该域。当某个域的访问修饰符为 private 时,便称该域
已被封装。setup 方法也为 private,因为该方法仅由此类的其他方法使用。

<br>
## 代码示例
***

```java
public class Car {
    private int mModel;

    public Car() {
        mModel = 0;
        setup();
    }

    public Car(int model) {
        mModel = model;
        setup();
    }

    private void setup() {
        String message = "Created a car of model number " + mModel + ".";
        Toast toast = Toast.makeText(this, message, Toast.LENGTH_SHORT);
        toast.show();
    }
}
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Access-Modifier.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
