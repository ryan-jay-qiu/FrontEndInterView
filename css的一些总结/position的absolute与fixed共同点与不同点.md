# position的absolute与fixed共同点与不同点

A：共同点：

1.改变行内元素的呈现方式，display被置为block；

2.让元素脱离普通流，不占据空间；

3.默认会覆盖到非定位元素上

 

B不同点：

absolute的”根元素“是可以设置的，而fixed的”根元素“固定为浏览器窗口。

当你滚动网页，fixed元素与浏览器窗口之间的距离是不变的。  