{:title "Android - 主题和样式"
 :layout :post
 :tags  ["android"]
 :toc true}

 <br>
 ***
 <br>

## 概述
***

 Styles 允许你定义在 Android 中你所看到和感受的，比如颜色和字体，通常，这些样式元素会被集中定义在一个 xml（styles.xml） 文件中。

 这样做可以避免重复定义样式元素，就像网页开发中的 css 样式一样，当在指定的（styles.xml）文件中定义样式元素后，就可以在应用程序的视图组件中引用它。

<br>
## 使用
***

Styles 结合 drawables 资源可以很方便有效地管理我们所看到的那些复制多样的 UI 定义。Styles 可以定义成一系列带名称属性的样式供应用程序的视图组件调用。Styles 之间也可以相互继承，减少重复的定义。

<br>
### 定义和使用样式
***

 首先，样式的 XML 文件应该被定义在 `res/values/styles.xml`:

 ```xml
 <style name="LargeRedFont">
     <item name="android:textColor">#C80000</item>
     <item name="android:textSize">40sp</item>
 </style>
 ```

 这样一来就可以在视图控件中调用这些样式属性：

 ```xml
 <TextView
   android:id="@+id/tv_text"
   style="@style/LargeRedFont"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   android:text="@string/hello_world" />
 ```

<br>
### 继承样式
***

 有时候，你想在已有的样式下添加或修改部分样式属性，`<style>` 标签中的 `parent` 就是用来实现这个的，通过它你就可以在已有的样式中添加或修改新的样式属性，而不需要重新定义同样的样式属性，示例如下：

 ```xml
 <style name="LargeFont">
     <item name="android:textSize">40sp</item>
 </style>

 <style name="LargeBlueFont" parent="@style/LargeFont">
   <item name="android:textColor">#00007f</item>
 </style>
 ```

 如下为另外一种方式继续样式，前提是继承的样式必须是你自己定义好的，如下：

 ```xml
 <style name="LargeFont">
     <item name="android:textSize">40sp</item>
 </style>

 <style name="LargeFont.Red">
     <item name="android:textColor">#C80000</item>
 </style>
 ```

 使用第二种方式可以快速继承多个样式属性：

 ```xml
 <style name="LargeFont.Red.Bold">
     <item name="android:textStyle">bold</item>
 </style>

 <style name="LargeFont.Red.Big">
     <item name="android:textSize">30sp</item>
 </style>
 ```

 上面提到过，使用第二种方式是不能继续 Android 内建的样式属性的，这种情况只能使用第一种方式：

 ```xml
 <style name="CustomButton" parent="@android:style/Widget.Button">
   <item name="android:gravity">center_vertical|center_horizontal</item>
   <item name="android:textColor">#FFFFFF</item>
 </style>
 ```

<br>
### 使用主题
***

 通常情况，我们让应用程序中所有的 activities 应用同一种主题（风格统一能提高用户体验），相对上面单独地定义样式属性我们可以将样式属性统一定义成一个 **主题（Theme）**，这个主题可以被应用在 Activity 或者 Application 中。

<br>
### 定义主题
***

 ```xml
 <style name="LightThemeSelector" parent="android:Theme.AppCompat.Light">
     ...
 </style>
 ```

 通过 `<style>` 标签的字节点 `<item>` 可以引用其他的样式（styles）或者颜色（colors）：

 ```xml
 <style name="LightThemeSelector" parent="android:Theme.AppCompat.Light">
     <item name="android:windowBackground">@color/custom_theme_color</item>
     <item name="android:colorBackground">@color/custom_theme_color</item>
 </style>
 ```

<br>
### 配置主题属性
***

 很多时候，我想 **修改视图默认的样式属性**，比如，改变 `TextView` 或者 `Button` 的字体颜色，在 `res/values/styles.xml` 中，首先继承默认的视图样式，然后修改你想改变的单独样式属性，示例如下：

 ```xml
 <resources xmlns:android="http://schemas.android.com/apk/res/android">
     <!-- ...省略了自动生成的文件 -->

     <!-- 这是系统自带的主题样式 -->
     <style name="AppTheme" parent="AppBaseTheme">
         <!-- 这里定义你自己的样式 -->
         <item name="android:buttonStyle">@style/Widget.Button.Custom</item>
         <item name="android:textViewStyle">@style/Widget.TextView.Custom</item>
     </style>

     <!-- 自定义一个按钮（Button）的文本颜色 -->
     <style name="Widget.Button.Custom" parent="android:Widget.Button">
       <item name="android:textColor">#0000FF</item>
     </style>

     <!-- 自定义一个文本（TextView）的文本颜色 -->
     <style name="Widget.TextView.Custom" parent="android:Widget.TextView">
       <item name="android:textColor">#00FF00</item>
     </style>
 </resources>
 ```

 上面首先通过 `AppTheme` 为我们生成和修改 [buttonStyle](http://developer.android.youdaxue.com/reference/android/R.attr.html#buttonStyle) 和 `textViewStyle` 的默认样式，然后分别继承 `Widget.Button` 和 `Widget.TextView` 修改各自的文本颜色，效果如下：

 ![Screen](http://oem503hzx.bkt.clouddn.com/Android-StylesDemo.png)

<br>
### 一些有用的资源
***

 如果你不知道怎么去定义自己的主题和样式，可以参考下面的一些资源：
* [themes.xml](http://omapzoom.org/?p=platform/frameworks/base.git;a=blob;f=core/res/res/values/themes.xml;hb=master) 一个包含了超过千种默认样式的应用程序
* [R.attr](http://developer.android.youdaxue.com/reference/android/R.attr.html) 一个完整的样式属性文档
* [Useful holo theme generator tool](http://android-holo-colors.com/) 快速生成默认的视图控件（可以自定义颜色）
* [Customizing Action Bar styles guide](2014-03-24-Extended-ActionBar-Guide#custom-actionbar-styles) and [sample code](https://github.com/codepath/android-actionbar-style-demo) 定制 Action Bar

<br>
### 使用定义好的主题
***

 为了让应用程序的所有 activities 应用同一种主题（theme），通过在 `AndroidManifest.xml` 文件的 `<application>` 标签的 `android:theme` 属性引用定义好的主题样式，示例如下：

 ```xml
 <application android:theme="@style/CustomTheme">
 ```

 或者单独在某个 activity 应用：

 ```xml
 <activity android:theme="@style/CustomTheme">
 ```

 更多信息请参考官方文档 [official styles guide](http://developer.android.youdaxue.com/guide/topics/ui/themes.html)。

<br>
### 引用主题（themes）中的样式（styles）
***

 当你在 `AndroidManifest.xml` 中为应用程序指定了一个主题（theme），就可以在任何的视图控件中调用主题中定义的样式属性，比如，我想在 `EditText` 中应用主题的主要颜色，可以通过 `?attr` 语法调用，示例如下：

 ```xml
 <EditText
    android:textColor="?attr/colorPrimary"
    android:layout_width="wrap_content"
    android:layout_height="match_parent"
    android:text="abc"/>
 ```

 另外一个示例 [state lists](posts-output/2014-03-24-Drawables#state-list):

 ```xml
 <selector xmlns:android="http://schemas.android.com/apk/res/android">
     <item android:color="?attr/colorAccent" android:state_enabled="false"/>
     <item android:color="?attr/colorPrimary"/>
 </selector>
 ```

 注意，在 java 代码中调用请使用 `ContextCompat` 或者 `AppCompatResources` 帮助类，示例如下：
 ```java
 // getResources().getColor() 已经被废弃，请使用 ContextCompat 替代
 ContextCompat.getColor(R.color.button_text_state_list);

 // 获取定义的颜色属性
 ColorStateList colorState = AppCompatResources.getColorStateList(this, R.color.button_text_state_list).getDefaultColor();
 ```

 drawables 也是：

 ```java
 // getResources().getDrawable() 已经被废弃
 Drawable drawable = AppCompatResources.getDrawable(this, R.drawable.my_drawable);
 ```

<br>
## 相关工具
***

* <http://jgilfelt.github.io/android-actionbarstylegenerator>
* <http://android-holo-colors.com/>
* <http://android-ui-utils.googlecode.com/hg/asset-studio/dist/index.html>

<br>
## 参考
***

* <http://developer.android.youdaxue.com/guide/topics/ui/themes.html>
* <http://www.vogella.com/articles/AndroidStylesThemes/article.html>
* <http://mobile.tutsplus.com/tutorials/android/android-sdk-exploring-styles-and-themes/>
* <http://developer.android.youdaxue.com/guide/topics/resources/style-resource.html>
* <http://java.dzone.com/articles/creating-custom-android-styles>
* <http://janrain.com/blog/introduction-to-android-theme-customization/>
* <http://javatechig.com/android/android-styles-and-themes-tutorial/>
