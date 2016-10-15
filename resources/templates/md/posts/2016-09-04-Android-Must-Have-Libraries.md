{:title "Android - 必须掌握的第三方类库（Libraries）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

现在是开源的世界，我们要充分利用好这些资源，不要去重复发明轮子。[Android](https://source.android.com/) 本身就是一个开源的手机操作系统，对应的第三方开发类库自然也非常多，而有些是开发者必须要掌握的，这样会使我们的开发变得更容易和健壮，下面就根据这些类库的使用场景和知名度进行简单分类。

<br>
### 标准
***

以下的 **“标准类库”** 是非常受欢迎的，也是市面上的应用程序使用得最多的：

<table class="table table-bordered">
<thead>
<tr>
<th>名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>[Retrofit](http://square.github.io/retrofit/)</td>
<td>出自 Square 公司的一个类型安全的 Java 和 Android 的 **REST 客户端** 库，这个库为网络认证、API 请求以及用 OkHttp 发送网络请求提供了强大的框架 。Retrofit 库使得从 web api 下载 JSON 或者 XML 数据变的非常简单直接，一旦数据下载完成即将其解析成普通 Java 类（POJO）</td>
</tr>
<tr>
<td>[Glide](https://github.com/bumptech/glide)</td>
<td>一款优秀的 **图片加载** 框架，它的优秀主要体现在效率高、强大并且使用方便，如果没有特别的要求（如更换网络构架、缓存验证机制等），直接引入就可以使用。</td>
</tr>
<tr>
<td>[ButterKnife](http://jakewharton.github.io/butterknife/)</td>
<td>出自 [Jake Wharton](https://github.com/JakeWharton) 之手，对 Android 开发者来说，这个名字是耳熟能详了。ButterKnife 是一个 Android 系统的 **View 注入框架**，能够通过注解的方式来绑定 View 的属性或方法。</td>
</tr>
<tr>
<td>[Parceler](http://parceler.org/)</td>
<td>通过注解及工具类自动完成实体类 **序列化** 及值传递。和传统的 Serialization 相比，Parceler 在进行序列化和反序列化时所需要的时间是传统序列化的十分之一。</td>
</tr>
<tr>
<td>[IcePick](https://github.com/frankiesardo/icepick)</td>
<td>通过 **注解** 使我们更加方便地保存和恢复 Android Instance 的状态。</td>
</tr>
<tr>
<td>[LeakCanary](https://github.com/square/leakcanary)</td>
<td>Android 和 Java **内存泄露** 检测。</td>
</tr>
<tr>
<td>[Espresso](https://google.github.io/android-testing-support-library/docs/espresso/)</td>
<td>Espresso 是一个新工具，相对于其他工具，API 更加精确。并且规模更小、更简洁并且容易学习。它最初是2013年 GTAC 大会上推出的，目标是让开发者写出更简洁的针对 APP 的 **UI 测试** 代码。</td>
</tr>
<tr>
<td>[Robolectric](http://robolectric.org/)</td>
<td>更加高效地编写 Android **单元测试** 代码。</td>
</tr>
</tbody>
</table>

<br>
### 高级
***

**高级类库** 对于初级项目可能不太适合，但对于那些开发能力强的 Android 开发团队就非常受用：

<table class="table table-bordered">
<thead>
<tr>
<th>名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>[Dagger 2](https://google.github.io/dagger/)</td>
<td>首个使用生成代码实现完整 **依赖注入** 的框架，极大减少了使用者的编码负担</td>
</tr>
<tr>
<td>[RxJava](https://github.com/ReactiveX/RxAndroid)</td>
<td>一个在 Java VM 上使用 **可观测** 的序列来组成 **异步** 的、**基于事件** 的程序的库。</td>
</tr>
<tr>
<td>[EventBus](https://github.com/greenrobot/EventBus)</td>
<td>EventBus 是一个 Android 事件发布/订阅框架，通过解耦发布者和订阅者简化 Android 事件传递，这里的事件可以理解为消息。</td>
</tr>
<tr>
<td>[AndroidAnnotations](http://androidannotations.org/)</td>
<td>AndroidAnnotations 是一个能够让你快速进行 Android 开发的开源框架，它能让你专注于真正重要的地方。</td>
</tr>
<tr>
<td>[Retrolambda](https://github.com/orfjackal/retrolambda)</td>
<td>让 Android 支持使用 `lambda` 表达式。</td>
</tr>
</tbody>
</table>

注意，上面的类库都是独立开发出来的，在项目中同时使用可能会出现一些问题，下面是一些已知的兼容问题。

<br>
#### Parceler 和 IcePick
***

不能使用 **IcePick** 来保存 **Parceler** 对象的状态，相关问题讨论在这里 [this Github issue](https://github.com/frankiesardo/icepick/pull/20)。

<br>
#### ButterKnife 和 Parceler
***

当同时使用 **Butterknife** 和 **Parceler** 时，会导致产生厂重复的 `javax.annotation.processing.Processor`，可以通过配置 `app/build.gradle` 文件排除这个冲突：

```gradle
   packagingOptions {
        exclude 'META-INF/services/javax.annotation.processing.Processor'  // butterknife
    }
```

<br>
#### ButterKnife 和 Custom View
***

当使用 `ButterKnife` 或者 `Dagger` 这类视图注入框架时，往往在 Android Studio 的布局预览窗口出现 `isEditMode()` 未定义的错误提示。本质原因是由于 `isEditMode()` 这个方法只有在程序运行时才会被执行，而在布局预览窗口是不会执行的。

```java
  public ContentEditorView(Context context, AttributeSet attrs) {
        super(context, attrs);

        LayoutInflater inflater = (LayoutInflater) context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        inflater.inflate(R.layout.view_custom, this, true);

        // short circuit here inside the layout editor
        if(isInEditMode()) {
            return;
        }

        ButterKnife.bind(this);
```

<br>
### 高效
***

* [Dagger](http://square.github.io/dagger/) - 快速实现 Android 和 Java 的依赖注入。官方视频介绍 [video　intro](http://www.infoq.com/presentations/Dagger).
* [Spork](https://sporklibrary.github.io) - 通过 **注解** 加速你的项目开发，减少冗余代码的编写，是你的代码更具可读性和维护性。
* [AutoParcel](https://github.com/frankiesardo/auto-parcel) - 不得不说，Java 的数据类型一致很单一，除了提供的九种基本数据类型，任何你想设计的数据类型都要通过创建类来完成。但 Google 新发布的 AutoValue 库似乎能改变这个困境，在最近的更新中，AutoValue 给该库增加了 **可拓展性**。
* [Hugo](https://github.com/JakeWharton/hugo) - 用于 **打印** 函数信息及执行时间的工具，仅在 debug 模式生效。
* [Logger](https://github.com/orhanobut/logger) - 简单、美观而且十分强大的 Android **日志** 工具。
* [LeakCanary](https://github.com/square/leakcanary) - Android 和 Java **内存泄露** 检测。
* [AndroidAnnotations](https://github.com/excilys/androidannotations) - 一个能够让你快速进行 Android 开发的开源框架，它能让你 **专注** 于真正重要的地方。
* [Calligraphy](https://github.com/chrisjenx/Calligraphy) - 在 Android 中更容易的使用 **字体**。
* [EasyFonts](https://github.com/vsvankhede/easyfonts) - 一个方便你在 App 里使用自定义 **字体** 的库。
* [AndroidViewAnimations](https://github.com/daimajia/AndroidViewAnimations) - 漂亮的视图 **动画**。
* [AboutLibraries](https://github.com/mikepenz/AboutLibraries) - 为你的 App 自动生成 **关于页面**。
* [SDK Manager Plugin](https://github.com/JakeWharton/sdk-manager-plugin) - 更遍历地管理你项目的 **Android SDK** 版本。
* [EasyDeviceInfo](https://github.com/nisrulz/easydeviceinfo) - 最简单的 **获取设备信息** 的工具。

<br>
### 扩展
***

* [RxJava](https://github.com/ReactiveX/RxJava) - 一个在 Java VM 上使用 **可观测** 的序列来组成 **异步** 的、**基于事件** 的程序的库。
* [EventBus](https://github.com/greenrobot/EventBus) - EventBus 是一个 Android 事件发布/订阅框架，通过解耦发布者和订阅者简化 Android **事件传递**，这里的事件可以理解为消息。
* [Tape](http://square.github.io/tape/) - 一组 **queue** 类。 square 出品。
* [Priority Job Queue](https://github.com/yigit/android-priority-jobqueue) - 更简单地实现 **后台任务**。
* [ACRA](http://acra.ch/) - 应用崩溃信息日志上报到 GoogleDoc 工具。

<br>
### 网络
***

* [Retrofit](http://square.github.io/retrofit/) - RESTFUL API 设计。
* [Picasso](http://square.github.io/picasso/) - square 开源的图片缓存。
* [Ion](https://github.com/koush/ion) - 支持图片、json、http post 等异步请求。
* [Android Async HTTP](http://loopj.com/android-async-http/) - Android 异步 Http 请求。
* [Volley](http://developer.android.com/training/volley/index.html) - Google 提供的网络通信库，使得网络请求更简单、更快速。
* [OkHttp](http://square.github.io/okhttp/) - square 开源的 http 工具类。
* [Glide](https://github.com/bumptech/glide) - Glide 是一个 android 平台上的快速和高效的开源的多媒体资源管理库,提供 多媒体文件的压缩,内存和磁盘缓存, 资源池的接口。
* [Android Universal Image Loader](https://github.com/nostra13/Android-Universal-Image-Loader) - 图片缓存，目前使用最广泛的图片缓存，支持主流图片缓存的绝大多数特性。
* [Fresco](http://frescolib.org/) - 一款强大的图片缓存工具，由 Facebook 开发。
* [Fast Android Networking](https://github.com/amitshekhariitbhu/Fast-Android-Networking) - 一个使用很简单的网络请求库，一个库就能处理所有类型的网络问题－下载，上传。

<br>
### ListView
***

* [EasyListViewAdapters](https://github.com/birajpatel/EasyListViewAdapters) - 提供 Easy Android ListView 适配器（EasyListAdapter 和 EasyCursorAdapter），该类库使得设计多列 ListView 变得非常简单，还为 ListView 提供多个有用的方法。
* [GridListViewAdapters](https://github.com/birajpatel/GridListViewAdapters) - GridListViewAdapters 用 listview 实现 gridview 效果。包括滑动到底部加载下一页数据的功能。
* [StickyListHeaders](https://github.com/emilsjolander/StickyListHeaders) - StickyListHeaders 是一个能在 ListView 的元素中添加分组标题（section header）的控件，在滚动过程中这些 section header 将停留在顶部，知道被下一个分组替代。该项目的目的是提供一个能有替代 ListView 的更高表现力的第三方 ListView。
* [PinnedListView](https://github.com/beworker/pinned-section-listview)
* [ListViewAnimations](https://github.com/nhaarman/ListViewAnimations) - 实现了 ListView 中各种动画效果的控件，包括滑动删除，拖动排序，添加元素动画等。
* [Cardslib](https://github.com/gabrielemariotti/cardslib) - 卡片式 View，支持单个卡片，item 为卡片的 ListView 和 GridView。
* [PullToRefresh-ListView](https://github.com/erikwt/PullToRefresh-ListView) - ListView 下拉刷新。
* [QuickReturn](https://github.com/lawloretienne/QuickReturn) - ListView/ScrollView 的 header 或 footer，当向下滚动时消失，向上滚动时出现。
* [Paginated Table](https://github.com/ojinxy/AndroidComponents)

<br>
### RecyclerView
***

* [UltimateRecyclerView](https://github.com/cymcsg/UltimateRecyclerView) - UltimateRecyclerView 是一个实现了滑动刷新，上拉加载，滑动删除，拖动排序，滚动显示与隐藏toolbar等效果的RecyclerView控件。
* [AdvRecyclerView](https://github.com/h6ah4i/android-advancedrecyclerview) - 扩展 RecyclerView 支持滑动删除，拖动排序。
* [android-parallax-recyclerview](https://github.com/kanytu/android-parallax-recyclerview) - recyclerview 实现的 List 头部 parallax（视差）效果。
* [sticky-headers-recyclerview](https://github.com/timehop/sticky-headers-recyclerview) - 一个使用 LinearLayoutManager 为 RecyclerViews 加上 section headers 效果的列表控件，支持横向和纵向。
* [FastAdapter](https://github.com/mikepenz/FastAdapter)
* [ItemAnimators](https://github.com/mikepenz/ItemAnimators) - 实现 RecyclerView 增/删/改/查的动画。
* [GreedoLayout](https://github.com/500px/greedo-layout-for-android) - 一个自定义的 RecyclerView layout manager ，可以将图片按照网格布局，并保持图片的长宽比。
* [RecyclerViewHelper](https://github.com/nisrulz/recyclerviewhelper) - RecyclerView 的工具类，更方便的实现 Adapter，item 点击事件，更快的实现加载提示，分页加载。

<br>
### 导航
***

* [JazzyViewPager](https://github.com/jfeinstein10/JazzyViewPager) - 支持 Fragment 切换动画的 ViewPager，动画包括转盘、淡入淡出、翻页、层叠、旋转、方块、翻转、放大缩小等，效果类似桌面左右切换的各种效果，不过桌面并非用 ViewPager 实现而已。
* [ParallaxPager](https://github.com/prolificinteractive/ParallaxPager) - ViewPager 在滑动 page 的时候页面中的子 View 会有一些动画效果，不同的元素可以从不同的方向消失或者是从不同的方向进入，形成视差错觉。
* [ParallaxHeaderViewPager](https://github.com/kmshack/Android-ParallaxHeaderViewPager) -  ViewPager + tab + 视差效果 + sticky 效果的 demo 。
* [ParallaxPagerTransformer](https://github.com/xgc1986/ParallaxPagerTransformer) - 使用 viewpager 的 PageTransformer 实现的视差效果，代码非常简单。
* [SlidingMenu](https://github.com/jfeinstein10/SlidingMenu) - 滑出式菜单，通过拖动屏幕边缘滑出菜单，支持屏幕左右划出，支持菜单 zoom、scale、slide up 三种动画样式出现。与 MenuDrawer 相比而言，SlidingMenu 支持菜单动画样式出现，MenuDrawer 支持菜单 view 处于内容的上下层。
* [Android Satellite Menu](https://github.com/siyamed/android-satellite-menu/) - 类似 Path 的左下角动画旋转菜单。
* [ArcMenu](https://github.com/daCapricorn/ArcMenu) - 支持类似 Path 的左下角动画旋转菜单及横向划出菜单、圆心弹出菜单。
* [AndroidSlidingUpPanel](https://github.com/umano/AndroidSlidingUpPanel) - 可拖动的 View，能在当前 Activity 上扶起一个可拖动的 Panel 。
* [DraggablePanel](https://github.com/pedrovgs/DraggablePanel) - 实现可以被拖动的面板。
* [MaterialDrawer](https://github.com/mikepenz/MaterialDrawer/) - Material Design 风格的导航抽屉，提供简便且强大的定制功能。

<br>
### UI 组件
***

* [SparkButton](https://github.com/varunest/SparkButton) - 仿 Twitter 喜欢动画的按钮，之前有相同效果的库。
* [Crouton](https://github.com/keyboardsurfer/Crouton) - 丰富样式的 Toast，允许 alert、comfirm、info 样式及点击消失样式，允许设置 Toast 显示时间，允许自定义 View。
* [BetterPickers](https://github.com/derekbrameyer/android-betterpickers) -提供日期、数字、时间（数字方式和钟表方式）、重复周期（闹钟的周期重复）、HMS（时、分、秒）的选择，支持以 DialogFragment 的弹窗选择。
* [android-shape-imageview](https://github.com/siyamed/android-shape-imageview) - 可以自定义各种形状的 ImageView, 并且支持边框。
* [RoundedImageView](https://github.com/vinc3m1/RoundedImageView) - 带圆角的 ImageView 。
* [Android StackBlur](https://github.com/kikoso/android-stackblur) - 图片模糊效果工具类。
* [Android Bootstrap](https://github.com/Bearded-Hen/Android-Bootstrap) - Bootstrap 风格 UI 组件。
* [PhotoView](https://github.com/chrisbanes/PhotoView) - 支持双指/双击缩放的 ImageView，支持从一个 PhotoView 缩放到另外一个 PhotoView（点击图片放大预览），相对于其他 PhototView 有更加平滑的缩放，平移的动画，并且支持所有的 ScaleType，可以作为普通的 ImageView 使用。
* [ShowcaseView](https://github.com/amlcurran/ShowcaseView) - 用于高亮显示应用程序的特定部分，从而突出突出重点。
* [FadingActionBar](https://github.com/ManuelPeinado/FadingActionBar) - ListView 向下滚动逐渐显现的 ActionBar 。
* [AndroidViewAnimations](https://github.com/daimajia/AndroidViewAnimations) - Android 动画精简库。
* [ProgressWheel](https://github.com/Todd-Davies/ProgressWheel) - 支持进度显示的圆形 ProgressBar　。
* [SmoothProgressBar](https://github.com/castorflex/SmoothProgressBar) - 水平进度条。
* [CircularFillableLoaders](https://github.com/lopspower/CircularFillableLoaders) - 非常漂亮的加载动画。
* [Rebound](http://facebook.github.io/rebound/) - 一个模仿弹簧反弹的 Java 库，可用于创建动画。
* [AndroidImageSlider](https://github.com/daimajia/AndroidImageSlider) - Android 图片滑动。
* [FloatingActionButton](https://github.com/makovkastar/FloatingActionButton) - 一个类似 Android 版 Google+浮动功能按钮的控件，可以响应 ListView 的滚动事件。当列表向上滚动的时候会自动显示，向下滚动的时候自动隐藏。
* [Foursquare-CollectionPicker](https://github.com/anton46/Foursquare-CollectionPicker) - 类似 Foursquare Tastes 的选择器。
* [NexusDialog](https://github.com/dkharrat/NexusDialog)
* [dialogplus](https://github.com/orhanobut/dialogplus) - 一个简单的 Android 对话框，支持不同的弹出模式。
* [Iconify](https://github.com/JoanZapata/android-iconify) - 提供带 Icon 的 TextView,Menu,Button 等。
* [Android StepsView](https://github.com/anton46/Android-StepsView) - 显示步骤执行情况的控件，在某些情况下，还是非常有用的。
* [PhotoView](https://github.com/chrisbanes/PhotoView) - 支持双击或双指缩放的 ImageView，在 ViewPager 等 Scrolling view 中正常使用，相比上面的 AndroidTouchGallery，不仅支持 ViewPager，同时支持单个 ImageView 。
* [Android-Iconics](https://github.com/mikepenz/Android-Iconics) - 各种风格的图标。
* [Scissors](https://github.com/lyft/scissors) - 图片剪裁工具。
* [Material-SearchView](https://github.com/MiguelCatalan/MaterialSearchView) - 一个基于 Material design 规范的 Android 搜索控件。
* [PersistentSearchBar](https://github.com/arimorty/floatingsearchview) - 又一个 Android 搜索控件。
* [Android Material Intro Screen](https://github.com/TangoAgency/material-intro-screen/) - 又一个漂亮的引导页效果。

<br>
### 绘图
***

* [MPAndroidChart](https://github.com/PhilJay/MPAndroidChart) - 强大的图表绘制工具，支持折线图、面积图、散点图、时间图、柱状图、条图、饼图、气泡图、圆环图、范围（高至低）条形图、网状图等；支持图的拖拽缩放；支持 Android 2.2 以上，支持横纵轴缩放，多指缩放，展现动画、高亮、保存到 sdcard、从文件读取图表。
* [HoloGraphLibrary](https://github.com/Androguide/HoloGraphLibrary)
* [EazeGraph](https://github.com/blackfizz/EazeGraph) - Android 图表库，支持柱状图、分层柱状图、饼状图、线性图。
* [AndroidCharts](https://github.com/dacer/AndroidCharts)
* [AndroidGraphView](http://android-graphview.org/) - 一个灵活，美观的 Android 图表库，支持折线图和条形图图表样式。
* [AndroidPlot](http://androidplot.com/docs/quickstart/) - 用于统计数据以图表的形式展现。
* [WilliamChart](https://github.com/diogobernardino/WilliamChart) - 绘制图表的库，支持 LineChartView、BarChartView 和 StackBarChartView 三中图表类型，并且支持 Android 2.2 及以上的系统。
* [HelloCharts](https://github.com/lecho/hellocharts-android) - 支持折线图、柱状图、饼图、气泡图、组合图；支持预览、放大缩小，滚动，部分图表支持动画；支持 Android 2.2 以上。
* [Leonids](https://github.com/plattysoft/Leonids) - 一个非常轻量的粒子效果系统库，只有 81kb。可以用于游戏中的爆炸，火，烟等效果中，也可以用在普通应用中，增强 app 的可玩性。其实所有的游戏引擎都支持粒子效果，但是在标准的安卓 UI 中没有这个东西。也就是说如果你像创建一个具有粒子效果的 app，你必须包含一个游戏引擎－高射炮打苍蝇，或者自己写一个。Leonids 正好填补了这一空白。
* [Confetti](https://github.com/jinatonic/confetti) - 高度自定义的粒子喷发效果。
* [AChartEngine](http://jaxenter.com/effort-free-graphs-on-android-with-achartengine-46199.html) - 强大的图表绘制工具，支持折线图、面积图、散点图、时间图、柱状图、条图、饼图、气泡图、圆环图、范围（高至低）条形图、拨号图/表、立方线图及各种图的结合。

<br>
### 图片处理
***

* [AndroidPhotoFilters](https://github.com/zomato/androidphotofilters) - PhotoFiltersSDK 提供快速，强大，灵活的图片处理工具，处理逻辑在 NDK 中进行。支持 API 15 及以上。
* [android-gpuimage](https://github.com/CyberAgent/android-gpuimage) - 基于 GPU 的图片滤镜。
* [android-image-filter](https://github.com/ragnraok/android-image-filter)
* [picasso-transformations](https://github.com/wasabeef/picasso-transformations) - 使用 Picasso 处理图片。
* [glide-transformations](https://github.com/wasabeef/glide-transformations) - 使用 Glide 处理图片。
* [ImageEffectFilter](https://github.com/mnafian/ImageEffectFilter) - 基本图片处理。
* [VidEffects](https://github.com/krazykira/VidEffects) - 实现视频特效。

<br>
### 二维码
***

* [ZXing](https://github.com/zxing/zxing) - 二维码扫描工具。
* [ZXing Android Embedded](https://github.com/journeyapps/zxing-android-embedded) - 另外一款二维码扫描工具。
* [barcodescanner](https://github.com/dm77/barcodescanner) - 实现二维码与条形码的扫描，基于 zxing 和 zbar。
* [CamView](https://github.com/LivotovLabs/CamView)
* [android-quick-response-code](https://code.google.com/p/android-quick-response-code/)

<br>
### 持久化
***

* [ActiveAndroid](https://github.com/pardom/ActiveAndroid)
* [[DBFlow](https://github.com/Raizlabs/DBFlow) - Android SQLite ORM 工具库。综合了 Active Android, Schematic, Ollie,Sprinkles 等库的优点，通过注解实现，性能好，能生成 ContentProvider。
* [greenDAO](https://github.com/greenrobot/greenDAO)
* [SugarORM](http://satyan.github.io/sugar/)
* [RxCache](https://github.com/VictorAlbertos/RxCache) - 响应式 Android 缓存框架。
* [ORMLite](http://ormlite.com/sqlite_java_android_orm.shtml)
* [SQLBrite](https://github.com/square/sqlbrite) - Android 开源第一人 Jake Wharton 又出手了，这次带来的是 SQLBrite.简单说，这是一个工具库，期望更优雅的从 SQL 数据库中提取数据，但它的关注点不在于 ORM，也不是 SQL Builder，而是如何在数据变化时更简便的获取到通知。当你不想给用ContentProvider，只想简单监听SQLite表增删改的数据变更时可以试试它。
* [Cupboard](https://bitbucket.org/littlerobots/cupboard) -　流行的 SQL 封装类库。
* [StorIO](https://github.com/pushtorefresh/storio) - 轻量级 SQL 封装类库。
* [Realm](https://github.com/realm/realm-java)
* [NexusData](https://github.com/dkharrat/NexusData)
* [Hawk](https://github.com/orhanobut/hawk) - 安全简单的键值对数据存储库。使用 AES 来加密私密数据，SharedPreferences 来存储。可以存储任意类型的数据或者数据集合 (List)。
* [Poetry](https://github.com/elastique/poetry) - 直接将 JSON 数据持久化到 SQLite 数据库中。
* [JDXA](http://softwaretree.com/v1/products/jdxa/jdxa.html) - 简洁和高效的 Android ORM 框架。

<br>
### 绑定
***

* [RecyclerViewBinding](https://github.com/radzio/android-data-binding-recyclerview) - 简单实现　recycler view 的数据绑定。
* [CommandDataBinding](https://github.com/radzio/android-data-binding-command) - 优雅处理 `OnClick` 事件。

<br>
### 兼容
***

* [NineOldAndroids](http://nineoldandroids.com/) - 将 Android 3.0(Honeycomb)所有动画 API(ObjectAnimator ValueAnimator 等)兼容到 Android1.0。
* [HoloEverywhere](https://github.com/Prototik/HoloEverywhere) - 将 Android 4.2 的 Holo 主题兼容到 2.1+。
* [CropImage](https://github.com/biokys/cropimage) - 简单实现图片剪裁的兼容。

<br>
### 滚动和视差
***

* [QuickReturn](https://github.com/lawloretienne/QuickReturn) - ListView/ScrollView 的 header 或 footer，当向下滚动时消失，向上滚动时出现。
* [ParallaxPagerTransformer](https://github.com/xgc1986/ParallaxPagerTransformer) - 使用 viewpager 的 PageTransformer 实现的视差效果，代码非常简单。
* [ParallaxHeaderViewPager](https://github.com/kmshack/Android-ParallaxHeaderViewPager) - ViewPager + tab + 视差效果 + sticky 效果的 demo。
* [Android-ObservableScrollView](https://github.com/ksoichiro/Android-ObservableScrollView) - 听滚动视图滚动事件的库，帮助与 Toolbar 的交互动效处理与 Material Design 的实现。
* [Scrollable](https://github.com/noties/Scrollable) - 一个帮你实现选项卡 **切换+下拉** 显示头部等效果的布局。
* [ParallaxPager](https://github.com/prolificinteractive/ParallaxPager) - ViewPager 在滑动 page 的时候页面中的子 View 会有一些动画效果，不同的元素可以从不同的方向消失或者是从不同的方向进入，形成视差错觉。
* [android-parallax-recyclerview](https://github.com/kanytu/android-parallax-recyclerview) - recyclerview 实现的 List 头部 parallax（视差）效果。

<br>
### 调试
***

* [Stetho](http://facebook.github.io/stetho/) - Facebook 出品的一个强大的 Android **调试工具**，使用该工具你可以在 Chrome Developer Tools 查看 App 的布局，网络请求（仅限使用 Volley, okhttp 的网络请求库），sqlite, preference, 一切都是可视化的操作，无须自己在去使用 adb, 也不需要 root 你的设备。
* [Bugfender](https://github.com/bugfender/bugfender-android-sample/) - 使用它可以存储 App 的运行日志和用户的操作记录，方便后期分析 App 的存在问题。

<br>
## 资源
***

通过以下网站发现更多第三方类库：

* <http://android-arsenal.com>
* [Wasabeef Core Libraries](https://github.com/wasabeef/awesome-android-libraries)
* [Wasabeef UI Libraries](https://github.com/wasabeef/awesome-android-ui)
* [Snowdream Android Library Repository](https://snowdream.github.io/awesome-android/)
* [Android-Libs.com](http://android-libs.com)
* <http://androidlibs.org/>
* <http://appdevwiki.com/wiki/show/HomePage>
* <http://www.libtastic.com>

<br>
## 参考
***

* <http://www.vogella.com/tutorials/AndroidUsefulLibraries/article.html>
* <http://actionbarsherlock.com/>
* <http://nineoldandroids.com/>
* <https://github.com/roboguice/roboguice/wiki>
* <https://github.com/excilys/androidannotations/wiki>
* <https://github.com/erikwt/PullToRefresh-ListView>
* <https://github.com/jfeinstein10/SlidingMenu>
* <http://square.github.io/picasso/>
