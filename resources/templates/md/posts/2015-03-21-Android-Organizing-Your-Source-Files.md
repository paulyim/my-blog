{:title "Android - 组织源文件"
 :layout :post
 :tags  ["android"]
 :toc true}

 <br>
 ***
 <br>

## 概述
***

Android 应用程序开发中应该保持简洁和业界标准的目录结构，这样代码阅读性高，也便于后期代码的重构与维护。

<br>
### 命名规范
***

参考这篇文章 [Ribot Code and Style Guidelines](https://github.com/ribot/android-guidelines/blob/master/project_and_code_guidelines.md)。

<br>
#### Java 代码
***

下面为 Java 代码规范的四大标准：

<table class="table table-bordered">
<thead>
<tr>
<th>类型</th>
<th>例子</th>
<th>描述</th>
<th>链接</th>
</tr>
</thead>
<tbody>
<tr>
<td>变量</td>
<td>`incomeTaxRate`</td>
<td>变量命名应该遵守骆驼命名法</td>
<td>[详情](https://www.cwu.edu/~gellenbe/javastyle/variable.html)</td>
</tr>
<tr>
<td>常量</td>
<td>`DAYS_IN_WEEK`</td>
<td>常量命名所有字母应该大写</td>
<td>[详情](https://www.cwu.edu/~gellenbe/javastyle/constant.html)</td>
</tr>
<tr>
<td>方法</td>
<td>`convertToEuroDollars`</td>
<td>方法命名应该遵守骆驼命名法</td>
<td>[详情](https://www.cwu.edu/~gellenbe/javastyle/method.html)</td>
</tr>
<tr>
<td>参数</td>
<td>`depositAmount`</td>
<td>参数命名应该遵守骆驼命名法</td>
<td>[详情](https://www.cwu.edu/~gellenbe/javastyle/parameter.html)</td>
</tr>
</tbody>
</table>

或者参考 [这个命名指南](https://www.cwu.edu/~gellenbe/javastyle/naming.html)。

<br>
#### Android 类定义规范
***

为了提高代码的阅读和理解性，开发中应该根据相应的模块定义命名，如下示例：

<table class="table table-bordered">
<thead>
<tr>
<th>模块</th>
<th>例子</th>
<th>继承</th>
</tr>
</thead>
<tbody>
<tr>
<td>Activity</td>
<td>`CreateTodoItemActivity`</td>
<td>`AppCompatActivity`, `Activity`</td>
</tr>
<tr>
<td>List Adapter</td>
<td>`TodoItemsAdapter`</td>
<td>`BaseAdapter`, `ArrayAdapter`</td>
</tr>
<tr>
<td>Database Helper</td>
<td>`TodoItemsDbHelper`</td>
<td>`SQLiteOpenHelper`</td>
</tr>
<tr>
<td>Network Client</td>
<td>`TodoItemsClient`</td>
<td>N/A</td>
</tr>
<tr>
<td>Service</td>
<td>`FetchTodoItemService`</td>
<td>`Fragment`</td>
</tr>
<tr>
<td>Fragment</td>
<td>`TodoItemDetailFragment`</td>
<td>`Service`, `IntentService`</td>
</tr>
</tbody>
</table>

以上是比较常见的模块分类，它们的共同点都是以相应模块的名称作为后缀，其他的以此类推。

<br>
### Android 包定义规范
***

定义包结构有很多方式，下面为开发中常见的定义方式：

<br>
#### 根据 Android 系统模块分类组织包结构
***

[这篇文章](http://blog.smartlogic.io/2013/07/09/organizing-your-android-development-code-structure) 详细介绍了以这种方式去定义包结构：

* `com.example.myapp.activities` - 存放 activities（界面视图）
* `com.example.myapp.adapters` - 存放数据适配器
* `com.example.myapp.models`   - 存放数据模型类
* `com.example.myapp.network` - 存放网络相关
* `com.example.myapp.fragments` - 存放 fragments（另外一种界面视图）
* `com.example.myapp.utils` - 存放帮助类
* `com.example.myapp.interfaces` - 存放接口

以这种方式去组织包结构可以非常清晰地去维护应用程序的代码，更多相关内容 [Android 开发最佳实践](https://github.com/futurice/android-best-practices#java-packages-architecture).

<br>
#### 根据应用程序的内容模块组织包结构
***

相关文章：

* [reflect the feature set](http://www.javapractices.com/topic/TopicAction.do?Id=205)
* [as outlined in this post](https://medium.com/@cesarmcferreira/package-by-features-not-layers-2d076df1964d#.f7znkie19)

示例：

* `com.example.myapp.service.*` - 后台服务相关的 packages/classes
* `com.example.myapp.ui.*` - 应用程序界面相关的 packages/classes
* `com.example.myapp.ui.mainscreen` - 应用程序的主界面相关 packages/classes
* `com.example.myapp.ui.detailsscreen` - 应用程序的详情界面相关 packages/classes

以这种方式组织组织包结构会将 `DetailsActivity`, `DetailsFragment`, `DetailsListAdapter`, `DetailsItemModel` 放在同一个包里面，如果你的应用程序以内容详情为主，这种方式就会非常方便。

<br>
## 组织资源文件
***

以下为标准的资源文件和目录组织分类：

<table class="table table-bordered">
<thead>
<tr>
<th>模块</th>
<th>目录</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>XML Layouts（界面布局文件）</td>
<td>`res/layout/`</td>
<td>应用程序界面的布局文件</td>
</tr>
<tr>
<td>XML Menus（菜单布局文件）</td>
<td>`res/menu/`</td>
<td>应用程序导航栏菜单</td>
</tr>
<tr>
<td>Drawables</td>
<td>`res/drawable`</td>
<td>存放各种分辨率的图片或者 XML drawables（一般为视图控件的动画定义）</td>
</tr>
<tr>
<td>Colors</td>
<td>`res/values/colors.xml`</td>
<td>[尺寸定义](http://developer.android.youdaxue.com/guide/topics/resources/more-resources.html#Dimension)</td>
</tr>
<tr>
<td>Dimensions</td>
<td>`res/values/dimens.xml`</td>
<td>`Fragment`</td>
</tr>
<tr>
<td>Strings</td>
<td>`res/values/strings.xml`</td>
<td>应用程序所有的字符串资源统一在这个文件中定义</td>
</tr>
<tr>
<td>Styles</td>
<td>`res/values/styles.xml`</td>
<td>应用程序所有的样式主题统一在这个文件中定义</td>
</tr>
</tbody>
</table>

详细请参考 [官方完整的资源列表](http://developer.android.youdaxue.com/guide/topics/resources/providing-resources.html#ResourceTypes)：

* **不要在布局文件中直接定义颜色编码**. 而应该将 [所有颜色](http://developer.android.youdaxue.com/guide/topics/resources/more-resources.html#Color) 统一定义到 `res/values/colors.xml` 文件中，然后通过 `@color/royal_blue` 方式引用。

* **不要在布局文件中直接定义内边距或者外边距**. 而应该将 [所有尺寸](http://developer.android.youdaxue.com/guide/topics/resources/more-resources.html#Dimension) 统一定义到 `res/values/dimens.xml` 文件中，然后通过 `@dimen/item_padding_left` 方式引用。

* 为了支持多种设备，应该以这种方式 [资源替换](http://guides.codepath.com/android/Understanding-App-Resources#providing-alternate-resources) 提供不同的颜色（colors）, 字符串（strings）, 尺寸（dimens）, 样式（styles）, 等各种的设备类型，屏幕大小，系统版本。

记住，请一开始就应该遵从良好的规范去开发 Android 应用程序，这是另外一篇相关的文章 [Ribot Code and Style Guidelines](https://github.com/ribot/android-guidelines/blob/master/project_and_code_guidelines.md).

<br>
## 结论
***

综合以上的业界标准，你应该从中找出或设计出最适合自己项目的组织方式。

最后，这是另外一篇关于 Java 编程的包结构组织讨论 [makes a lot of sense](http://www.javapractices.com/topic/TopicAction.do?Id=205).

<br>
## 参考
***

* <http://blog.smartlogic.io/2013/07/09/organizing-your-android-development-code-structure>
* <http://stackoverflow.com/questions/5525872/android-project-package-structure>
* <http://www.javapractices.com/topic/TopicAction.do?Id=205>
