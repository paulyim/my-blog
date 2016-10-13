{:title "Android - 术语剖析 - Hexadecimal Color (Hex Color)（十六进制颜色）"
 :layout :post
 :tags  ["android"]
 :toc true}

<br>
***
<br>

## 概述
***

通过按红、绿、蓝顺序将颜色混合到一起可创建各种颜色。写入井号（#），然后使用一对“十六进制数字”指定各成分的量。00 是最小量，FF 是最大量，80 是中间量。
<br>
<br>
使用以上三个数值创建颜色后，请访问[材料设计网站](http://www.google.com/design/spec/style/color.html#color-color-palette)体验更多微妙的调色。

<br>
## 代码示例
***

```
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#FF0000"
        android:text="FF0000 Red"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#FF8000"
        android:text="FF8000 Orange"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#FFFF00"
        android:text="FFFF00 Yellow"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#00FF00"
        android:text="00FF00 Green"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#0000FF"
        android:textColor="#FFFFFF"
        android:text="0000FF Blue"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#FF00FF"
        android:text="FF00FF Purple"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#FFFFFF"
        android:text="FFFFFF White"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#808080"
        android:text="808080 Gray"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#000000"
        android:textColor="#FFFFFF"
        android:text="000000 Black"/>
</LinearLayout>
```

<img src="http://oem503hzx.bkt.clouddn.com/Android-for-All-Hexadecima-Colorl.png" width="600"/>

<br>
## 参考
***

[Android for All](https://developers.google.com/android/for-all/vocab-words/)（访问请自备梯子）
