{:title "Android - Gradle 全局设置、自定义 BuildConfig、混淆"
 :layout :post
 :tags  ["android" "gradle"]
 :toc true}

<br>
***
<br>

## 概述
***

相关系列：

* [Gradle 基本配置、依赖管理](/posts-output/2016-08-21-Android-gradle-for-android-0.html)

<br>
## 全局设置
***

如果有很多项目，可以设置全局来统一管理版本号或依赖库，根目录下　`build.gradle`　下：

```groovy
ext {
    compileSdkVersion = 23
    buildToolsVersion = "23.0.2"
    minSdkVersion = 14
    targetSdkVersion = 23
}
```

`app/build.gradle`

```groovy
android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion
    defaultConfig {
        applicationId "xyz.kkstudio.gradle4android"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
```

可以在根目录下建个 `config.gradle`，然后只需在根目录下 `build.gradle` 最顶部加上下面一行代码，然后同步下，意思就是所有的子项目或者所有的 modules 都可以从这个配置文件里读取内容。

```groovy
apply from: "config.gradle"
```

`config.gradle`

```groovy
ext {
    android = [
        compileSdkVersion: 23,
        buildToolsVersion: "23.0.2",
        minSdkVersion    : 14,
        targetSdkVersion : 22,
    ]
    dependencies = [
        appcompatV7': 'com.android.support:appcompat-v7:23.2.1',
        design      : 'com.android.support:design:23.2.1'
    ]
}
```

`app/build.gradle`

```groovy
android {
    compileSdkVersion rootProject.ext.android.compileSdkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion
    defaultConfig {
        applicationId "xyz.kkstudio.gradle4android"
        minSdkVersion rootProject.ext.android.minSdkVersion
        targetSdkVersion rootProject.ext.android.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }

...

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile rootProject.ext.dependencies.appcompatV7
    compile rootProject.ext.dependencies.design
}
```

<br>
## 自定义 BuildConfig
***

实际开发中服务器可能有正式环境和测试环境，gradle 可以通过 `buildConfigField` 来配置：

```groovy
defaultConfig {
   buildConfigField 'String','API_SERVER_URL','"http://paulyim.coding.me"'
}
```

`buildConfigField` 一共有 3 个参数，第一个是数据类型，和 Java 的类型是对等的；第二个参数是常量名，这里是 `API_SERVER_URL`；第三个参数就是你要配置的值，示例：

`app/build/generated/source/buildConfig/debug`

```java
package xyz.kkstudio.gradle4android;

public final class BuildConfig {
  public static final boolean DEBUG = Boolean.parseBoolean("true");
  public static final String APPLICATION_ID = "xyz.kkstudio.gradle4android";
  public static final String BUILD_TYPE = "debug";
  public static final String FLAVOR = "";
  public static final int VERSION_CODE = 1;
  public static final String VERSION_NAME = "1.0";
  // 配置 API_SERVER_URL 常量
  public static final String API_SERVER_URL = "http://paulyim.coding.me";
}
```

在代码取得这个常量值：

```java
Log.d("py", "API_SERVER_URL=" + BuildConfig.API_SERVER_URL);
```

<br>
## 启用 proguard 混淆
***

一般 `release` 发布版本是需要启用混淆的，这样别人反编译之后就很难分析你的代码，而我们自己开发调试的时候是不需要混淆的，所以 `debug` 不启用混淆。对 `release` 启用混淆的配置如下：

```groovy
android {
    buildTypes {
        release {
            minifyEnabled true   // 是否启动混淆
            shrinkResources true // 是否移除无用资源文件，shrinkResources 依赖于 minifyEnabled，必须和 minifyEnabled 一起用
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
   }
}
```

`minifyEnabled` 为 `true` 表示启用混淆，`proguardFile` 是混淆使用的配置文件，这里是 module 根目录下的 `proguard-rules.pro` 文件。
