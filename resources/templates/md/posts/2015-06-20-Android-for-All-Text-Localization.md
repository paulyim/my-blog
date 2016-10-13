{:title "Android - 术语剖析 - Text Localization（文本本地化）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

若用户转到设置应用,将设备语言更改为“西班牙语”,此时应用会察觉到此[配置更改](http://developer.android.youdaxue.com/guide/topics/resources/runtime-changes.html)并做出相应响应。针对 **更改区域设置** 准备相应的应用,称为 **本地化**。接下来我们对语言和地区为 "Español（Estados Unidos）"的应用进行本地化,例如“西班牙语（美国）”。
<br>
<br>
文本片段称为 **字符串**。应用在屏幕上显示的所有字符串均应收集到名为 strings.xml 的[资源文件](http://developer.android.youdaxue.com/guide/topics/resources/overview.html)中。此文件已经是应用的一部分,位于文件夹 app/res/values 中。在 Android Studio 左侧面板中可以看到该文件夹和文件,这个面板称为[项目视图](https://developer.android.youdaxue.com/sdk/installing/create-project.html#ProjectView)。
<br>
<br>
接下来我们将新建名为 app/res/values-es-rUS 的文件夹,在该文件夹中新建名为 strings.xml 的文件。新文件称为[备选资源](http://developer.android.com/guide/topics/resources/providing-resources.html#AlternativeResources),其中包含原始 strings.xml 文件中字符串的西班牙语译文。
<br>
<br>
在项目视图中,选择文件夹 app/res。从菜单栏中,下拉：文件 (File) → 新建 (New) → Android 资源目录 (resource directory) 填写随即出现的新建资源目录 (New Resource Directory) 表单。
<br>
<br>
目录名称 (Directory name): values
<br>
<br>
资源类型 (Resource type): values
<br>
<br>
源集 (Source set): main
<br>
<br>
在“可用限定符（Available qualifiers）”下,选择区域设置（Locale）然后按下 >> 按钮。在语言（Language）下,选择 "es:Spanish"。在仅具体地区（Specific Region Only）下,选择 "US:　United States"。
<br>
<br>
可以观察到表单顶部的目录名称已更改为 values-es-rUS。按下确定（OK）按钮。
<br>
<br>
返回项目视图,选择文件夹 app/res/values。从菜单栏中,下拉
<br>
<br>
文件 (File) → 新建 (New) → Values 资源文件 (Values resource file)
<br>
<br>
填写随即出现的新建资源文件 (New Resource File) 表单。
<br>
<br>
文件名 (File name): strings
<br>
<br>
源集 (Source set): main
<br>
<br>
目录名称 (Directory name): values
<br>
<br>
在“可用限定符 (Available qualifiers)”下,选择区域设置 (Locale) 然后按下 >> 按钮。在语言 (Language) 下,选择 "es:Spanish"。在仅具体地区 (Specific Region Only) 下,选择 "US:United States"。可以观察到目录名称已更改为 values-es-rUS。按下确定 (OK) 按钮。
<br>
<br>
在 Android Studio 的中央面板中,单击新标签 es-rUS/strings.xml。编辑新文件 strings.xml,使文件中的每条[字符串资源](http://developer.android.youdaxue.com/guide/topics/resources/string-resource.html)均变成原始 strings.xml 文件中相应资源的译文。例如,如果原始 strings.xml 包含资源
<br>
<br>
```
<string name="hello_world">Hello world!</string>
```
则新文件 strings.xml 应包含
<br>
<br>
```
<string name="hello_world">¡Hola mundo!</string>
```
<br>
<br>
现在,应用将根据用户在设置应用中的语言首选项,选择从 res/values/strings.xml 或 res/values-es-rUS/strings.xml 中获取字符串。当然,这只是本地化的第一步。我们还应该对数字、日期、时间等显示格式进行本地化。而且从右到左的语言首选右对齐。

<br>
## 代码示例
***

```
<!-- This is the original strings.xml in the folder app/res/values. -->
<resources>
    <string name="app_name">Localization</string>
    <string name="hello_world">Hello world!</string>
    <string name="action_settings">Settings</string>
</resources>

<!-- This is the new strings.xml in the folder app/res/values-es-rUS. -->
<resources>
<?xml version="1.0" encoding="utf-8"?>
    <string name="app_name">Localización</string>
    <string name="hello_world">¡Hola mundo!</string>
    <string name="action_settings">Configuración</string>
</resources>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Text-Localization.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
