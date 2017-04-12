{:title "Android 面试问题整理和解答"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***


<br>
## Android 核心
***

<br>
### 什么是 Android ？
***

Android 是由 Google 公司基于 Linux Kernel 开发的一款开放源代码的手机操作系统，主要是为触屏设备而设计（手机、平板电脑）。

<br>
### 什么是 APK ？
***

APK（Android application package）是 Android 应用分发和安装的一种文件格式。
<img src="http://oem503hzx.bkt.clouddn.com/Android-Interview-Apk-Structure.jpg" width="600" height="600" /> 

<br>
### 什么是 Dalvik ？
***

Dalvik 是一个基于寄存器的虚拟机（VM）。 每一个 Android 应用程序都在其自己的 Dalvik 虚拟机实例的进程中运行。

注意：Dalvik 在 Android 5.0 Lollipop 之后已完全被 ART 替代。

<br>
### 什么是 ART ？
***

ART（Android Runtime）是 Android 应用的新运行时环境。 ART 通过使用 AOT（Ahead-of-Time）编译来提高执行效率。

<br>
### 什么是 "UI thread" ？
***

Android 应用程序运行在自己的进程中，可以使用多个线程。 应用程序执行的线程被称为“主线程”或“UI线程”。

<br>
### 什么是 Instant Run（即时运行） ？
***

Instant Run 主要是为了提高 Android 应用的开发速度。通过它调试 App 的时候不需要每次都要重新编译整个应用，而仅仅是编译已修改的内容。

<br>
### 什么是 Android manifest file（清单文件） ？
***

每个 Android 应用程序的根目录中都必须有一个 AndroidManifest.xml 文件。AndroidManifest.xml 文件提供有关应用程序的基本信息，必须具有该文件才能运行应用程序中的代码。

通常，AndroidManifest.xml 包含以下信息：
* 应用程序的 Java 包
* 应用程序组件，如活动（activities），服务（services），广播接收器（broadcast receivers）和内容提供者（content providers）
* 必要的权限

<br>
### 什么是 ADB ？
***

Android Debug Bridge（adb）是一个可让您与 Android 设备通信的命令行工具。 它提供了各种设备操作，如安装和调试应用程序。

<br>
### 什么是 Intent ？
***

Intent 可以理解为 Activities 或者 Services 组件之间消息通讯的信使。通过它，可以像触发器一样去做一些事情。

补充：意图是异步的，允许您与来自同一应用程序的组件以及来自其他应用程序的组件进行交互。 意图中的主要信息是：
* **Action:** 要执行的通用操作（`ACTION_VIEW` -> view，`ACTION_EDIT` -> edit，...）
* **Extras:** 要操作的数据，存储在键值映射（Bundle）中
* **Component name:** 要启动的组件的名称。 此值使显示的 Intent（例如 com.example.AnotherActivity.class）
* **Flags:** Intent 可选的元数据

<br>
### 什么是隐式 Intent ？
***

隐式 Intent 不会指定要启动的组件名称。 它只声明启动的动作行为，该动作指定应用程序想要做的事情。

补充：系统会寻找一个合适的组件来启动该 Intent 所声明的动作类型：
* 如果有多个组件与操作匹配，系统将显示一个对话框，以便用户可以选择要使用的应用程序
* 如果设备上没有适当的组件可以处理该操作，应用程序将立即崩溃

例子：如果应用程序想要触发电话，则只需指定下面的动作（ACTION_DIAL）：
```java
Uri number = Uri.parse("tel:4008888888");
Intent callIntent = new Intent(Intent.ACTION_DIAL, number);
if (callIntent.resolveActivity(getPackageManager()) != null) {
    // 系统会处理 Intent
}
```

<br>
### 什么是显式 Intent ？
***

一个显式的 Intent 是通过指定完全限定的类名来启动组件。这是我们在应用程序中启动组件最常用的方式。

例子：
```java
Intent startIntent = new Intent(myContext, AnotherActivity.class);
```

<br>
### 什么是粘性（Sticky） Intent ？
***

粘性 Intent 是作为粘性广播发送的意图，意思是在广播完成后 Intent 仍停留在使用的地方。

举例：Android 系统使用粘性广播通知接收者电池电量已更改（`ACTION_BATTERY_CHANGED`）。

当您为该操作调用 `registerReceiver()` 时，您将始终获得该操作的最新 Intent。 不必等待下一个广播！

注意：Android 5+ 已弃用粘性广播。

<br>
### 什么是 PendingIntent ？
***

PendingIntent 包装一个常规 Intent，它指定将来要采取的操作。 同时它也作为外部应用程序组件的标记（例如 AlarmManager，NotificationManager，AppWidgetManager）。 该符号给予外部应用程序在满足条件时执行应用程序内部 Intent 的权限（例如，AlarmManager 在特定时间触发 PendingIntent）。

<br>
### Intent 有哪些用法？
***

* 启动内部 Activity（显式意图）
* 启动内部 Service（显式意图）
* 启动外部 Activity/Application（隐式意图）
* 发送广播（broadcast）

<br>
### 什么是 Service ？
***

Service 是没有用户界面的应用程序组件，可以在后台执行长时间运行的操作（=相应的应用程序不必在前台）。

**重要提示：**服务在主线程中运行，并且不会创建自己的线程。 在服务实例中为 CPU 密集型或阻塞操作创建新线程很重要。

以下为两种非常重要的 services:
* **Started Service:** 启动服务（通常通过 `startService()` 启动）在后台无限期运行。 服务完成工作（例如下载文件）后，有必要通过调用 `stopSelf()` 或 `stopService()` 来停止服务。
<br>
<br>
生命周期：`onCreate()` -> `onStartCommand()` -> `RUNNING` -> `onDestroy()`
<br>
<br>
* **Bound Service:** 绑定服务为应用程序组件（例如 Activity）提供客户端 - 服务器接口。 只要其他应用程序组件被绑定，这种类型的服务就会运行。
<br>
<br>
生命周期：`onCreate()` -> `onBind()` -> `RUNNING` -> `onUnbind()` -> `onDestroy()`
<br>
<br>
两种类型的 Service 也可混合使用！

<br>
### 什么是 IntentService ？
***

IntentService 是服务（Service）的一个子类，它使用一个工作线程来处理所有的开始请求。 所有任务在单独的工作线程上顺序执行。 IntentService 不能并行运行任务。

注意：没有必要产生一个额外的线程，也没有必要调用 `stopSelf()` 。 一旦处理了所有任务/启动请求，IntentService 就会自动停止。

<br>
### 什么时候使用 IntentService ？
***

IntentService 通常用于长时间运行的 “fire and forget tasks” 。

<br>
### 什么是 AsyncTask ？
***

AsyncTask 是一个抽象类，允许在后台运行短时操作，并在 UI 线程上轻松发布结果。

<br>
### 什么时候使用 AsyncTask ？
***

AsyncTask 是一种从 Activity 或 Fragment 中执行短时操作（几秒钟）的便捷方式。

在 Activity 或 Fragment 中使用 Asynctask 时，请检查当用户离开 Activity / Fragment 时是否取消正在运行的 AsyncTask。 在活动或分片中实现 AsyncTask 始终作为静态内部类，并避免引用外部 Activity / Fragment 以避免内存泄漏。

<br>
### 什么是 JobScheduler API ？
***

JobScheduler 是一个抽象类，允许开发人员创建在满足某些条件的情况下在后台执行的作业。 典型的例子：
* 设备插入电源
* 设备连接上 wifi

**重要：**该作业在主线程上运行。如果是耗时任务有必要使用另一个线程处理。

<br>
### Handler 通常用来干嘛 ？
***

通常它是用来在不同的线程中履行一些操作的。

它也用于调度将来某个时间执行的消息和线程体。

补充：在大多数情况下，您将在后台线程中使用处理程序在主线程中执行某种操作。 处理程序对象将自身注册到创建它的线程中，并为此线程提供通信通道。

例子：
```java
public class MyActivity extends Activity {
    private ProgressBar progress;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.example);
        progress = (ProgressBar) findViewById(R.id.myProgressBar);
    }

    public void startSuperLongProcessing(View view) {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                progress.post(new Runnable() { // 使用 View 元素中的 Handler
                    @Override
                    public void run() {
                        progress.setProgress(100); // 在主线程上执行此语句
                    }
                });
            }
        };
        new Thread(runnable).start(); // 启动线程
    }
}
```

<br>
### 什么是 ContentProvider ？
***

ContentProvider 是管理对数据存储库访问的 Android 应用程序的一部分。

<br>
### ContentProvider 通常用来干嘛 ？
***

它通常用于提供与其他应用程序共享数据的方法。

<br>
### 什么时候使用 ContentProvider ？
***

如果您计划与其他应用程序共享数据，则应考虑使用 ContentProvider 。

<br>
### 什么是 SharedPreference ？
***

SharedPreference 是一种在 Android 中存储数据的简单机制。 数据存储在文件中的键值集合中。

<br>
### 什么是 ANR ？
***

ANR 是“应用程序不响应”的缩写。 这是一个对话框，如果应用程序无法响应用户输入系统则显示它。

<br>
### 怎么避免 ANR ？
***

通过使用工作线程来阻止 I / O 操作或其他长时间运行的操作。

补充：Android 应用程序通常运行在一个线程（UI线程）上。 如果应用程序在该线程上执行长时间运行的操作，并且在5秒钟内无法响应用户输入事件（例如屏幕触摸事件），系统将显示 ANR 对话框。

<br>
## Android UI
***

<br>
### 什么是 Activity ？
***

Activity 表示 Android 中的表示层。它提供了一个用户可以与之交互的屏幕，以便做某事。

Android 应用程序通常由多个 Activity 组成，这些 Activity 彼此松散地绑定，并且可以在应用程序运行时相互切换。


<br>
### Activity 最重要的生命周期有哪些 ？
***

`onCreate(Bundle)`, `onStart()`, `onResume()`, `onPause()`, `onStop()`, `onDestroy()`

<br>
### Activity 的可见生命周期有哪些 ？
***

`onStart()`, `onResume()`, `onPause()`, `onStop()`

标注：在此期间，用户可以看到 Activity。 但是，Activity 可能不在前台或与用户进行交互。

<br>
### Activity 的前台生命周期有哪些 ？
***

`onResume()`, `onPause()`

标注：此时 Activity 在所有其他 Activity 的前面。 用户可以与 Activity 进行交互。

<br>
### Activity 的四个基本状态是什么 ？
***

* **Active:** 如果 Activity 是活动的（它可以接收用户输入）并且可见
* **Paused:** 如果 Activity 可见但不活动
* **Stopped:** 如果 Activity 不可见
* **Destroyed:** 当 Activity 进程被杀死

<br>
### 系统在调用“onCreate(Bundle)”后直接调用“onDestroy()” ? 不调用"onStart()，onResume()，onStop()，onPause()" ?
***

通过在 `onCreate(Bundle)` 方法中调用 `finish()` ，除了 `onDestroy()` 之外，系统不会调用任何其他生命周期方法。

<br>
### Activity A 启动 Activity B , 调用哪些生命周期方法，以什么顺序 ？
***

1. Activity A's `onPause()` 方法被调用
2. Activity B's `onCreate()` , `onStart()` , `onResume()` 方法按顺序调用。Activity B 现在在前台。
3. Activity A's `onStop()` 方法被调用，Activity A 在屏幕上不再可见。

标注：请注意 Activity 转换中的重叠，Activity B 在完成创建之前，Activity A 并未完全停止。

<br>
### 描述两个场景，由于正常的应用程序行为，Activity 被销毁 ?
***

1. 当用户按下后退按钮
2. 调用 `Activity.finish()` 方法

标注：在这两种情况下，Activity 实例都将永远消失。 Activity 已不再需要了。

还有一个运行时的配置更改（如屏幕方向，键盘可用性，语言，...）会触发 Activity 的重新创建：当前实例被销毁（`onDestroy()`被调用），并创建一个新的实例（`onCreate()`被调用）。 在此重新创建的过程中通过 `Bundle` 存储 Activity 的状态很重要。

<br>
### 描述一个场景，由于系统行为，Activity 被销毁了 ?
***

Android 系统可能会销毁您的 Activity 进程来恢复内存。

标注：如果 Activity 处于停止状态并且长时间未使用，或者当前前台活动需要更多内存，则会发生这种情况。 系统将实例状态存储在 `Bundle` 对象中。 保存的状态用于恢复以前的状态。

注意：Android 是杀死整个进程，而不仅仅是 Activity 实例。


<br>
### 系统如何存储 Activity 的状态 ？
***

系统调用 `onSaveInstance()` 方法并将实例状态存储在键值对集合中。

重要：您必须调用 `onSaveInstanceState()` 的超类实现。默认实现保存视图层次结构的状态。 这要求每个视图都有一个唯一的 ID（`android:id`）。

例子：
```java
@Override
public void onSaveInstanceState(Bundle savedInstanceState) {
    savedInstanceState.putInt(`MY_VAR_KEY`, myVarValue);

    // 后调用超类方法
    super.onSaveInstanceState(savedInstanceState);
}
```

<br>
### Activity 如何恢复其以前的状态 ？
***

通过使用系统传递给 `onCreate()Bundle` 的 Bundle 实例或通过实现 `onRestoreInstanceState(Bundle)` 方法。

例子：
```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 一定要执行非空检查
    if (savedInstanceState != null) {
        // 从实例状态中恢复数据
        myVarValue = savedInstanceState.getInt(MY_VAR_KEY);
    } else {
        // 首次初始化，无数据可回复
    }
}
```

使用 onRestoreInstanceState（Bundle）：
```java
@Override
public void onRestoreInstanceState(Bundle savedInstanceState) {
    // 先调用超类方法
    super.onRestoreInstanceState(savedInstanceState);

    // 从实例状态中恢复数据
    myVarValue = savedInstanceState.getInt(MY_VAR_KEY);
}
```

<br>
### 什么是 Fragment ？
***

Fragment 是 Activity 的模块化部分，它有自己的生命周期。 它可以在 Activity 运行时添加或删除，也可以在不同的 Activity 中重复使用。

标注：要创建 Fragment，必须继承 Fragment 基类。 必须提供一个公共的无参数的构造函数，因为 Android 需要它来重新实例化一个 Fragment 类（ -> state restore ）。

<br>
### Fragment 主要的作用是什么 ？
***

Fragment 的主要目的是支持更动态的 UI（平板电脑，智能手机），并且使 UI 组件的重用更容易。

Fragment 也可以没有自己的用户界面而作为 Activity 的隐形占位符。

Fragment 与其所处的 Activity 密切相关。当 Activity 暂停时，其中的所有 Fragment 也将被暂停; 当 Activity 被销毁时，其中的所有 Fragment 也被销毁。

<br>
### 将 Fragment 添加到 Activity 中有哪两种方法 ？
***

Fragment 可以在 Activity 的布局文件中声明:
```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <fragment android:name="com.example.MyFragment"
            android:id="@+id/my_fragment"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
</FrameLayout>
```
标注：Android 系统通过 Fragment's `onCreateView` 方法返回的视图元素替换 `<fragment>` 标签的元素。

另外，也可以在运行时以编程方式添加 `Fragment` 。 可以使用 `FragmentTransaction` 中的 API 在运行时添加，删除或替换 `Fragment` :
```java
FragmentManager fragmentManager = getFragmentManager();
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

ExampleFragment newFragment = new ExampleFragment();
fragmentTransaction.replace(R.id.my_fragment_container, newFragment);
fragmentTransaction.addToBackStack(null);

fragmentTransaction.commit();
```
`my_fragment_container` 是指定要放置 Fragment 的 ViewGroup 资源。

<br>
### 当你在用另一个替换 Fragment 时，如何确保用户可以按 Back 按钮返回到上一个 Fragment ？
***

必须在 `FragmentTransaction` 中添加 `addToBackStack()`:
```java
FragmentManager fragmentManager = getFragmentManager();
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

ExampleFragment fragment = new ExampleFragment();
fragmentTransaction.replace(R.id.my_fragment_container, fragment);

fragmentTransaction.addToBackStack(null);

fragmentTransaction.commit();
```

必须在主 Activity 类中重写 `onBackPressed`:
```java
@Override
public void onBackPressed() {
    if (getFragmentManager().getBackStackEntryCount() > 0) {
        getFragmentManager().popBackStack(); // 返回到上一个 Fragment
    } else {
        super.onBackPressed(); // 返回到上一个 Activity
    }
}
```
注意：如果不在 `FragmentTransaction` 中调用删除 Fragment 的 `addToBackStack()` ，那么当事务提交时，该 Fragment 被销毁，并且用户无法返回到该 Fragment 。

但是，如果在删除 Fragment 时调用 `addToBackStack()` ，则 Fragment 将被停止，如果用户返回，则将继续。 “已移除” Fragment 保持创建状态，只有其视图被销毁。

<br>
### Fragment 和 Activity 有什么区别 ？
***

Activity 代表一个完整的 UI 屏幕，独立运行。Activity 可以没有任何 Fragment 存在。Fragment 总是 Activity 的一部分，不能独立存在。Activity 可以有一个或多个 Fragment 。

<br>
### 系统如何存储 Fragment 的状态 ？
***

系统调用 `onSaveInstanceState()` 方法并将实例状态存储在键值对集合中。

注意：必须调用 `onSaveInstanceState` 的超类实现。默认实现保存视图层次结构的状态。 这要求每个视图都有一个唯一的 ID（`android: id`）。

<br>
### Fragment 如何恢复其以前的状态 ？
***

通过在 `onCreate()`，`onCreateView()` 或 `onActivityCreated()` 中还原实例状态。

<br>
### Fragment 的方法 setRetainInstance（boolean）有什么作用 ？
***

1. `setRetainInstance(true)` ：在配置更改（例如屏幕旋转）时，Fragment 的状态将被保留（而不是被销毁！）。 即使配置更改导致“父” Activity 被销毁，状态也将保留。 但是，Fragment 的视图被销毁！
<br>
<br>
生命周期方法调用：
<br>
`onPause()` -> `onStop()` -> `onDestroyView()` -> `onDetach()`
`onAttach()` -> `onCreateView()` -> `onStart()` -> `onResume()`
<br>
<br>
2. `setRetainInstance(false)` ：在配置更改（默认）之间不会保留 Fragment 的状态。
<br>
<br>
生命周期方法调用：
<br>
`onPause()` -> `onStop()` -> `onDestroyView()` -> **`onDestroy()`** -> `onDetach()`
`onAttach()` -> **`onCreate()`** -> `onCreateView()` -> `onStart()` -> `onResume()`
<br>
<br>
注意：`setRetainInstance(true)` 不适用于有返回栈（`addToBackStack()`）的 Fragment。 `setRetainInstance(true)` 对于不关心配置更改的 Fragments 中的长时间运行操作特别有用。

<br>
### 什么是 ViewPager ？
***

ViewPager 是一个布局管理器，允许用户通过页面（通常是Fragments）的数据左右翻转。

标注：`FragmentPagerAdapter` 和 `FragmentStatePagerAdapter` 是 **ViewPager** 的两个子类：
* FragmentPagerAdapter:
    * 适合固定或少量页面（Fragments）
    * 一旦创建了 Fragment 实例，它就不会被删除。它只是从 Fragment 中分离出视图（ -> `onDestroyView()` ）
* FragmentStatePagerAdapter:
    * 适用于大量或未知数量的页面（Fragments）
    * Fragment 实例一旦超出范围就可以完全删除（可配置值）

<br>
### 什么是 Task ？
***

Task 是一个堆栈（LiFo：“Last in，First out” -> "后进先出"），其中包含一组 Activity 实例（也称为后退栈）。 系统可以同时容纳多个 Tasks，但只有一个 Task 在前台。

举例：如果用户启动了最近尚未使用的应用程序，则会创建一个新任务，并打开该应用程序的主要 Activity（例如 Activity A）。 当 Activity A 启动 Activity B 时，Activity A 停止（Android 保留 Activity A 的状态）。 如果用户按下后退按钮，则 Activity A 恢复，当前的 Activity B 被销毁（Android 不保留 Activity B 的状态）。

<br>
### 什么是 “launch modes”（启动模式） ？
***

启动模式定义新实例或 Activity 的现有实例如何与当前任务（Task）相关联。

Activity 的启动模式支持四种不同的模式：

1. **standard（默认）:** Activity 类的多个实例可以被实例化，并且可以将多个实例添加到相同的任务或不同的任务中。 这是大多数 Activity 的常见模式。

2. **singleTop:** 与 “standard” 的区别是，如果 Activity 的实例已经存在于当前任务的顶部，并且系统通过 Intent 启动此 Activity，则不会创建新的实例，因为它将触发 `onNewIntent()` 方法，而不是创建一个新的 Activity 实例。

3. **singleTask:** **总是**会创建一个新任务，并将新的 Activity 实例移动到任务栈的顶部。 但是，如果在任何任务栈中存在 Activity 实例，系统将通过调用 `onNewIntent()` 方法路由到该 Activity 实例。 在此模式下，Activity 实例将会被移动到同一个任务栈。 结果：此模式的 Activity 不能同时存在于多个任务栈中。

4. **singleInstance:** 和 “singleTask” 一样，只是不可以将 Activities 移动到同一个任务栈中。

<br>
### 当 BroadcastReceiver 在其 onReceive() 方法中收到一个 Intent 时，为什么不启动一个线程呢 ？ 你如何解决这个问题 ？
***

一旦执行 `onReceive()` 完成，系统就可以随时杀死进程（也会杀死生成的线程）。

解决方案：一个很好的方法是使用 JobService 而不是一个线程。 这样做，系统知道该过程仍然需要。

<br>
### Serializable 和 Parcelable 有什么区别 ？
***

*  实现 Serializable 接口的类允许在某些情况下对来自此类型的对象进行序列化。
*  而 Parcelable 必须由你自己实现序列化。可扩展的进程使得速度比 Serializable 快（不需要反射）。在 Android 中，Parcelable 也是默认的选择。

标注：序列化是将对象实例转换成一系列字节的过程，使得该对象可以容易地保存到持久存储器或跨通信通道（例如网络）传输。

<br>
## Android Design and XML
***

<br>
### Relativelayout 和 LinearLayout 有什么区别 ？
***

**LinearLayout：**垂直或水平排列视图元素。

**RelativeLayout：**排列相对于父元素或其他视图元素的元素。

<br>
### ListViews 和 GridViews 有什么区别和相似之处 ？
***

两个布局组件都显示可滚动的数据列表。 通过使用适配器插入数据。

* **GridView** 是一个 ViewGroup，可以在二维可滚动的网格中显示项目。
* **ListView** 是一个 ViewGroup，显示可滚动数据的垂直列表。

<br>
### 什么是 GridLayout ？
***

GridLayout 是一个 ViewGroup，它可以在一个带有行和列的网格中进行设置。 它就像一个 TabletLayout，但还支持 `columnSpan` 和 `rowSpan` 。

<br>
### Android 中通常使用哪些图像文件 ？
***

**PNG** 是 Android 中的首选格式。

<br>
### 什么是 Nine-patch 图片 ？
***

Nine-patch 图像是一个可扩展的图像资源，具有9个区域，称为补丁，可以分别缩放。

<br>
### Android 如何识别 Nine-patch 图片 ？
***

具有 **9.png** 文件扩展名的图像。

<br>
### View.GONE 和 View.INVISIBLE 有什么区别 ？
***

* **View.INVISIBLE：**视图是不可见的，但仍然占用空间用于布局（视图被隐藏）。
* **View.GONE：** 视图是不可见的，它不需要任何空间用于布局（视图被删除）。

<br>
### "res" 包含哪些常用的子目录 ？
***

* `res/drawable/*` -> 图片（ 包裹 nine-patch ）文件
* `res/layout/` -> 基于 XML 的 UI 布局文件。
* `res/values/` -> 字符串，颜色，尺寸，...
* `res/menu/` -> 菜单规格文件。
* `res/raw/` -> 原始文件，如 CSV 文件，影片剪辑或音频剪辑（mp3）。
* `res/xml/` -> 一般的 XML 文件。

<br>
### “wrapContent” 和 “matchParent” 有什么区别 ？
***

* `wrap_content:` 视图控件应占用与其内容相同的空间
* `match_parent:` 视图控件应填充其父容器中的所有剩余可用空间

注意：`fill_parent` 是 `match_parent` 的旧同义词。建议使用 `match_parent` 而不是 `fill_parent`。

<br>
### px，dp 和 sp 之间有什么区别 ？
***

* **px (Pixel):** 对应于屏幕上的实际像素
* **dp (Density-independent Pixel):** 是基于屏幕的物理密度抽象单元。一个`dp`是`160 dpi`屏幕上的一个像素（该单位相对于 `160 dpi` 屏幕），但一个`dp`等于`320 dpi`屏幕上的两个实际像素（px）
* **sp (Scale-independent Pixel):** 与`dp`相同，但是它也会被用户的字体大小偏好缩放。此单位用于指定字体的大小。

<br>
### 什么是 Adapter ？
***

Adapter（适配器）是 AdapterView 中的模型数据和数据的可视化表示之间的桥梁。

标注：使用 `BaseAdapter` 类作为构建您自己的适配器实现的基础。

<br>
### 什么是 ViewHolder-Pattern ？
***

ViewHolder 设计模式可用于提高 `ListView` 呈现数据的速度。

该模式可避免重复查找视图资源。调用 `findViewById()` 方法的次数大大减少，现有视图不必被垃圾回收，新视图也不必重新绘制。每行的视图引用都存储在一个简单的对象中，以供以后重用。

<br>
### 什么是 Android Support Library ？
***

Android Support Library 是由 Google 分发的一个类库，其中包含了向后兼容以及新的视图部件和工具类。

总体的宗旨是尽可能多地为更多设备提供最新 Android API 。

标注：Android Support Library 最初是单一的类库，现在已演变成一系列类库：

* **support-v13:**  兼容 API Level 13 或更高版本。
* **appcompat-v7:**  兼容 Action Bar 到 API Level 7 或更高版本。
* **recyclerview-v7:**  提供 `RecyclerView` 视图部件。

注意：从支持库版本**24.2.0**开始，所有支持库软件包的最低支持API级别已更改为API Level 9。`v＃`包表示法不再指示实际的最低 API 支持级别。例如：`support-v7` 库的最低API级别为**9**而不是**7**。

SDK Manager 提供对支持库（extras / Android Support）的访问。

`compileSdkVersion` 应与使用的 Android 支持库的主要版本相同。
