{:title "Android - 理解 Activity 的生命周期"
 :layout :post
 :tags  ["android"]
 :toc true}

 <br>
 ***
 <br>

## 背景
***

当应用程序被运行时，Android 会创建一个**堆栈**用来维持已经访问的 `activities`，其中当前可见的 `activity` 会被放到**栈顶**。

应用程序的 `activity` 所拥有的 4 种状态：

<table class="table table-bordered">
<thead>
<tr>
<th>状态</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>正在运行</td>
<td>Activity 可以被看见，并可以和用户进行交互</td>
</tr>
<tr>
<td>已被暂停</td>
<td>Activity 可以被看见，但不可以和用户进行交互</td>
</tr>
<tr>
<td>已被停止</td>
<td>Activity 不可见</td>
</tr>
<tr>
<td>已被杀死</td>
<td>Activity 被系统回收（内存紧张）或者它的 `finish()` 方法被调用</td>
</tr>
</tbody>
</table>

<br>
## Activity 的生命周期
***

下图为官方提供的 Activity 完整生命周期图：

![Lifecycle](http://oem503hzx.bkt.clouddn.com/Android-Activity-Lifecycle.png)

<table class="table table-bordered">
<thead>
<tr>
<th>生命周期方法</th>
<th>说明</th>
<th>使用场景</th>
</tr>
</thead>
<tbody>
<tr>
<td>`onCreate()`</td>
<td>Activity 已经启动（但用户还不能看见）</td>
<td>可以在这里进行一些视图或者数据的初始化，Activity 的布局文件也是通过 [setContentView()](http://developer.android.youdaxue.com/reference/android/app/Activity.html#setContentView(int)) 方法在这里加载</td>
</tr>
<tr>
<td>`onStart()`</td>
<td>Activity 已经可以被用户看见（但还不能进行交互）</td>
<td>这个方法使用的不多，可以在这里监听 UI 的一些配置变化，因为当前用户已经可以看得见 Activity 了</td>
</tr>
<tr>
<td>`onResume()`</td>
<td>Activity 加载完成，可以和用户进行交互了</td>
<td>和用户进行交互，例如：加载动画、启动摄像头等</td>
</tr>
<tr>
<td>`onPause()`</td>
<td>可以理解为和 `onResume()` 组成一对，Activity 已经被暂停，不能再和用户进行交互，通常是因为有其他的 activity 在这个 Activity 上被调用</td>
<td>通常在这里撤销在 `onResume()` 方法中所做的事情，或者保存一些全局的操作（例如：正在读写的文件）</td>
</tr>
<tr>
<td>`onStop()`</td>
<td>可以理解为和 `onStart()` 组成一对，Activity 已经不再可见</td>
<td>通常在这里撤销在 `onStart()` 方法中所做的事情</td>
</tr>
<tr>
<td>`onDestroy()`</td>
<td>可以理解为和 `onCreate()` 组成一对，这个方法被调用是因为触发了 activity 的 `finish()` 方法，或者系统需要释放一些内存</td>
<td>通常在这里进行所有清理工作。例如，如果 activity 需要开启一个线程从网络中下载数据，那么就应该在 `onCreate()` 方法中启动这个线程，然后在这里终止</td>
</tr>
<tr>
<td>`onRestart()`</td>
<td>当 Activity 处于停止状态（调用了　`onStop()`），那么通过它可以重新启动 Activity</td>
<td>通常开发者不需要显式调用这个方法</td>
</tr>
</tbody>
</table>

<br>
### 处理配置发生改变
***

理解好 Activity 的生命周期非常重要，这关系到能不能创建一个足够健壮的 App。因为，一旦 activity 离开设备屏幕，**activity 就随时会被销毁**，当用户再次切换到这个 activity 时，activity 将会被重新创建，或者，当设备的屏幕发生旋转，activity 也会被重新创建，生命周期也重新执行。显然，存在这样情况的 App 在用户体验上非常糟糕，所以，开发者必须严肃看待这些问题，详细方案可参考这篇文章 [handling configuration changes](http://guides.codepath.com/android/Handling-Configuration-Changes).

<br>
### 正确调用父类方法
***

当调用 Activity 生命周期的方法时，通常需要调用想对应的父类方法。注意，这里存在是 **先调用，还是后调用** 的规则：初始化（`onCreate()`、`onStart()`、`onResume()`）的生命周期方法中是 **先调用** 父类方法，撤销（`onDestroy()`、`onStop()`、`onPause()`）的生命周期方法中是 **后调用** 父类方法，示例如下：

```java
public void onCreate() {
   super.onCreate();
   // 先调用对应的父类方法再做其他操作
   // setContentView(R.layout.main);
}
```


```java
public void onPause() {
  // 先完成自己的操作再去调用对应的父类方法
   // LocalBroadcastManager.getInstance(this).unregisterReceiver(mMessageReceiver);
   super.onPause();
}
```

相关讨论文章 [Stack Overflow article](http://stackoverflow.com/questions/16925579/android-implementation-of-lifecycle-methods-can-call-the-superclass-implementati).

<br>
## 参考
***

* <http://developer.android.youdaxue.com/training/basics/activity-lifecycle/index.html>
* <https://github.com/xxv/android-lifecycle>
