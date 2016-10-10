{:title "Android - 处理配置发生改变"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

存在这样一种场景，当设备的屏幕方向发生旋转时，默认的情况下 Activity 会被销毁，内存被回收，然后再重新创建。这样一来就会导致用户体验不流畅，甚至会丢失用户的交互数据，所以，在 Activity 被销毁之前把数据和相关状态保存下来，在重新创建的时候进行还原。

<br>
## 保存和还原 Activity 的状态
***

当 activity 被停止时，系统会调用 `onSaveInstanceState()` 方法，我们可以这个方法里面保留相关数据和状态，默认 Android 系统会把 activity 的 **view hierarchy（视图层级）** 相关的状态信息保存下来，例如 `EditText` 视图控件的输入文本，或者 `ListView` 视图控件的滚动位置等。

要在 Activity 中保留数据，我们需要实现 `onSaveInstanceState()` 方法，Android 系统开发框架为此提供了一个 `Bundle` 对象，我们可以通过 **键值对** 的方式快速保存数据，示例如下：

```java
public class MainActivity extends Activity {
    static final String SOME_VALUE = "int_value";
    static final String SOME_OTHER_VALUE = "string_value";

    @Override
    protected void onSaveInstanceState(Bundle savedInstanceState) {
        // 保存数据到 bundle
        savedInstanceState.putInt(SOME_VALUE, someIntValue);
        savedInstanceState.putString(SOME_OTHER_VALUE, someStringValue);
        // 一定要记得调用父类的对应方法，它可以保留视图控件的层级状态信息
        super.onSaveInstanceState(savedInstanceState);
    }
}
```

上面的方法在 Activity 被销毁之前会被调用，之后回到这个 Activity 系统会调用 `onRestoreInstanceState()`，我们可以在这个方法里面通过 `bundle` 对象还原相关的数据和状态信息：

```java
@Override
protected void onRestoreInstanceState(Bundle savedInstanceState) {
    // 先调用父类的对应方法，还原视图控件的层级信息，然后在进行数据还原
    super.onRestoreInstanceState(savedInstanceState);
    // 还原数据
    someIntValue = savedInstanceState.getInt(SOME_VALUE);
    someStringValue = savedInstanceState.getString(SOME_OTHER_VALUE);
}
```

还原数据的操作同时还可以在 `Activity#onCreate()` 方法中进行，相关的数据也是通过 `Bundle` 对象传递。但是在 `onRestoreInstanceState()` 方法进行会更方便些，相关讨论在这里 [this stackoverflow post](http://stackoverflow.com/a/14676555/313399).

注意，`onSaveInstanceState()` 和 `onRestoreInstanceState()` 这两个方法并不保证一定会同时被调用的，原因是当 activity 发生了一些改变有可能会被系统销毁，所以 `onSaveInstanceState` 被调用了，但实际情况是 activity 并没有被销毁，所以 `onRestoreInstanceState` 自然就不会得到调用。

更详细的介绍请参考官方指南 [Recreating an Activity](http://developer.android.youdaxue.com/training/basics/activity-lifecycle/recreating.html).

<br>
## 保存和还原 Fragment 的状态信息
***

和 Activity 一样，Fragment 也是通过 `onSaveInstanceState()` 方法来保留状态信息：

```java
public class MySimpleFragment extends Fragment {
    private int someStateValue;
    private final String SOME_VALUE_KEY = "someValueToSave";

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        outState.putInt(SOME_VALUE_KEY, someStateValue);
        super.onSaveInstanceState(outState);
    }
}
```

然后在 `onCreateView()` 中还原数据：

```java
public class MySimpleFragment extends Fragment {
   // ...

   @Override
   public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.my_simple_fragment, container, false);
        if (savedInstanceState != null) {
            someStateValue = savedInstanceState.getInt(SOME_VALUE_KEY);
            // 拿到保留的数据后...
        }
        return view;
   }
}
```

根据 fragment 的状态机制，我们一定要 **避免重复创建 fragment** 实例，在 activity 中可以 **通过 tag 查找** 已经存在的 fragment 实例：

```java
public class ParentActivity extends AppCompatActivity {
    private MySimpleFragment fragmentSimple;
    private final String SIMPLE_FRAGMENT_TAG = "myfragmenttag";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (savedInstanceState != null) { // fragment 可能已经保留在 savedInstanceState 中
           // 通过 tag 去查找已经存在的 fragment 实例
           fragmentSimple = (MySimpleFragment)  
              getSupportFragmentManager().findFragmentByTag(SIMPLE_FRAGMENT_TAG);
        } else if (fragmentSimple == null) {
           // 如果不存在，则创建一个新的实例
           fragmentSimple = new MySimpleFragment();
        }
    }
}
```

上面所说的 **tag** 是在 activity 添加 fragment 时设置的：

```java
public class ParentActivity extends AppCompatActivity {
    private MySimpleFragment fragmentSimple;
    private final String SIMPLE_FRAGMENT_TAG = "myfragmenttag";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 在添加 fragment 时，总是应该添加 tag，用于以后的查找操作
        if (!fragmentSimple.isInLayout()) {
            getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.container, fragmentSimple, SIMPLE_FRAGMENT_TAG)
                .commit();
        }
    }
}
```

通过这种模式，我们就很好地实现了 fragments 的管理和重用。

<br>
## 保留 Fragments
***

很多情况下，视图控件的状态信息会由 fragment 管理，而 fragment 是有 activity 来管理。这时候，当 activity 被重新创建的时候，我们可以选择保留 fragment 的状态信息：

```java
public class RetainedFragment extends Fragment {
    // 需要保留的数据对象
    private MyDataObject data;

    // 这个方法只会被调用一次
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 当 activity 重新初始化时，保留当前这个 fragment
        setRetainInstance(true);
    }

    public void setData(MyDataObject data) {
        this.data = data;
    }

    public MyDataObject getData() {
        return data;
    }
}
```

更多详细内容请参考官方指南 [information](http://developer.android.youdaxue.com/guide/topics/resources/runtime-changes.html#RetainingAnObject).

<br>
## 锁定屏幕方向
***

如果想屏幕始终只固定一个方向，可以在 `AndroidManifest.xml` 文件中的 `<activity>` 标签，配置它的属性 `android:screenOrientation`，示例如下：

```xml
<activity
    android:name="com.techblogon.screenorientationexample.MainActivity"
    android:screenOrientation="portrait"
    android:label="@string/app_name" >
    <!-- ... -->
</activity>
```

上面的 `activity` 始终只会 "portrait" （竖屏）显示。

<br>
## 手动管理配置改变
***

有时候，当设备的某些配置选项发生改变时，我们不想让系统重启相应的 `activity`，这种场景可以通过指定 `AndroidManifest.xml` 文件中的 `<activity>` 节点的 `android:configChanges` 属性，示例如下：

```xml
<activity android:name=".MyActivity"
          android:configChanges="orientation|screenSize|keyboardHidden"
          android:label="@string/app_name">
```

如果手动配置了 `android:configChanges` 属性，当指定的配置选项发生改变时，`activity` 不会再被重新创建，然后，我们可以在代码中通过 `onConfigurationChanged()` 手动处理这些配置选项发生改变后要怎么做，示例如下：

```java

@Override
public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);

    // 当屏幕方向发生改变时，手机会弹出一个消息
    if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
        Toast.makeText(this, "landscape", Toast.LENGTH_SHORT).show();
    } else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT){
        Toast.makeText(this, "portrait", Toast.LENGTH_SHORT).show();
    }
}
```

详细介绍请查看官方指南：
* [Handling the Change](http://developer.android.youdaxue.com/guide/topics/resources/runtime-changes.html#HandlingTheChange)
* [android:configChanges](http://developer.android.youdaxue.com/guide/topics/manifest/activity-element.html#config)
* [Configuration](http://developer.android.youdaxue.com/reference/android/content/res/Configuration.html)

<br>
## 参考
***

* <http://developer.android.youdaxue.com/guide/topics/resources/runtime-changes.html>
* <http://developer.android.youdaxue.com/training/basics/activity-lifecycle/recreating.html>
* <http://www.vogella.com/tutorials/AndroidLifeCycle/article.html#configurationchange>
* <http://www.androiddesignpatterns.com/2013/04/retaining-objects-across-config-changes.html>
* <http://www.intertech.com/Blog/saving-and-retrieving-android-instance-state-part-1/>
* <http://sunil-android.blogspot.com/2013/03/save-and-restore-instance-state.html>
* <https://medium.com/google-developers/activity-revival-and-the-case-of-the-rotating-device-167e34f9a30d#.nq3b23lxg>
