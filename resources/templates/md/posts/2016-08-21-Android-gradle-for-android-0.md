{:title "Android - Gradle 基本配置、依赖管理"
 :layout :post
 :tags  ["android" "gradle"]
 :toc true}

<br>
***
<br>

## 概述
***

Gradle 是一种基于 Groovy 的动态 DSL，而 Groovy 语言是一种基于 jvm 的动态语言。这里只关注实际开发中会用到的场景，不需要去学习 Groovy 语言，知道 Java 的就很容易阅读 Groovy 语言的。

<br>
## 基本配置
***

新建项目，目录结构如下：

<img src="http://oem503hzx.bkt.clouddn.com/Android-gradle-for-android-0.png" width="600"/>

<br>
### app/build.gradle
***

初始化的 Gradle 配置：

```groovy
pply plugin: 'com.android.application'
android {
    compileSdkVersion 23
    buildToolsVersion "23.0.2"
    defaultConfig {
        applicationId "com.wuxiaolong.gradle4android"
        minSdkVersion 15
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
}
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.2.1'
    compile 'com.android.support:design:23.2.1'
}
```

```groovy
apply plugin: ‘com.android.application’，  // 表示该 module 是一个 app module，应用了 com.android.application 插件，如果是一个 android library，那么这里写 apply plugin: ‘com.android.library’

compileSdkVersion：  // 基于哪个 SDK 编译，这里是 API LEVEL

buildToolsVersion：  // 基于哪个构建工具版本进行构建的

defaultConfig：  // 默认配置，如果没有其他的配置覆盖，就会使用这里的

applicationId：  // 配置包名的

versionCode：  // 版本号

versionName：  // 版本名称

// buildTypes 是构建类型，常用的有 release 和 debug 两种，可以在这里面启用混淆，启用 zipAlign 以及配置签名信息等

// dependencies：不属于 Android 专有的配置了，它定义了该 module 需要依赖的 jar，aar，jcenter 库信息
```

<br>
### gradle-wrapper.properties
***

声明了 gradle 的目录与下载路径以及当前项目使用的 gradle 版本，这些默认的路径我们一般不会更改的：

```groovy
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-2.8-all.zip
```

<br>
### 根目录的 build.gradle
***

定义在这个工程下的所有模块的公共属性：

```groovy
buildscript {
    repositories {
        jcenter()//使用jcenter库
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:1.5.0'// 依赖 android 提供的 1.5.0 的gradle build
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
// 为所有的工程的 repositories 配置为 jcenters
allprojects {
    repositories {
        jcenter()
    }
}
task clean(type: Delete) {
    delete rootProject.buildDir
}
```

<br>
### setting.gradle
***

含哪些模块，比如有 `app` 和 `library`：

```groovy
include ':app',':library'
```

<br>
## 依赖管理
***

<br>
### 本地依赖
***

<br>
#### jar
***

默认情况下，新建的 Android 项目会有一个 `libs` 文件夹：

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])  // 即添加所有在 libs 文件夹中的 jar
    //compile files('libs/kkstudio.jar') // 不需要这样一个个去写了
}
```

<br>
#### so 包
***

用 c 或者 c++ 写的 library 会被叫做 so 包，Android 插件默认情况下支持 native 包，你需要把 `.so` 文件放在对应的文件夹中：

```
app
   ├── AndroidManifest.xml
   └── jniLibs
       ├── armeabi
       │   └── kkstudio.so
       ├── armeabi-v7a
       │   └── kkstudio.so
       ├── mips
       │   └── kkstudio.so
       └── x86
           └── kkstudio.so
```

<br>
#### aar 文件
***

library 库输出文件是 `.aar` 文件，包含了 Android 资源文件，在 library 工程 `build/output/aar/`` 下：
<br>
<br>
直接依赖 library 库：

```groovy
dependencies {
    compile project(':library 名字')
    compile project(':libraries:library 名字') //多个 library，libraries 是文件夹名字
}
```
<br>
<br>
依赖 `.aar` 文件：

创建一个 `aars` 文件夹，然后把 `.aar` 文件拷贝到该文件夹里面，然后添加该文件夹作为依赖库：

`app/bulid.gradle`

```groovy
repositories {
    flatDir {
        dirs 'aars'
    }
}
dependencies {
    compile(name:'libraryname', ext:'aar')
}
```

**注意：** 如果你的 library 依赖了第三方库，须 app 再次依赖。

<br>
### 远程仓库
***

```groovy
dependencies {
    compile 'com.jakewharton:butterknife:8.4.0'
}
```
