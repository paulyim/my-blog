{:title "Android - 术语剖析 - sp（Scale-Independent Pixel）（与比例无关的像素）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

**与比例无关的像素**（sp）是用于指定字体类型大小的长度单位。其长度取决于用户的字体大小首选项。该首选项在 Android 设备的“设置”应用中设置。
<br>
<br>
为尊重用户的首选项,应使用与比例无关的像素指定所有字体大小。应在 **与设备无关的像素**（dp）中给定所有其他尺寸。

<br>
## 代码示例
***

```
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:padding="8dp"
    android:textSize="20sp"
    android:text="Hello"/>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-sp.png" width="905"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
