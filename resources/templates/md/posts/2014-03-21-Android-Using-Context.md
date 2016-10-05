{:title "Android-Context的使用场景"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

Android 开发中的 Context（中文通常翻译为“上下文”），是用来访问应用程序的状态信息的。通过它，Activities, Fragments, Services 可以访问应用程序的资源文件、图片、[themes/styles](2014-03-23-themes-styles.html)（android 开发应用程序中定义的主题和样式）和一些自定义的目录文件等。同时，通过 Context, 可以访问　Android 自带的一些服务，用于布局填充、键盘和查找内容提供者。

大多数情况下，当需要　context 时，仅仅需要传递当期活动（activity）的实例作为　context。比如，在对象的内部创建　adapters 或者 fragments, 在这种长期我们就可以传递当前的　activity 实例作为操作对象的上下文。此外，当我们需要在 activity 的外部（application 或者 service），我们可以使用 application 上下文替代。

<br>
## Context 是用来做什么的?
***

以下是需要用到 Context 对象的一些示例。

<br>
### 显式启动一个组件
***

```java
// MyActivity 作为内部 activity, 在这里充当 contenxt 的角色
Intent intent = new Intent(context, MyActivity.class);
startActivity(intent);
```

当显式启动一个组件需要满足两个条件：
* 应用程序的包名，唯一标识应用程序包含的组件
* 组件的 Java 全限定类名

如果是启动一个内部的组件，可以传递应用程序当前的包名作为 Context ，通过调用 `context.getPackageName()` 方法。

<br>
### 创建一个 View（视图）
***

```java
TextView textView = new TextView(context);
```

Contexts 包含了以下 View 所需要的信息：

* 设备的屏幕大小和尺寸，用来将 dp, sp 转换为 pixels
* 样式属性
* onClick（点击事件）属性所需要的上下文（activity 引用）

<br>
### 填充 xml 布局文件
***

使用 context 取得 `LayoutInflater` 填充一个 xml 布局到内存中：

```java
// 创建视图必须要使用到 context
LayoutInflater inflater = LayoutInflater.from(context);
inflater.inflate(R.layout.my_layout, parent);
```

<br>
### 发送本地广播
***

使用 context 取得 `LocalBroadcastManager` 发送广播或者注册广播解释器：

```java
// context 默认包含了一个 main Looper（Android 消息机制中的一个重要成员，具体查看官方文档）引用
// 他负责管理应用程序主线程的 queue（消息队列）
Intent broadcastIntent = new Intent("custom-action");
LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
```

<br>
### 接受系统服务
***

应用程序要发送一个通知，需要使用 `NotificationManager` :

```java
// Context objects are able to fetch or start system services.
// 通过 Context 对象可以取得或启动系统服务：
NotificationManager manager =
    (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

int notificationId = 1;

// 构建 RemoteViews 需要用到 Context
Notification.Builder builder =
    new Notification.Builder(context).setContentTitle("custom title");

notificationManager.notify(notificationId, builder.build());
```

这是 **[官方文档中的系统服务列表](http://developer.android.com/reference/android/content/Context.html#getSystemService(java.lang.String)**（国内访问请自备梯子），通过 Context 对象都可以使用。

<br>
## 应用程序（Application） vs 活动（Activity） Context
***

主题（themes）和样式（styles）通常应用 Application 级别的 Context, 它们同样可以应用在 Activity 级别的 Context, 对于后者，每个　activity 可以选择不同主题和样式，而 Application 级别的是所有的 antivity 共同使用一种主题和样式（场景：某个 activity 不使用 ActionBar）。在 `AndroidManifest.xml` 文件中配置 Application/Activity 的主题:

```xml
<application
       android:allowBackup="true"
       android:icon="@mipmap/ic_launcher"
       android:label="@string/app_name"
       android:theme="@style/AppTheme" >
       <activity
           android:name=".MainActivity"
           android:label="@string/app_name"
           android:theme="@style/MyCustomTheme">
```

这样一来，搞清楚 Application Context 和　Activity Context 各自的生命周期就非常重要。通常情况下，使用 Activity Context 的场景比较多，例如访问 [Views](2014-04-01-Defining-Views-and-their-Attributes.html) 的主题，样式，尺寸，如果没有显式指定 Activity 的主题，默认的 application 主题会被应用。

下面的例子使用 Activity Context 创建一个 Toast 信息，`this` 关键字指定引用当前类（这里指 MainActivity）：

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);  
        Toast.makeText(this, "hello", Toast.LENGTH_SHORT).show();
    }
}
```

<br>
### Anonymous functions（匿名函数）
***

注意，当使用匿名函数如实现一个事件监听器，关键字 `this` 在匿名内部类内引用指向的不是 `MainActivity`, 而是匿名内部类本身，所以，在这种情况下需要使用 `MainActivity.this` 指定 Activity Context:

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        TextView tvTest = (TextView) findViewById(R.id.abc);
        tvTest.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View view) {
                  Toast.makeText(MainActivity.this, "hello", Toast.LENGTH_SHORT).show();
              }
          });
        }
    }
```

<br>
### Adapters（适配器）
***

<br>
#### Array Adapter
***

当为 [ListView](2014-04-05-Using-an-ArrayAdapter-with-ListView-and-defining-the-adapter.html) 构造适配器时，使用 `getContext()` 获取 context 对象 :

```java
     if (convertView == null) {
        convertView =
            LayoutInflater
                .from(getContext())
                .inflate(R.layout.item_user, parent, false);
     }
```

这里实例化 ArrayAdapter 使用的是 Application Context, 然而，如果 themes/styles 有可能不是，这样，确保要换成 Activity Context 实例化 ArrayAdapter.

<br>
#### RecyclerView Adapter
***

```java
public class MyRecyclerAdapter extends RecyclerView.Adapter<MyRecyclerAdapter.ViewHolder> {

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v =
            LayoutInflater
                .from(parent.getContext())
                .inflate(itemLayout, parent, false);

        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int i) {

        // 从 ViewHolder's 根视图获取 context
        Context context = viewHolder.itemView.getContext();

        // 使用这个 context 实现动态添加视图
        if(i == 0) {
            TextView tvMessage = new TextView(context);
            tvMessage.setText("Only displayed for the first item.")

            viewHolder.customViewGroup.addView(tvMessage);
        }
    }

   public static class ViewHolder extends RecyclerView.ViewHolder {
       public FrameLayout customViewGroup;

       public ViewHolder(view imageView) {
           // 确保要调用父类构造器，在这里它的作用是实例化了 imageView 视图控件
           super(imageView);

           // 查找 imageView 中的子视图控件
           customViewGroup = (FrameLayout) imageView.findById(R.id.customViewGroup);
       }
   }
}
```

从这里可以知道，`ArrayAdapter` 必须传递 context 对象到它的的构造函数，而 `RecyclerView.Adapter` 不需要，当它需要 context 时它的父视图可以提供。

当调用 `RecyclerView.Adapter.onCreateViewHolder()` 时，`RecyclerView` 会作为父视图传进去。

如果在 `onCreateViewHolder()` 方法之外使用到 context, 同时 `ViewHolder` 实例可以获得，通过调用 `viewHolder.itemView.getContext()` 可以获得 context 对象。`itemView` 是由 ViewHolder 提供的 public（公共的）、non-null（非空）和 `final`（常量） 的视图控件。

<br>
### 避免内存泄漏
***

Application Context 的使用场景通常是在创建单例对象时，例如这里需要创建一个 CustomManager 单例类，它需要提供一个 context 对象去获取系统服务，其他的 Activities 可以重用 CustomManager 的资源。在这个场景，一定要使用 Application Context, 如果使用 Activity Context ,那么当 Activity 不再运行时，它所占用的内存也得不到释放，这样子就造成了内存泄漏。

如下的示例，如果使用的是 Activity Context, 调用的服务由 Android system 销毁，那么垃圾回收器将不能回收这里的 Activity 占用的内存资源，因为它关联了 CustomManager 类的一个静态引用，这个作用域的回收时间是要应用程序被销毁时才触发。

```java
pubic class CustomManager {
    private static CustomManager sInstance;

    public static CustomManager getInstance(Context context) {
        if (sInstance == null) {

            // 这个类在被销毁前都会引用传进来的 context
            sInstance = new CustomManager(context);
        }

        return sInstance;
    }

    private Context mContext;

    private CustomManager(Context context) {
        mContext = context;
    }
}
```

<br>
### 正确使用 application context
***

为了避免内存泄漏，永远不要引用比自身生命周期长的 context 对象。在使用后台线程、消息处理器、内部类等操作时特别要留意。

回到上面的例子，`CustomManager.getInstance()` 中的 context 正确的用法是使用自身创建的 mContext 对象，它的生命周期是和应用程序进程绑定在一起的。

```java
public static CustomManager getInstance(Context context) {
    if (sInstance == null) {

        // 在这种场景，永远不要引用视图控件（Activity）本身的 context，而是使用 Application Context
        sInstance = new CustomManager(context.getApplicationContext());
    }

    return sInstance;
}
```

<br>
# 参考
***

* [What is a context - Simple Code Stuffs](http://www.simplecodestuffs.com/what-is-context-in-android/)
* [Context, what context - Possible Mobile](https://possiblemobile.com/2013/06/context/)
* [Context: What, where, & how? - 101 Apps](http://www.101apps.co.za/index.php/articles/all-about-using-android-s-context-class.html)
* [What is a context - Stack Overflow](http://stackoverflow.com/questions/3572463/what-is-context-in-android)
* [Avoiding memory leaks](http://android-developers.blogspot.com.tr/2009/01/avoiding-memory-leaks.html)
