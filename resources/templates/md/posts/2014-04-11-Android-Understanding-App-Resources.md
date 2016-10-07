{:title "Android - 理解资源文件类型"
 :layout :post
 :tags  ["android"]
 :toc true}

 <br>
 ***
 <br>

## 概述
***

在 Android 开发中，所有东西都是 **资源（resource）**。[定义资源](http://developer.android.youdaxue.com/guide/topics/resources/providing-resources.html) 之后，就可以在应用程序的任何地方 [引用资源](http://developer.android.com/guide/topics/resources/accessing-resources.html)。

Android 最佳实践的其中之一，就是将应用程序的资源（颜色、图片、布局文件、菜单文件和字符串资源等）统一定义，而不是硬编码。这样不但便于管理，同时也便于后期的维护。例如，如果你的应用程序需要进行国际化，那么以这种方式去管理多种语言的 **字符串资源（string resources）** 就非常的灵活了。

<br>
### 资源类型
***

以下为 Android 开发中最常用的资源类型：

<table class="table table-bordered">
<thead>
<tr>
<th>类型</th>
<th>文件夹</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>Property Animations（属性动画）</td>
<td>`animator`</td>
<td>定义属性动画的 XML 文件</td>
</tr>
<tr>
<td>Tween Animations（补间动画）</td>
<td>`anim`</td>
<td>定义补间动画的 XML 文件</td>
</tr>
<tr>
<td>Drawables</td>
<td>`drawable`</td>
<td>存放各种分辨率的图片或者 XML 定义的图片资源</td>
</tr>
<tr>
<td>Layout</td>
<td>`layout`</td>
<td>定义用户界面的 XML 布局文件</td>
</tr>
<tr>
<td>Menu</td>
<td>`menu`</td>
<td>定义导航栏菜单的 XML 文件</td>
</tr>
<tr>
<td>Values</td>
<td>`values`</td>
<td>定义字符串资源、颜色或其他资源数据的 XML 文件</td>
</tr>
</tbody>
</table>

其中，上面的 `Values` 里通常又包含以下模块：

<table class="table table-bordered">
<thead>
<tr>
<th>类型</th>
<th>文件夹</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>Colors</td>
<td>`res/values/colors.xml`</td>
<td>[颜色定义](http://developer.android.youdaxue.com/guide/topics/resources/more-resources.html#Color)（例如：文本颜色）</td>
</tr>
<tr>
<td>Dimensions</td>
<td>`res/values/dimens.xml`</td>
<td>[尺寸定义](http://developer.android.youdaxue.com/guide/topics/resources/more-resources.html#Dimension)（例如：内边距）</td>
</tr>
<tr>
<td>Strings</td>
<td>`res/values/strings.xml`</td>
<td>[字符串定义](http://developer.android.youdaxue.com/guide/topics/resources/string-resource.html)（例如：文本标题）</td>
</tr>
<tr>
<td>Styles</td>
<td>`res/values/styles.xml`</td>
<td>[样式定义](http://developer.android.youdaxue.com/guide/topics/resources/style-resource.html)（例如：导航栏的颜色）</td>
</tr>
</tbody>
</table>

官方完整的资源列表 [Providing a Resource](http://developer.android.youdaxue.com/guide/topics/resources/providing-resources.html).

<br>
## 资源提供
***

<br>
### 定义字符串资源
***

应用程序中所看到的文本（例如：按钮的文本、TextView 的文本），都应该事先在 `res/values/strings.xml` 文件中以“键值对”的形式定义好。例如，如果需要定义一个"提交"按钮，代码如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="hello">Hello!</string>
    <string name="submit_label">提交</string>
</resources>
```

这样，就可以通过 `submit_label` 去引用它，显示的文本为“提交”。以后，就可以以 `submit_label` 这个唯一的标识符去定义不同的值（例如：不同国家显示不同的语言文本）。或者通过 `CDARA` 语法定义一些更复杂的字符串（html 或一些特定的字符），示例如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <string name="feedback_label">
  <![CDATA[
    如果您有什么建议或反馈，请通过 <a href="http://highlight.com">告知我们</a> 网站进行操作，谢谢！
  ]]>
  </string>
</resources>
```

更多相关内容 [字符串资源](http://developer.android.youdaxue.com/guide/topics/resources/string-resource.html)、[样式资源](http://developer.android.youdaxue.com/guide/topics/resources/style-resource.html)、[其他类型资源](http://developer.android.youdaxue.com/guide/topics/resources/more-resources.html).

<br>
### 引用资源
***

上面定义的字符串资源，可以使用 `@` 在布局文件中引用：

```xml
<Button
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="@string/submit_label" />
```

或者使用 `getResources.getString` 或 `getString` 方法在 Java 代码中引用：

```java
String submitText = getResources().getString(R.string.submit_label)
```

其他类型的资源文件使用方法都一样，`getResources` 方法是 Android 自带的将 [资源](http://developer.android.youdaxue.com/reference/android/content/res/Resources.html) 封装成 Java 对象返回。上面所有类型的资源文件都放在 `res` 目录下，每种类型是资源文件对应着一个文件夹。

<br>
### 定义颜色资源
***

对应的目录为 `res/values/colors.xml` ，示例如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
   <color name="white">#FFFFFF</color>
   <color name="yellow">#FFFF00</color>
   <color name="fuchsia">#FF00FF</color>
</resources>
```

在 Java 代码中引用：

```java
// getResources().getColor() 方法已经被废弃
// Resources res = getResources();
// int color = res.getColor(R.color.yellow);

// 使用 ContextCompatResources 替代 getColor()
int color = ContextCompat.getColor(context, R.color.yellow);
```

在 XML 布局文件中引用：

```xml
<TextView
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:textColor="@color/fuchsia"
    android:text="Hello"/>
```

<br>
### 定义尺寸资源
***

对应的目录为 `res/values/dimens.xml`，示例如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <dimen name="textview_height">25dp</dimen>
    <dimen name="textview_width">150dp</dimen>
    <dimen name="ball_radius">30dp</dimen>
    <dimen name="font_size">16sp</dimen>
</resources>
```

在 Java 代码中引用：

```java
Resources res = getResources();
float fontSize = res.getDimension(R.dimen.font_size);
```

在 XML 布局文件中引用：

```xml
<TextView
    android:layout_height="@dimen/textview_height"
    android:layout_width="@dimen/textview_width"
    android:textSize="@dimen/font_size"/>
```

其他资源使用请参考官方文档 [many other resource types to explore](http://developer.android.youdaxue.com/guide/topics/resources/more-resources.html#Color).

<br>
### 动态检索资源文件
***

有时候，你可能需要动态地去检索资源文件，而非通过资源 id ”硬编码”的方式去获取。例如，假设我只想通过 "submit_label" 这个字符串资源的键值（key）去检索这个字符串资源，可以通过在 Activity 中使用  `getIdentifier` 方法实现，示例如下：

```java
public String getStringValue(String key) {
    // 检索资源 id
    String packageName = getBaseContext().getPackageName();
    Resources resources = getBaseContext().getResources();
    int stringId = resources.getIdentifier(key, "string", packageName);
    if (stringId == 0) { return null; }

    // 通过字符串资源的键值（key）获取相应的字符串值
    return resources.getString(stringId);
}
```

现在，就可以使用上面的方法动态获取字符串资源：

```java
public String myKey = "submit_label";
public String myStringValue = getStringValue(myKey);
```

这种方式同样适用于其他类型的资源文件。例如，通过资源 id 动态地获取视图控件（View）:

```java
// getViewById("tvTest");
public View getViewById(String id) {
    // 检索资源 id
    String packageName = getBaseContext().getPackageName();
    Resources resources = getBaseContext().getResources();
    int viewId = resources.getIdentifier(id, "id", packageName);
    if (viewId == 0) { return null; }

    // 通过资源 id　获取视图控件
    return findViewById(viewId);
}
```

更多内容请参考官方文档 [getResources](http://developer.android.youdaxue.com/reference/android/content/res/Resources.html), <a href="http://developer.android.youdaxue.com/reference/android/content/res/Resources.html#getIdentifier\(java.lang.String, java.lang.String, java.lang.String\)">getIdentifier</a>.

<br>
## 可供选择的资源提供
***

<br>
### 响应式设计
***

一个杰出的的 UI 设计，最基本的条件是可以同时适配多种设备：

<img src="http://oem503hzx.bkt.clouddn.com/Android-Screen-Category.png" width="600" />

如上图所示，我们开发的 Apps 要运行在多种设备上，它们的系统版本、屏幕大小都不一样，考虑到这一点，Android 系统框架也为开发者提供了相应的方案。

<br>
###　了解可供选择的资源（resource）
***

Android 系统开发框架通过特定的限定符去决定选择哪种“可供选择的资源”（手机的屏幕大小、分辨率、系统语言、系统版本等），如下五种分类：

* 可供选择的布局文件，用来适配不同屏幕的大小（例如：手机、平板）
* 可供选择的字符串资源，用来适配不同国家的语言（例如：英语、中文）
* 可供选择的分辨率资源，用来适配不同屏幕的分辨率（例如：低、中、高、超过分辨率）
* 可供选择的样式资源，用来适配不同的系统版本（例如：Holo(Android 4.+)、Material(Android 5.+)）
* 可供选择的布局类型，用来适配不同屏幕的方向（例如：横屏、竖屏）

要实现以上的适配场景，需要在 `res` 目录下创建相应的（`[resource(资源类型)]-[qualifiers(限定符)]`）。例如，让图片设配多种屏幕的分辨率（相关文章 [multiple screen densities](http://guides.codepath.com/android/Working-with-the-ImageView#supporting-multiple-densities)）：

![Densities](http://oem503hzx.bkt.clouddn.com/Android-Screens-Densities.png)

如上图所示，要适配4种分辨率的屏幕，就要创建4种“可供选择的”资源：`res/drawable-ldpi`、`res/drawable-mdpi`、`res/drawable-hdpi`、`res/drawable-xhdpi`，这样一来，系统就会根据手机的屏幕分辨率自动去选择一种最合适的资源，示例如下：

```
res/
    drawable-ldpi/   
        icon.png
        background.png    
    drawable-mdpi/  
        icon.png
        background.png
    drawable-hdpi/  
        icon.png
        background.png
    drawable-xhdpi/  
        icon.png
        background.png
```

注意，不同文件夹下的文件名要保持一致。

<br>
### 理解限定符（qualifiers）
***

Android 开发框架提供了完整的限定符去适配各种场景，通过这些限定符我们可以去创建“可供选择的资源”。其中，常用的如下：

<table class="table table-bordered">
<thead>
<tr>
<th>类型</th>
<th>例子</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>Language（语言）</td>
<td>`en`、`zh`</td>
<td>设备的运行语言</td>
</tr>
<tr>
<td>Screen size（屏幕大小）</td>
<td>`sw480dp`、`sw600dp`</td>
<td>设备屏幕的最小高度和宽度</td>
</tr>
<tr>
<td>Screen orientation（屏幕方向）</td>
<td>`port`、`land`</td>
<td>设备屏幕是横屏还是竖屏</td>
</tr>
<tr>
<td>Screen density（屏幕分辨率）</td>
<td>`hdpi`、`xhdpi`</td>
<td>设备屏幕的分辨率，通常用来配置图片资源</td>
</tr>
<tr>
<td>Platform version（系统版本）</td>
<td>`v7`、`v11`、`v21`</td>
<td>设备的系统版本，通常用来配置样式资源</td>
</tr>
</tbody>
</table>

可以同时使用多个限定符来配置一个资源目录，例如，`drawable-zh-sw600dp-land` 表示设配中文横屏的平板。注意，当用这种方式配置“可供选择的资源”时，目录名称的顺序要按**上面表格列出的顺序**来设定，详细请查看官方文档 [完整的限定符列表](http://developer.android.youdaxue.com/guide/topics/resources/providing-resources.html#AlternativeResources).

<br>
### 创建“可供选择资源”（Android Studio）
***

在 Android Studio 的项目中，**鼠标右击资源文件夹（例如：`layout`）**，弹出的菜单中选择 `New => Layout resource file`，根据向导创建相应的“可供选择资源”：

<img src="http://oem503hzx.bkt.clouddn.com/Android-New-Layout-Resource-File-in-Android-Studio.gif" width="650" />

现在创建好了 **两种版本的布局文件**，一个是 **竖屏** 模式，一个时 **横屏** 模式。这样一来，手机屏幕发生改变时，Android 系统会**自动** 切换对应的布局文件，效果如下：

<img src="http://oem503hzx.bkt.clouddn.com/Android-Layout-Resource-Demo.gif" width="350" />

因此，只要准备好相应的 **“可供选择资源”**，Android 系统就会 **自动** 进行适配管理。

<br>
### 通过代码进行动态适配
***

我们可以在 App 运行时动态获取当前设备的配置信息（屏幕方向、屏幕大小等），Android 系统开发框架提供了 [Configuration](https://developer.android.youdaxue.com/reference/android/content/res/Configuration.html) 对象进行相关操作。例如，通过 Activity 或者 Context 对象使用 `getResources().getConfiguration()` 方法获取当前设备的屏幕方向，然后设置对应的图片资源，示例如下：

```java
String image;
int orientation = getResources().getConfiguration().orientation;
if (orientation == Configuration.ORIENTATION_PORTRAIT) {
   image = "image_portrait.png";
   // ...
} else if (orientation == Configuration.ORIENTATION_LANDSCAPE) {
   image = "image_landscape.png";
   // ...
}
```

<br>
### 适配屏幕大小的布局文件
***

适配屏幕大小的场景通常是在手机和平板的设备之间，Android 系统开发框架提供了一个“最小宽度”限定符 `sw`，通过它可以非常容易地配置各种屏幕大小的布局文件：

```
res/
    layout/   
        activity_main.xml
        item_photo.xml    
    layout-sw600dp/
        activity_main.xml
    layout-sw600dp-land/
        activity_main.xml
    layout-sw720dp/
        activity_main.xml
        item_photo.xml
    layout-land/
        activity_main.xml
        item_photo.xml
```

通常手机和平板的屏幕大小范围在 `sw240` 到 `sw480` 之间，7 寸平板为 `sw600`，10 寸平板为 `sw720`。如果是横屏模式，全部使用 `layout-land` 布局文件，如下图：

<img src="http://oem503hzx.bkt.clouddn.com/Android-Screens-Size.png" width="800" />

更多详细内容请参考官方文档 [resources](http://developer.android.youdaxue.com/guide/topics/resources/providing-resources.html)，或参考以下文章：

* [Flexible User Interfaces](http://guides.codepath.com/android/Flexible-User-Interfaces)
* [Article on UI design best practices](http://www.evoketechnologies.com/blog/effective-ui-design-tips-android-devices/)

<br>
### 布局最佳实践
***

以下为布局最佳实践的一些基本准则：

* 避免在应用程序代码中直接设定像素（pixel）值。
* 使用 `RelativeLayout` 替代 `AbsoluteLayout`，后者已被废弃，不要再使用。
* 使用 `wrap_content`, `match_parent`, 或者 `dp` 单位设定尺寸
* 使用“可供选择资源”方式实现响应式 UI 设计

官方相关指南 [best practices for screen independence](http://developer.android.youdaxue.com/guide/practices/screens_support.html#screen-independence).

<br>
### 资源别名
***

如果您想将某一资源用于多种设备配置（但是不想作为默认资源提供），则无需将同一资源放入多个备用资源目录中。 相反，您可以（在某些情况下）创建备用资源，充当保存在默认资源目录下的资源的别名。详细请参考官方文档 [创建一个别名资源](https://developer.android.youdaxue.com/guide/topics/resources/providing-resources.html#AliasResources).

<br>
### 资源最佳匹配
***

当你配置好所有”可供选择的资源“后，Android 系统会根据设备的配置状态自动匹配资源，详细请查看官方介绍 [official resource guide](http://developer.android.com/guide/topics/resources/providing-resources.html#BestMatch).

<br>
## 参考
***

* <http://developer.android.youdaxue.com/guide/topics/resources/string-resource.html>
* <http://developer.android.youdaxue.com/guide/topics/resources/accessing-resources.html>
* <http://mobile.tutsplus.com/tutorials/android/android-string/>
* <http://developer.android.youdaxue.com/guide/topics/resources/providing-resources.html>
* <http://developer.android.youdaxue.com/training/multiscreen/screendensities.html>
* <http://www.evoketechnologies.com/blog/effective-ui-design-tips-android-devices/>
* <http://www.androiddesignpatterns.com/2016/08/contextcompat-getcolor-getdrawable.html/>
