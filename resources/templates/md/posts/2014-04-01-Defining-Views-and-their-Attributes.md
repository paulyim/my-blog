{:title "Android - 视图"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

在 Android 开发中定义 Views（视图）是家常便饭的事情，通常这些 Views（视图）会被定义在 layout（布局文件）中，一个 view（视图）也包含了很多属性。

<br>
### 基本视图 （Views）
***

如下为六个基本视图组件:

* **TextView** 显示文本
* **ImageView** 显示图片
* **Button** 按钮
* **ImageButton** 可点击的图片按钮
* **EditText** 输入框
* **ListView** 可滚动的列表（列表中可以包含其他视图组件）

<br>
### 视图标识符
***

如下为视图控件定义一个唯一的 id 属性，供其他视图控件调用：

```xml
<Button android:id="@+id/my_button" />
```

在 Java 代码中调用：

```java
Button myButton = (Button) findViewById(R.id.my_button);
```

注意，如果配置了 id 属性的视图组件，当设备的配置改变（如：屏幕改变），那么系统会自动获取当前视图的状态信息。

<br>
### 视图组件的高度 （height）和宽度 （width）
***

Android 中的视图组件必须设置 height（高度） 和 width（宽度）：

```xml
<TextView
  android:layout_width="165dp"
  android:layout_height="wrap_content" />
```

`wrap_content`（高度或宽度包裹内容），`match_parent`（高度或宽度填充父组件），或设置固定的数值，比如 `120dp`，如果是设置数值方式，在代码中可以动态修改，示例如下：

```java
// 改变视图的高度和宽度
int newInPixels = 50;
view.setLayoutParams(new LayoutParams(newInPixels, newInPixels));
view.requestLayout();
```

或单独地修改宽度和高度：

```java
int newDimensionInPixels = 50;
view.getLayoutParams().width = newDimensionInPixels;
view.getLayoutParams().height = newDimensionInPixels;
view.requestLayout();
```

使用 `dp` 单位而非 `pixels` :

```java
int newDimensionInPixels = 50;
// 转换为 50dp
int dimensionInDp = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, newDimensionInPixels,
    getResources().getDisplayMetrics());
view.getLayoutParams().width = newDimensionInPixels;
view.getLayoutParams().height = dimensionInDp;
view.requestLayout();
```

<br>
### 视图组件的外边距 （Margin） 和内边距 （Padding）
***

视图的外边距和内边距用来调整视图之间的位置和距离。

* **Layout Margin** 定义视图之间的外边距
* **Padding** 定义视图组件的内边距

示例：

```xml
<LinearLayout>
   <TextView android:layout_margin="5dp" android:padding="5dp">
   <Button layout_marginBottom="5dp">
</LinearLayout>
```

<br>
### 视图组件的对齐方式 （Gravity）
***

Gravity 用来指定视图控件内容的对齐方式。

* **gravity** 指定视图组件内容的对齐方式 （可以理解为 CSS 中的 text-align 属性）
* **layout_gravity** 指定视图组件相对于父组件的对齐方式 （可以理解为 CSS 中的 float 属性）

示例：

```xml
<TextView
  android:gravity="left"
  android:layout_gravity="right"
  android:layout_width="165dp" android:layout_height="wrap_content"
  android:textSize="12sp" android:text="@string/hello_world" />
```

<br>
### 其他属性
***

每种视图组件都有很多不同的属性定义，其中也有很多是相同的，如：

* `android:layout_width`
* `android:textColor`

基本视图组件的共同属性：

<table class="table table-bordered">
<thead>
<tr>
<th>属性</th>
<th>描述</th>
<th>示例值</th>
</tr>
</thead>
<tbody>
<tr>
<td>`android:background`</td>
<td>视图组件的背景</td>
<td>`#ffffff`</td>
</tr>

<tr>
<td>`android:onClick`</td>
<td>视图组件被点击的回调函数</td>
<td>`onButtonClicked`</td>
</tr>

<tr>
<td>`android:visibility`</td>
<td>视图的可见性</td>
<td>`invisible`</td>
</tr>

<tr>
<td>`android:hint`</td>
<td>占位符（输入提示）</td>
<td>`@string/hint`</td>
</tr>

<tr>
<td>`android:text`</td>
<td>视图组件的显示文本</td>
<td>`@string/foo`</td>
</tr>

<tr>
<td>`android:textColor`</td>
<td>文本颜色</td>
<td>`#000000`</td>
</tr>

<tr>
<td>`android:textSize`</td>
<td>文本的字体大小</td>
<td>`21sp`</td>
</tr>

<tr>
<td>`android:textStyle`</td>
<td>字体风格</td>
<td>`bold`</td>
</tr>
</tbody>
</table>

更多详细内容请参考官方文档 [View docs](http://developer.android.youdaxue.com/reference/android/view/View.html) 和 [TextView docs](http://developer.android.youdaxue.com/reference/android/widget/TextView.html)（国内访问请自备梯子）， 如下为一个基本示例：

```xml
<TextView
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   android:text="@string/hello_world"
   android:background="#000"
   android:textColor="#fff"
   android:layout_centerHorizontal="true"
/>
```

## 参考
***

* <http://developer.android.youdaxue.com/reference/android/view/View.html>
* <http://developer.android.youdaxue.com/reference/android/widget/TextView.html>
* <http://mobile.tutsplus.com/tutorials/android/android-sdk-user-interface-design/>
