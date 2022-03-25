# js正则表达式

# Javascript中正则表达式的使用

一个正则表达式可以认为是对一种字符片段的特征描述，而它的作用就是从一堆字符串中找出满足条件的子字符串。比如我在JavaScript中定义一个正则表达式：

var reg=/hello/   或者  var reg=new RegExp("hello")

那么这个正则表达式可以用来从一堆字符串中找出 hello 这个单词。而“找出”这个动作，其结果可能是找出第一个hello的位置、用别的字符串替换hello、找出所有hello等等。下面就列举一下JavaScript中可以使用正则表达式的函数，简单介绍一下这些函数的作用，更复杂的用法会在第二部分中介绍。

## String.prototype.search方法

用来找出原字符串中某个子字符串首次出现的index，没有则返回-1

```
"abchello".search(/hello/);  //  3
```

## String.prototype.replace方法

用来替换字符串中的子串

```
"abchello".replace(/hello/,"hi");   //  "abchi"
```

## String.prototype.split方法

用来分割字符串

```
"abchelloasdasdhelloasd".split(/hello/);  //["abc", "asdasd", "asd"]
```

## String.prototype.match方法

用来捕获字符串中的子字符串到一个数组中。默认情况下只捕获一个结果到数组中，正则表达式有”全局捕获“的属性时(定义正则表达式的时候添加参数g)，会捕获所有结果到数组中

```
"abchelloasdasdhelloasd".match(/hello/);  //["hello"]
"abchelloasdasdhelloasd".match(/hello/g);  //["hello","hello"]
```

作为match参数的正则表达式在是否拥有全局属性的情况下，match方法的表现还不一样，这一点会在后边的正则表达式分组中讲到。

## RegExp.prototype.test方法

用来测试字符串中是否含有子字符串

```
/hello/.test("abchello");  // true
```

## RegExp.prototype.exec方法

和字符串的match方法类似，这个方法也是从字符串中捕获满足条件的字符串到数组中，但是也有两个区别。

\1. exec方法一次只能捕获一份子字符串到数组中，无论正则表达式是否有全局属性

```
var reg=/hello/g;
reg.exec("abchelloasdasdhelloasd");   // ["hello"]
```

 

\2. 正则表达式对象(也就是JavaScript中的RegExp对象)有一个lastIndex属性，用来表示下一次从哪个位置开始捕获，每一次执行exec方法后，lastIndex就会往后推，直到找不到匹配的字符返回null，然后又从头开始捕获。 这个属性可以用来遍历捕获字符串中的子串。

```
var reg=/hello/g;
reg.lastIndex; //0
reg.exec("abchelloasdasdhelloasd"); // ["hello"]
reg.lastIndex; //8
reg.exec("abchelloasdasdhelloasd"); // ["hello"]
reg.lastIndex; //19
reg.exec("abchelloasdasdhelloasd"); // null
reg.lastIndex; //0
```