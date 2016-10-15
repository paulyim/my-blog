{:title "使用 Kotlin 加速 Android 应用开发"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

[Kotlin](https://kotlinlang.org/) 是由 [JetBrains](https://www.jetbrains.com/) 公司创造的，运行在 JVM 上的一门静态类型编程语言。

编写 Java 程序时，最痛苦的莫过于重复编写大量的冗余代码了，当你编写了一个好几十万行代码的 Java 程序时，往往发现当中存在大量的 `getter` 和 `setter`！！！

哈哈，实际上你完全可以不用这么痛苦，用 Kotlin 替代 Java 开发你的程序，无论是 Android 还是 Server，你都能像之前写 Java 一样思考，同时又能享受到新一代编程语言的畅快。

<br>
## 为什么选择 Kotlin ？
***

* **简洁**　——　大幅度减少你需要编写的重复代码。
* **安全**　——　避免整个类中类似空指针异常这样的错误。（编写 Java 程序时被 `NullPointerException` 折磨得死去活来，难道就没有受够这种日子么？）
* **通用**　——　可以构建服务器端程序，Android 程序或者运行在浏览器里的前端程序。
* **重用**　——　重用已有的 JVM 平台框架或库，与 Java 无缝兼容。

<br>
## 基本语法
***

<br>
### 变量
***

不可变类型：

```kotlin
val a: Int = 1
val b = 1   // 如果不显式指定变量类型，Kotlin 会自动进行推断，这里推断出 `Int` 类型
val c: Int  // 编译不能通过，必须进行初始化
c = 1       // 显式赋值
```

可变类型：

```kotlin
var x = 5 // 被推断出 `Int` 类型
x += 1
```

<br>
### 函数
***

传递两个 `Int` 类型参数，返回值为 `Int` 的函数：

```kotlin
fun sum(a: Int, b: Int) :Int {
	return a + b
}
```

和变量一样，如果返回值不显式声明，那么 Kotlin 也会自动进行推断：

```kotlin
fun sum(a: Int, b: Int) = a + b
```

没有返回值的函数：

```kotlin
fun printSum(a: Int, b: Int): Unit { // Unit 可被忽略
  print(a + b)
}
```

<br>
### 集合
***

遍历集合：

```kotlin
for (name in names)
    println(name)
```

使用 `in` 操作符快速检查集合是否包含某个对象：

```kotlin
if (text in names) // Kotlin 会调用 names.contains(text)
    print("Yes")
```

使用 lambda 表达式快速操作集合元素（过滤、排序、遍历等）：

```kotlin
names
    .filter { it.startsWith("A") }
    .sortedBy { it }
    .map { it.toUpperCase() }
    .forEach { print(it) }
```

<br>
### 空指针安全（Null Safety）
***

```kotlin
val x: String? = "Hi"
x.length // 不进行编译，x 有可能为空 `null`
val y: String = null // 不进行编译
```

优雅地处理 `null`：

```kotlin
// 使用安全操作符 `?`
x?.length // 如果 `x` 不为空（`null`），返回 `x.length`，否则返回 `null`

// 三元运算符 `?:`
val len = x?.length ?: -1 // 如果 x 为空（`null`），返回 `-1`
```

<br>
## 开发环境配置
***

1. 安装好 Android Studio。
2. 在 Android Studio 中安装 `Kotlin`　插件，Android Studio 2.+ 版本默认集成了 `Kotlin`，不需要再手动安装。
3. 通过 `Gradle` 在项目中配置 `Kotlin`：

  * 在 Android Studio 中单击 `Tools` -> `Kotlin` -> `Configure Kotlin in Project`，如下图：
    <img src="http://oem503hzx.bkt.clouddn.com/Android-Using-Kotlin-Step-one.png" width="600"/>
  * 在弹出的菜单列表中选择 `Android with Gradle`，如下图所示：
    <img src="http://oem503hzx.bkt.clouddn.com/Android-Using-Kotlin-Step-two.png" width="600"/>
  * 在弹出的菜单列表中选择 `All Modules`，最后选择 `Kotlin compiler and the runtime version`，如下图：
    <img src="http://oem503hzx.bkt.clouddn.com/Android-Using-Kotlin-Step-three.png" width="600"/>

然后你的 `build.gradle` 会自动加上 `Kotlin` 所需的依赖，如下所示：

```gradle
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.3"

    defaultConfig {
        applicationId "com.example.hellokotlin"
        minSdkVersion 10
        targetSdkVersion 23
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    sourceSets {
        main.java.srcDirs += 'src/main/kotlin'
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.4.0'
    compile "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
}
repositories {
    mavenCentral()
}
```

到此，就可以在项目中使用 `Kotlin` 开发 Android 应用程序了。

<br>
## 将 Java 代码转换成 Kotlin 代码
***

在 Android Studio 中，打开 Java 代码文件，在顶部菜单栏找到 `Code` 选项，单击弹出的菜单列表选择 `Convert Java File to Kotlin File`，这样当前的 Java 代码就被转换成相应的 Kotlin 代码了，例如，转换后的 `MainActivity` 如下:

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

}
```

或者直接在项目中通过 `New` -> `Kotlin Activity` 手动创建。

<br>
## 参考
***

* <http://antonioleiva.com/kotlin-for-android-introduction/>
* <http://antonioleiva.com/kotlin-android-create-project/>
* <https://kotlinlang.org>
* <https://kotlinlang.org/docs/reference/>
* <https://www.youtube.com/watch?v=A2LukgT2mKc>
* <https://docs.google.com/document/d/1ReS3ep-hjxWA8kZi0YqDbEhCqTt29hG8P44aA9W0DM8/preview?hl=ru&forcehl=1>
