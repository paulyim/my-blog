{:title "Android - 使用 ListView"
 :layout :post
 :tags  ["android"]
 :toc true}

 <br>
 ***
 <br>

## 概述
***

 在 Android 开发中，我们经常会使用到一个视图控件 `ListView`，它以列表的形式显示数据项，超出手机屏幕的数据以滚动方式呈现，和它配套使用的数据适配器 `Adapter`。数据适配器有多种，其中一个最简单的为 `ArrayAdapter`，它将 `ArrayList` 的对象封装成 `View` 的数据项，然后被 `ListView` 容器加载。

<img src="https://i.imgur.com/mk82Jd2.jpg" width="600" />

简单的总结，`ArrayAdapter` 的使用要结合两样东西：

* `ArrayList`（数据源）数组列表
* `ListView`（视图控件）显示列表数据的视图控件

类似 `ArrayAdapter`，另外一个结合本地数据库 [Local SQLite Database](Local-Databases-with-SQLiteOpenHelper) 操作的数据适配器  [CursorAdapter](Populating-a-ListView-with-a-CursorAdapter)。

<br>
## Row View Recycling（回收列表项的资源）
***

为了更好的使用 `ListView` 和它的数据适配器，有必要理解 `ListView` 列表项的视图资源回收是怎么工作的。

当 `ListView` 连接好数据适配器，它不会将所有数据都提前实例化到内存中，只有当前看得见（设备高度）的数据项会被实例化。

其实，当向下滚动列表视图时，**之前被实例化的数据项离开屏幕（看不见了）后依然驻留在内存中，被后面重用**，那些新出现在屏幕上的数据项**重用之前保留在内存中的数据项**。也就是说，就算我们的列表数据超过1000行，也只有 ~7（标准屏幕高度） 个数据库会实例化到内存中，如下图：

<img src="https://i.imgur.com/zpkVUMR.png" width="500" />

这是另外一张关于视图回收的图片：

<img src="https://i.imgur.com/SZ8iKuu.jpg" width="500" />

参考 [this ListView guide](http://android.amberfog.com/?p=296) 了解更多关于列表性能优化的内容，或视频 [this Udacity video on view recycling](https://www.youtube.com/watch?v=2lcoB5-PCCw)

<br>
## ArrayAdapter 的基础使用
***

`ArrayAdapter` 使用非常简单，实例化好 adapter 然后连接到 ListView 中即可。实例代码：

```java
ArrayAdapter<String> itemsAdapter =
    new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, items);
```

`ArrayAdapter` 需要将一个显式的数据类型转换成 `View`（这里为 `String`）和接收３个参数：`context` （activity 实例），XML 布局文件（列表项），和数据数组，这里引用的布局文件 [simple_list_item_1.xml](https://github.com/android/platform_frameworks_base/blob/master/core/res/res/layout/simple_list_item_1.xml) 是一个简单的 `TextView` 数据项。

把上面配置好的 adapter 连接到 `ListView` 中：

```java
ListView listView = (ListView) findViewById(R.id.lvItems);
listView.setAdapter(itemsAdapter);
```

上面代码会自动把数据适配器的数据（字符串）数组通过 `toString` 方法转换成 `TextView`（`ListView` 的列表项）文本([simple_list_item_1.xml](https://github.com/android/platform_frameworks_base/blob/master/core/res/res/layout/simple_list_item_1.xml))， 这是最简单的列表数据实现方式，如果需要更复杂的可以自定义 `ArrayAdapter`。

<br>
## ArrayAdapter 自定义用法
***

当想定制列表项的显式内容（每个不一样），需要为每个列表项定制 XML 布局文件，以及定制相应的`ArrayAdapter`类（数据适配器）。[参考这个例子](https://github.com/codepath/android-custom-array-adapter-demo)，首先，定义一个数据模型（每个列表项对应的数据对象）类：

<br>
### 定义模型类
***

定义一个 `User` 实体类:

```java
public class User {
    public String name;
    public String hometown;

    public User(String name, String hometown) {
       this.name = name;
       this.hometown = hometown;
    }
}
```

现在，通过`ListView`和`ArrayAdapter`就可以将`User`对象转换成列表项的数据了。

<br>
### 创建视图模板
***

下一步，为列表视图创建一个`res/layout/item_user.xml`布局：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
 android:layout_width="match_parent"
 android:layout_height="match_parent" >
    <TextView
      android:id="@+id/tvName"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="Name" />
   <TextView
      android:id="@+id/tvHome"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="HomeTown" />
</LinearLayout>
```

<br>
### 定义数据适配器
***

接着，通过`getView`方法填充列表视图数据：

```java
public class UsersAdapter extends ArrayAdapter<User> {
    public UsersAdapter(Context context, ArrayList<User> users) {
       super(context, 0, users);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
       // 获取指定位置的列表项
       User user = getItem(position);
       // 检查视图是否已创建，没创建则先填充相应的视图控件
       if (convertView == null) {
          convertView = LayoutInflater.from(getContext()).inflate(R.layout.item_user, parent, false);
       }
       // 获取视图对象
       TextView tvName = (TextView) convertView.findViewById(R.id.tvName);
       TextView tvHome = (TextView) convertView.findViewById(R.id.tvHome);
       // 设置视图数据
       tvName.setText(user.name);
       tvHome.setText(user.hometown);
       // 返回视图数据
       return convertView;
   }
}
```

<br>
## 将定义好的 Adapter（数据适配器）连接到 ListView（列表视图控件）
***

```java
// 数据源
ArrayList<User> arrayOfUsers = new ArrayList<User>();
// 数据适配器（将数据源的数据项转换成视图（View）对象）
UsersAdapter adapter = new UsersAdapter(this, arrayOfUsers);
// 将数据适配器连接到 ListView
ListView listView = (ListView) findViewById(R.id.lvItems);
listView.setAdapter(adapter);
```

到此，`User`数组对象就成功绑定到 ListView 视图控件上了。

<br>
## 加载数据到列表视图（ListView）
***

一旦设置好数据适配器后，就可以添加数据到列表视图上了，示例如下：

```java
// 往 adapter 中添加一个用户数据
User newUser = new User("Nathan", "San Diego");
adapter.add(newUser);.
// 通过 Json 或集合的形式一次提添加多个
JSONArray jsonArray = ...;
ArrayList<User> newUsers = User.fromJson(jsonArray)
adapter.addAll(newUsers);
```

有时候，在添加新数据之前，你需要清空之前的数据：

```java
adapter.clear();
```

现在，通过 adapter 可以对 ListView 的数据进行添加、删除、修改了。

<br>
### 通过外部数据构造数据模型
***

通常，在实际开发中，列表视图的数据都是加载外部的数据进行构造（例如：数据库或者 REST JSON API），下面分别为这两种场景定义一个方法用于加载数据：

```java
public class User {
    // 将 JSON 对象转换成 Java 对象
    public User(JSONObject object){
        try {
            this.name = object.getString("name");
            this.hometown = object.getString("hometown");
       } catch (JSONException e) {
            e.printStackTrace();
       }
    }

    // 同时转换多个（JSON 集合）
    public static ArrayList<User> fromJson(JSONArray jsonObjects) {
           ArrayList<User> users = new ArrayList<User>();
           for (int i = 0; i < jsonObjects.length(); i++) {
               try {
                  users.add(new User(jsonObjects.getJSONObject(i)));
               } catch (JSONException e) {
                  e.printStackTrace();
               }
          }
          return users;
    }
}
```

关于 JSON 数据转换的详细介绍可以参考 [Converting JSON to Models](http://guides.codepath.com/android/Converting-JSON-to-Models).

<br>
## Adapter 的事件处理（例如：点击）
***

通过`ListView`，可以非常简单地实现列表项的事件监听 [attach event listeners](http://guides.codepath.com/android/Basic-Event-Listeners#view-event-listeners)：

```java
public class UsersAdapter extends ArrayAdapter<User> {
    // ...
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // ...
      　// 获取视图对象
        Button btButton = (Button) convertView.findViewById(R.id.btButton);
        // 通过 `setTag` 方法将当前列表项的位置缓存起来
        btButton.setTag(position);
        // 监听列表项的点击事件
        btButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int position = (Integer) view.getTag();
                // 获取当前列表项的用户数据
                User user = getItem(position);
                // 拿到数据后，做你想做的...
            }
        });

        // 返回视图数据
        return convertView;
    }
}
```

以上的例子也可以直接将整个用户对象（User）缓存起来：

```java
// 以下代码都在 `getView` 方法中
User user = getItem(position);
// 通过 `setTag` 方法将当前用户对象缓存起来
btButton.setTag(user);
// 监听列表项的点击事件
btButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        // 访问缓存好的用户数据
        User user = (User) view.getTag();
        // 拿到数据后，做你想做的...
    }
});
```

<br>
## 通过 ViewHolder 模式提高列表视图的性能
***

要提高性能，需要使用`ViewHolder`模式修改列表视图的数据适配器（adapter），这种模式可以让`ListView`的数据访问变得更快、更平滑（缓存机制的提高）：

```java
public class UsersAdapter extends ArrayAdapter<User> {

    // 视图缓存对象数据模型
    private static class ViewHolder {
        TextView name;
        TextView home;
    }

    public UsersAdapter(Context context, ArrayList<User> users) {
       super(context, R.layout.item_user, users);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
       // 获取指定位置的列表项数据
       User user = getItem(position);
       // 检查 ViewHolder 是否已创建，没创建则先创建并填充相应的视图数据
       ViewHolder viewHolder; // view lookup cache stored in tag
       if (convertView == null) {
          viewHolder = new ViewHolder();
          LayoutInflater inflater = LayoutInflater.from(getContext());
          convertView = inflater.inflate(R.layout.item_user, parent, false);
          viewHolder.name = (TextView) convertView.findViewById(R.id.tvName);
          viewHolder.home = (TextView) convertView.findViewById(R.id.tvHome);
          // 缓存 viewHolder 对象
          convertView.setTag(viewHolder);
       } else {
           // 获取缓存好的 viewHolder
           viewHolder = (ViewHolder) convertView.getTag();
       }
       // 设置视图数据
       viewHolder.name.setText(user.name);
       viewHolder.home.setText(user.hometown);

       // 返回视图数据到客户端
       return convertView;
   }
}
```

上面的例子 `ViewHolder` 静态类是关键，因为在实际应用中，`findViewById`会导致访问变慢，而如果在adapter中每行列表项都调用`findViewById`的话，数据量一大性能就会出问题。`ViewHolder`模式就是为了解决这个问题，通过`if (convertView == null)`判断是否已经缓存过，没有则通过`setTag()`进行缓存，下次访问就避免再次重复调用用`findViewById`了。

<br>
### Beyond ViewHolders
***

[Customizing Android ListView Rows by Subclassing](http://www.bignerdranch.com/blog/customizing-android-listview-rows-subclassing/) 这篇文章通过相同的策略去提高列表视图的性能，但不需要额外创建 ViewHolder 类。

<br>
## 参考
***

* <http://lucasr.org/2012/04/05/performance-tips-for-androids-listview/>
* <http://www.doubleencore.com/2013/05/layout-inflation-as-intended/>
* <http://www.bignerdranch.com/blog/customizing-android-listview-rows-subclassing/>
