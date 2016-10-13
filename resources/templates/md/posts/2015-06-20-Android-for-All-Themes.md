{:title "Android - 术语剖析 - Themes（主题）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**视图** 是屏幕上的矩形区域。例如，**TextView** 显示文本，**ImageView** 显示图像。
<br>
<br>
当 TextView 未指定文本颜色或背景颜色时，将使用默认设置，如透明背景加灰色文本。这是因为 TextView 应用了默认属性集，我们称之为 **样式**。
<br>
<br>
可以轻松为各 TextView 应用不同的样式。但通常我们希望应用中的所有 TextView 以及按钮等其他视图都使用相同的样式。这可以通过 **主题** 来实现，主题是可以自动应用到多种视图的样式。一个主题可以应用到活动对象创建的所有视图，甚至应用中的所有视图。
<br>
<br>
当然，并非每个属性都适用于所有视图。例如，TextView 和 Button 具有某种字体，但 ImageView 则不具有。主题指定的各个默认属性仅会应用到适用的视图。
<br>
<br>
Android 提供若干个已设置好的主题。例如，**Theme.Material** 主题为大多数视图（如 TextView 的文本）的 **内容** 赋予亮色。而使大多数视图的背景呈暗色，可能是因为背景实际为暗色，也可能是因为背景
是透明的而背景后面的视图是暗色的。整体结果将使应用的 **内容区域** 主要呈暗色。
<br>
<br>
而 **Theme.Material.Light** 主题恰好相反：使内容为暗色，而内容区域为亮色。
<br>
<br>
**Theme.Material.Light.DarkActionBar** 主题与 **Theme.Material.Light** 主题一样，只不过其应用栏（最近更名为操作栏）使用的是亮色内容和暗色背景。

<br>
## 代码示例
***

```
<!-- In the file styles.xml, create a theme named MyTheme. It will be the same as the existing theme Theme.AppCompat.Light.DarkActionBar, except that its textColor will be green. -->
<resources>
    <style name="MyTheme"
        parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="android:textColor">#00FF00</item>
    </style>
</resources>

<!-- In the file AndroidManifest.xml, apply the theme to all the Views created by the app. -->
<application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:theme="@style/MyTheme"/>

<!-- In the file activity_main.xml, the MyTheme is automatically applied to the TextView. -->
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Hello"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Themes.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
