{:title "Android - Gradle 多渠道打包、配置签名信息"
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
* [Gradle 全局设置、自定义 BuildConfig、混淆](/posts-output/2016-08-27-Android-gradle-for-android-1.html)

<br>
## 多渠道打包
***

国内有太多 Android App 市场，每次发布都手动一个个进行打包那就太痛苦了。还好 Android Gradle 给我们提供了 `productFlavors`，我们可以对生成的 APK 包进行定制。

```groovy
productFlavors {  // 多渠道打包
    xiaomi {
        applicationId 'com.wuxiaolong.gradle4android1'
    }
    googlepaly {
        applicationId 'com.wuxiaolong.gradle4android2'
    }
}
```

<br>
### 定制生成的 apk 文件名
***

```groovy
applicationVariants.all { variant ->
   if (variant.buildType.name.equals('release')) {
       variant.outputs.each { output ->
           def outputFile = output.outputFile
           if (outputFile != null && outputFile.name.endsWith('.apk')) {
               def fileName = "gradle4android_v${defaultConfig.versionName}_${releaseTime()}_${variant.flavorName}.apk"
               output.outputFile = new File(outputFile.parent, fileName)
           }
       }
   }
}
```

输出 apk 名字：gradle4android_v1.0_2016-08-28_xiaomi.apk

<br>
### 占位符
***

多渠道打包，还会遇到一个问题，比如友盟统计的渠道号，Gradle 处理办法：manifestPlaceholders，它允许我们动态替换我们在 AndroidManifest 文件里定义的占位符。

`AndroidManifest.xml`：

```
<meta-data
     android:name="UMENG_CHANNEL"
     android:value="${UMENG_CHANNEL_VALUE}" />
```

如下，`${UMENG_CHANNEL_VALUE}` 占位符会被 `dev` 替换。

```groovy
defaultConfig {
    manifestPlaceholders = [UMENG_CHANNEL_VALUE: 'dev']
}
```

如果渠道太多，不用这样一个个去写，可以循环：

```groovy
productFlavors.all { flavor ->
    manifestPlaceholders.put("UMENG_CHANNEL_VALUE",name)
}
```

<br>
### 渠道打包完整代码
***

```groovy
android {
     // 省略部分代码

     buildTypes {
        release {
            minifyEnabled false // 是否启动混淆
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            applicationVariants.all { variant ->
                if (variant.buildType.name.equals('release')) {
                    variant.outputs.each { output ->
                        def outputFile = output.outputFile
                        if (outputFile != null && outputFile.name.endsWith('.apk')) {
                            def fileName = "gradleTest_v${defaultConfig.versionName}_${releaseTime()}_${variant.flavorName}.apk"
                            output.outputFile = new File(outputFile.parent, fileName)
                        }
                    }
                }
            }
            // 针对很多渠道
            //productFlavors.all { flavor ->
            // manifestPlaceholders.put("UMENG_CHANNEL_VALUE",name)
            // }
        }
    }
    productFlavors {  // 多渠道打包，命令行打包：gradlew assembleRelease
        xiaomi {
            applicationId 'com.wuxiaolong.gradle4android1'
            manifestPlaceholders.put("UMENG_CHANNEL_VALUE", 'xiaomi')
        }
        googlepaly {
            applicationId 'com.wuxiaolong.gradle4android2'
            manifestPlaceholders.put("UMENG_CHANNEL_VALUE", 'googlepaly')
        }
    }
 // 省略部分代码
def releaseTime() {
    return new Date().format("yyyy-MM-dd", TimeZone.getTimeZone("UTC"))
}
```

<br>
## 配置签名信息
***

<br>
### Android Studio 设置默认的签名文件
***

新浪微博 SSO 登录，微信分享这些都需要签名打包，才能看到效果，设置默认签名文件为自己的签名 `jks`，这样就不需要打包了直接运行起来就是正式的签名。
<br>
<br>
在 `android.signingConfigs{}` 下定义一个或者多个签名信息，然后在 `buildTypes{}` 配置使用即可。
<br>
<br>
在 app 目录下添加你的 `.jks`，然后 app 的 `build.gradle` 文件中的增加以下内容：
<br>
第一种：

```groovy
android {  
    signingConfigs {  
        debug {  
            storeFile file("kkstudio.jks")
            storePassword 'android'
            keyAlias 'android'
            keyPassword 'android'
        }          
    }  	
}
```

`buildTypes` 没有配置，也是直接取得 `debug`，是不是不配置默认取得是 debug 呢？
`<br>
第二种：

```groovy
android {  
    signingConfigs {  
        release {  
            storeFile file("kkstudio.jks")
            storePassword 'android'
            keyAlias 'android'
            keyPassword 'android'
        }          
    }  
	buildTypes {
        debug {
            signingConfig signingConfigs.release
        }        
    }
}
```

<br>
## 签名打包
***

<br>
### 通过 Android Studio 签名
***

步骤非常简单，这里就不细说了。

<br>
### 通过命令行签名
***

如上那样配置签名信息：

```groovy
android {  
    signingConfigs {  
        release {  
            storeFile file("kkstudio.jks")
            storePassword 'android'
            keyAlias 'android'
            keyPassword 'android'
        }          
    }  
	buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }      
    }
}
```

先 ”build-clean Project”，然后命名行执行：

```
$ gradlew assembleRelease
```

打印信息如下：

```
:app:preBuild UP-TO-DATE                                                             
:app:preReleaseBuild UP-TO-DATE     
:app:checkReleaseManifest                  
// 省略部分               
:app:packageRelease                 
:app:zipalignRelease                 
:app:assembleRelease                 

BUILD SUCCESSFUL
```

Ok , 打包成功的 apk 文件路径在项目根目录的 `Gradle4Android/app/build/outputs/apk/app-release.apk` 下，如下图：

<img src="http://oem503hzx.bkt.clouddn.com/Android-gradle-for-android-2.png" width="600"/>
