{:title "Android - 目录结构"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

* `src` - Java 源代码所在目录。
* `res` - 应用程序的资源文件，例如图片、字符串资源、布局文件等放在此处。
* `res/layout` - 放置应用程序的 XML 布局文件。
* `res/values` - XML 布局文件引用的相关属性定义，分别有 [strings.xml](http://guides.codepath.com/android/Understanding-App-Resources#defining-a-string-resource), dimens.xml, [styles.xml](http://paulyim.coding.me/posts-output/2014-03-23-themes-styles.html), colors.xml, [themes.xml](http://guides.codepath.com/android/Developing-Custom-Themes) 等其他。
* `res/drawable` - 这里存放应用程序的各种分辨率的图片资源。
* `res/drawable-hdpi` - 上面（`res/drawable`）的一种（高分辨率），用得比较多。

经常进行文件编辑的目录：

* `res/layout/activity_foo.xml` - 这个布局文件定义了应用程序的一个视窗布局。
* `src/.../FooActivity.java` - 应用程序的逻辑代码。
* `AndroidManifest.xml` - 应用程序的主清单文件。

其他不经常进行文件编辑的目录：

* `gen` -　自动生成的 Java 代码
* `assets` - 非编译的文件放在这里，用得甚少。
* `bin` - 项目构建文件。
* `libs` - 应用程序要引用的第三方类库 (jars)。

## 参考

* <http://developer.android.youdaxue.com/tools/projects/index.html#ApplicationProjects>
* <http://www.codeproject.com/Articles/395614/Basic-structure-of-an-Android-project>
* <http://mobile.tutsplus.com/tutorials/android/android-sdk-app-structure/>
