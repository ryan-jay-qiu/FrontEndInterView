# JavaScript的基础知识总结大全

## 1.变量问题

 

var的创建和初始化被提升，赋值不会被提升。

let的创建被提升，初始化和赋值不会被提升。

function的创建、初始化和赋值均会被提升。

只要函数内部用局部变量就不会用外部的变量无论声明哪个位置（因为声明提前）

只要函数的闭包中有局部变量，就不用全局的

所有不带this前缀的都在函数作用域或者闭包中找，匿名函数自调用this指向window

当函数体return函数的时候 return并不会让返回的函数体执行 如果没人接就会自动释放

Typeof 不能判断引用类型都为Object可以判断func



## 2.Event Loop

永远执行在主程序上的代码执行完主程序后的代码在执行异步任务，异步任务按照队列先进先出的原则，promise在异步任务稍微前一点,定时器设置为0也会执行完主程序才执行异步队列

## 3.QuerySelectall和Getelelment的区别

QuerySelectall是非动态集合   效率低返回完整信息

getelelment是动态集合 每次访问都重新查找dom树 但效率高不返回完整信息

## 3.Promise总结

.then()函数里不返回值或者返回的不是promise，那么 下一个then 将会成为接受状态（resolve）

## 4.排序算法

冒泡排序（i=0；i<arr.length-1）(j=0;j<=arr.length-1-i)内层循环每一次少一次

选择排序 每一次循环都会确定一个最大值或最小值放到最后面或者最前面



 



## 5.js的垃圾回收机制

js的内存泄露是指一块被分配的内存，既不能使用，也不能回收，直到浏览器进程结束

垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。

闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

释放内存的方法：赋值为“null

引起内存泄漏的情况：

 

意外的全局变量(在函数内部没有使用var进行声明的变量)

console.log 闭包  对象的循环引用  未清除的计时器   DOM泄露(获取到DOM节点之后，将DOM节点删除，但是没有手动释放变量，拿对应的DOM节点在变量中还可以访问到，就会造成泄露)

 

 

## 6.null和undefined的区别？

null是一个表示”无”的对象，转为数值时为0；undefined是一个表示”无”的原始值，转为数值时为NaN。当声明的变量还未被初始化时，变量的默认值为undefined。

null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。

undefined表示”缺少值”，就是此处应该有一个值，但是还没有定义。典型用法是：

（1）变量被声明了，但没有赋值时，就等于undefined。

（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时，默认返回undefined。

null表示”没有对象”，即该处不应该有值。典型用法是：

（1） 作为函数的参数，表示该函数的参数不是对象。

（2）作为对象原型链的终点。

## 7.闭包的概念

闭包的概念：闭包就是能读取其他函数内部的变量的函数

优点：避免全局污染，希望一个变量长期存储在内存中

缺点：内存泄漏  常驻内存增加内存使用量

使用场景：封装功能时（需要私有的属性和方法）2，给元素伪数组添加书简需要使用元素的索引值 函数防抖函数节流

 

## 8.原型链

原型链是指实例对象和原型之间的链接，js在读取obje的属性的值时会沿着原型链向上寻找，如果没找到undefined找到则返回

原型链对象的__proto__与创建它的构造函数的prototype本质上是同一个东西

__proto__是对象的属性，是站在对象的角度，来讨论其原型对象

prototype是构造函数的属性，是站在构造函数的角度，来讨论其原型对象

构造函数的prototype属性是用来共享方法

每个对象都有一个constructor属性，该属性描述的就是其构造函数。

对象的constructor属性是原型对象提供的，因为每个对象都[链接](https://so.csdn.net/so/search?q=链接&spm=1001.2101.3001.7020)到其原型对象上。

如果想要获取一个对象的构造函数的名字，我们就可以使用constructor属性和name属性

首先每一个构造函数的原型对象身上都有constructor属性指向其构造函数

构造函数中如果return一个引用类型的对象则构造函数失效只返回return后面的对象

 

## 9.浅谈new

New操作符都具体干了什么

\1. 创建一个空对象，并且this变量引用该对象，同时还继承了该函数的原型

\2. 属性和方法被加入到this引用对象中

\3. 新创建的对象由this所引用并且最后隐式的返回this

## 10.ParseInt的注意事项

ParseInt默认出入两个参数，第二个参数代表进制数一般忽略，忽略为10传入0为无效值会被忽略传入10

## 11.Eval是做什么的？

他的功能是把对应的字符串解析成js代码并运行，应该避免用不安全，并且非常耗性能一次解析成js语句一次执行

##  12.作用域链

JavaScript作用域链和原型链很类似，如过这个变量在自己的作用域中没有，那么他会寻找父级的直到最顶层

 

## 13.数组的一些方法总结

### 1.数组的map方法：

Array.map(function（函数名，下标）)不会改变数组会返回和原数组长度一样的新数组传入参数的个数由回调函数的参数个数决定  用于对现有数组的元素加工 想要返回新数组必须return处理好的值   否则返回为unifined

 

数组对象.forEach(function(参数变量名1,参数变量名2，参数变量名3)){做一些操作,forEach是没有返回值,返回值为undefined})

特点callback函数，为数组中每个元素执行的函数，该函数接收三个参数

变量参数名1表示的是数组中的项值(数组当前项的值)

变量参数名2表示的是索引(数组当前项的索引)

变量参数名3表示原数组(数组对象本身)

function circleArea(radius) {   return Math.floor(Math.PI * radius * radius);}let areas = circles.map(circleArea);console.log(areas);



### 2.filter

功能

经过filter函数后会创建一个新的数组, 回调函数返回的结果一个boolean值,若结果为真则返回匹配的项,若为假,则返回一个空数组，它不会改变原有数组,返回的是过滤后的新数组

*
假定有两个对象(A(下面代码中指info),
B(如下languanges)所示,
根据对象A中id值,过滤掉B数组中不符合的数据
（也就是根据某个条件,去抽取出要操作对象中的属性）

*/
var info = {Id:4,content:"JavaScript"}

var languanges = [
{Id:4,content:"Angular4"},
{Id:2,content:"Vue.js",author:"尤大大"},
{Id:3,content:"Node.js"},
{Id:4,content:"React.js"}

]

var filterFun = function(info,languanges){
return languanges.filter(function(laguange){
return laguange.Id === info.Id;
})
}
console.log(filterFun(info,languanges));//会挑选出languanges数组符合id等于4的选项,如果你想取对象中某个值,支持链式调用,直接跟着map或者forEach即可

### 3.find

功能:

用来查找目标元素,若找到就返回该元素，若找不到就返回undefined，同样不会改变原有数组 写法 数组.find(callback(参数1,参数2,参数3)

callback同样接受三个参数

第一个参数1表示的是当前遍历到的元素，

第二个参数2表示的是,每一次迭代查找的数组元素的索引

第三个参数3表示的是原操作数组

特点

找到第一个符合条件之后,就不会往后找了,这与filter过滤是不一样的，find方法比较快速便捷

返回值:若匿名回调函数结果为真,则返回所匹配的选项对象,若为假,则返回undefined

// Es6中的find方法,找到第一个符合条件之后的就不会往后在找了
var learnWebs = [
{name:"segmentdefault"},
{name:"MDN"},
{name:"stackoverflow"},
{name:"v2ex"},
{name:"w3cplus"},
{name:"segmentdefault"}
]
newWebs = learnWebs.find(function(learnWeb,index,orginArrs){
return learnWeb.name ==="segmentdefault";
})
console.log(newWebs);

下面是find方法使用图解，只要迭代器函数中找到匹配项了,就不会往下找了,结果为真就会返回所匹配选项对象的那一项,若结果为假,则返回undefined

 

### 4.总结

以上的forEach,map,filter,find,方法都是不改变原有数组的,当然还有every,some等一些方法,forEach方法没有返回值，默认返回值为undefined,所以它不支持链式调用，而map,filter方法会返回一个新的数组

### 5.Arr.join

不改变原数组返回指定字符串链接的数组

### 6.Arr.cancat（）

拼接多个数组原数组不变返回拼接后数组

### 7.Arr.slice

（开始位置1，结束位置2）截取数组没有参数会对数组进行浅拷贝，有参数会返回新数组，结束位置省略则从开始位置截取完

### 8.Arr.splice（开始，个数，添加新数据）

如果只有一个值则从开始位置截取完，如果指定个数则截取指定个数数组，如果有第三个值在开始位置添加新值

find方法返回的根据迭代器函数结果boolean值，若结果为真则返回指定的元素，若无则返回undefined

而改变原有数组的有:增加(push,unshift),删除(pop，shift),reverse(颠倒),sort(排序)，splice,

##  14.深拷贝和浅拷贝

(1)深拷贝和浅拷贝针对的是引用类型。基本类型的名值存储在栈中，当复制时，栈内存会开辟一个栈内存。所以二者修改时，彼此不会影响。

(2)浅拷贝复制的是指向对象的指针，并没有开辟新的栈内存，原对象和新对象还是共享同一块内存，修改新对象自然会影响原对象。

深拷贝和浅拷贝是引用类型数据上的概念，基本数据类型没有

 

浅拷贝：Object.assign（目标对象，源对象）用于一层的浅拷贝将后面的元素追加到目标对象并返回目标对象，并且会改变目标对象

深拷贝：Object.josn.parse（josn.stringify）

遍历赋值  3.jq中的extend（）

## 15.数组扁平化 

1.如果都为数字可以利用tostring和split 分割为数组

 

 

## 16.Apply bind call的不同

Apply（函数,[参数1,参数2....]）

Bind（函数,参数1,参数2....）

Call（函数,参数1,参数2....）（）

都是改变函数内部的this指向传值方式不同其中bind和call用法一直只不过call是返回一个函数需要进行调用才能执行，所以在需要改变this指向但不需要立即执行的用bind

 

 

## 17.解释什么是Json

(1)JSON 是一种轻量级的数据交换格式。

(2)JSON 独立于语言和平台，JSON 解析器和 JSON 库支持许多不同的编程语言。

(3)JSON的语法表示三种类型值，简单值(字符串，数值，布尔值，null),数组，对象

 

## 18.什么是函数柯里化

函数柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

## 19.函数防抖

当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。

function debounce(fn, wait) { 

 var timeout = null; 

 return function() { 

 if(timeout !== null) clearTimeout(timeout);      

 timeout = setTimeout(fn, wait); 

 } 

} 

// 处理函数 

function handle() {    

 console.log(Math.random()); 

} 

// 滚动事件

window.addEventListener('scroll', debounce(handle, 1000)); 

 

 

 

 

 

 

 

 

 

 

 

## 20.函数节流（throttle）：

当持续触发事件时，保证一定时间段内只调用一次事件处理函数。

var throttle =function(func, delay) { 

 var prev = Date.now(); 

 return function() { 

 var context = this;

 var args = arguments; 

 var now = Date.now(); 

 if (now - prev >= delay) { 

  func.apply(context, args);              

  prev = Date.now();

 } 

 } 

}

function handle() {        

 console.log(Math.random()); 

}     

window.addEventListener('scroll', throttle(handle, 1000)); 

 

 

## 21.什么是虚拟DOM

文档对象模型或 DOM 定义了一个接口，该接口允许 JavaScript 之类的语言访问和操作 HTML 文档。元素由树中的节点表示，并且接口允许我们操纵它们。但是此接口需要付出代价，大量非常频繁的 DOM 操作会使页面速度变慢。

 

vue 通过在内存中实现文档结构的虚拟表示来解决此问题，其中虚拟节点（VNode）表示 DOM 树中的节点。当需要操纵时，可以在虚拟 DOM的 内存中执行计算和操作，而不是在真实 DOM 上进行操纵。这自然会更快，并且允许虚拟 DOM 算法计算出最优化的方式来更新实际 DOM 结构。

 

一旦计算出，就将其应用于实际的 DOM 树，这就提高了性能，这就是为什么基于虚拟 DOM 的框架（例如 vue 和 react）如此突出的原因。

 

## 22.Ajax使用

所谓异步，就是向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验。



```js
//创建Ajax的过程：

//\1) 创建XMLHttpRequest对象（异步调用对象）

 

var xhr = new XMLHttpRequest();

//\2) 创建新的Http请求（方法、URL、是否异步）

 

xhr.open(‘get’,’example.php’,false);

//\3) 设置响应HTTP请求状态变化的函数。

//onreadystatechange事件中readyState属性等于4。响应的HTTP状态为200(OK)或者304(Not Modified)。

//\4) 发送http请求

 

xhr.send(data);

//\5) 获取异步调用返回的数据
```

注意：

\1) 页面初次加载时，尽量在web服务器一次性输出所有相关的数据，只在页面加载完成之后，用户进行操作时采用ajax进行交互。

\2) 同步ajax在IE上会产生页面假死的问题。所以建议采用异步ajax。

\3) 尽量减少ajax请求次数

\4) ajax安全问题，对于敏感数据在服务器端处理，避免在客户端处理过滤。对于关键业务逻辑代码也必须放在服务器端处理。

## 23.手写自己的Ajax

```js
function ajax() {

//创建一个 XHR 对象

	let oAjax = window.XMLHttpRequest ? (new XMLHttpRequest()) : (new window.ActiveXobject('Microsoft.XMLHTTP'));

	//返回一个函数，这是函数柯里化操作，不用每次调用 ajax 都判断浏览器环境

	//但是会占用更多的内存，因为总是会保存外部函数的作用域

	return function(url, fnSucc, fnFaild) {

		//只要 XHR 对象的 readyState 属性的值发生改变，就触发这个事件

		oAjax.onreadystatechange = function() {

			// readyState 属性是 0-4 的值，当为 4 时，表示已经接收到全部响应数据，并可以在客户端使用
			if (oAjax.readyState === 4) {
				//响应的 HTTP 状态

				let s = oAjax.status;

				if (s === 200 || s === 206 || s === 304) {

				//将响应主体被返回的文本作为参数传给这个函数，并执行这个函数

					if (fnSucc) fnSucc(oAjax.responseText);

				} else {

					if (fnFaild) fnFaild(oAjax.status);

				}

			}

		};

		//启动一个请求，准备发送

		oAjax.open('GET', url, true);

		//发送请求
		oAjax.send(null);

	}

}

 

 
```

## 24.ajax请求的时候get 和post方式的区别

最直观的区别就是GET把参数包含在URL中，POST通过request body传递参数。

GET在浏览器回退时是无害的，而POST会再次提交请求。

GET产生的URL地址可以被Bookmark，而POST不可以。

GET请求会被浏览器主动cache，而POST不会，除非手动设置。

GET请求只能进行url编码，而POST支持多种编码方式。

GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。

GET请求在URL中传送的参数是有长度限制的，而POST么有。

对参数的数据类型，GET只接受ASCII字符，而POST没有限制。

GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。

GET参数通过URL传递，POST放在Request body中。

 

 

## 25.document.write和innerHTML的区别

document.write 将内容写入页面，清空替换掉原来的内容，会导致重绘

document.innerHTML 将内容写入某个Dom节点，不会重绘

 

 

document.documentElement.scrollTop获取当前页面距离顶部滚动的距离

 

 

## 26.数组的一些增删方法

pop：删除并返回数组最后一个元素（改变原数组）； 

push：返回添加完成后的数组的长度（改变原数组）； 

shift：移除并返回数组的第一个元素（改变原数组）； 

unshift:在数组头部插入一个元素 

slice：slice(下标，个数)返回裁剪后的数组（不改变原数组）； 

splice：插入，删除或替换数组的元素 

concat：合并数组返回组合数组（不改变原数组）； 

join：将数组用标识符链接成字符串返回拼接好的字符串（不改变原数组）； 

reverse：翻转数组（改变原数组）； 

toString:将数组转换成一个字符串； 

split：把字符串分割开，以数组方式储存； 

forEach：主要用于遍历数组； 

every：主要用于检查数组中每个元素是否符合函数的条件，如果其中有一个不符合，则返回false； 

indexOf：主要用于在数组中查找元素，并把元素的位置返回来。

## 27.巧妙地交换变量

a=a+b

b=a-b

a=a-b

 