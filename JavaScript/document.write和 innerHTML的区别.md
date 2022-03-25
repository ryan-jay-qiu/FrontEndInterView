# document.write和 innerHTML的区别

document.write会使文档重排和重绘 并清空页面上的所有元素只剩下body

`innerHTML`则是DOM页面元素的一个属性，代表该元素的html内容。如果需要修改，不会导致页面全部重绘。

