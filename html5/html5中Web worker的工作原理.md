# html5中Web worker的工作原理

## 1.什么是 Web worker？

首先我们都清楚JavaScript时一个单线程，因此，许多复杂持续时间较长的计算会阻塞UI线程，HTML5 Web Workers可以让Web应用程序具备后台处理能力。

## 2.web woker的注意事项

Web Workers的限制：

Web Workers不能访问window.document。即不能直接访问Web页面和DOM API。

简而言之，就是允许JavaScript创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。从而，可以用webWorker来处理一些比较耗时的计算。

注意： web worker 脚本位于外部JS文件中，所以无法访问下列HTML相关的JS 对象。

window 对象

document 对象

parent 对象

sessionStorage、localStorage等

只要是HTML的对象都不能访问 比如不能在web worker中使用H5的sessionStorage等。如果使用则报错 sessionStorage is not define 没有定义

## 3.Web worker的用途

通过Web worker可以创建一个不会影响前台处理的后台线程，并在这个线程中创建许多子线程，将耗时较长的处理交给Web worker创建的线程去执行。





## 4.workerAPI的使用

### 1.进行图片的预加载



图片预加载问题分析一般在项目中不会使用worker来预加载图片，而是考虑如何实现懒加载图片，但是基于业务需要所以才使用worker来预加载图片；

加载图片我们有很多方案（不全，如果你还有其他方案希望分享）：

通过操作DOM里面的Img标签来加载图片。

也可以通过js的Image对象来加载。

还可以通过ajax来加载。

通过不断操作DOM来加载图片是最耗费资源也是最慢的一种方案；通过Image对象来加载比较耗内存而且也会占用主线程的资源；把图片加载放在worker里面来加载肯定是最合适的，但是在子线程里不能操作DOM，所以Image对象也不能使用，只能考虑使用ajax来实现了，很庆幸的是不管用哪种方案加载图片都不存在跨域问题。

单独启动一个worker来加载图片，每一次请求回来的数据中都通过postMessage给worker，不多说废话了，直接贴代码：

```js

let w = new Worker("workers.js");
 w.onmessage = function (event) {
   var img = document.createElement("img");
    img.src = window.URL.createObjectURL(event.data);
    document.querySelector('#result').appendChild(img)
    console.log(event.data);
 };
 
 w.onerror = function(e){
     e.currentTarget.terminate();
    console.log('erro: ' + e.message);
}
```



```js
let arr = [图片路径];
for (let i = 0, len = arr.length; i < len; i++) {
    let req = new XMLHttpRequest();
    req.open('GET', arr[i], true);
    req.responseType = "blob";
    req.setRequestHeader("client_type", "DESKTOP_WEB");
    req.onreadystatechange = () => {
      if (req.readyState == 4) {
       postMessage(req.response);
    }
  }
  req.send();
}复制代码
```



总结

- 在worker中使用XMLHttpRequest和在主线程中使用XMLHttpRequest的性能比较，周末特意用node爬了某网站的500多张图片的url来做测试得出以下结论：
  - 在主线程中每启动一个XMLHttpRequest请求都会消耗资源，虽然在请求过程中浏览器另外开了一个线程，但是在交互过程中还是需要消耗主线程资源；而使用worker则不会过多占用主线程，只是启动worker过程时比较耗资源。
  - 大量的XMLHttpRequest请求时，当网速慢时worker中使用XMLHttpRequest和在主线程上使用XMLHttpRequest感受不到阻塞，当网速很快时大量请求返还时会出现卡顿现象。
- 在使用worker的过程中发现，如果worker实列引用为0，该worker空闲后立即会被关闭；如果worker实列引用不为0，该worker空闲也不会被关闭

### 2.进行复杂的计算

前面我们已经了解worker是给我们开辟一个线程，那我们先看下不用worker时运行一个耗时计算所用的时间

```
console.time('1') //console.time方法在进行代码调优的时候给我们很大的帮助  表示开始对1进行计时
    for (var i = 0, sum = 0; i < 9999999; i++) {
        sum += i //对sum进行累加
    }
    console.timeEnd('1') //timeEnd方法会打印代码运行到这里所用时间

```

让我们看输出结果

![image-20220318105716633](C:\Users\qqq\AppData\Roaming\Typora\typora-user-images\image-20220318105716633.png)

可以看出还是非常耗费时间的，那我们使用worker再来测试一下

①创建worker对象，但里面需要传入参数，里面传入的参数是线程运算的js执行文件，这不是一个普通的js文件。

```js
var worker = new Worker('Worker.js')
```



②利用WorkerAPI中的postMessage的方法把需要运算的数据传给worker线程文件去运算。

```html
<div>w.postMessage(10000000)</div>

```

③利用WorkerAPI中的onmessage事件监听

```js
worker.onmessage = function (data) {
    console.log(data.data)
}
```

④再来看一下workerjs执行文件，workerjs执行文件也是需要监听message事件的，然后将结果传递给发送数据的页面。其中workerjs当中的self表示的是worker对象，为什么不用w呢？原因需要看后面的注意点，现在只要记住就行。



```js

self.onmessage = function(data){
 
	var sum = 0;
	for(var i = 0;i < data.data;i++){
		sum += i;
	}
	self.postMessage(sum);	
	

```

测试发现代码代码事件缩短了



