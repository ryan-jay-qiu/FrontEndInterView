# Promise解决回调地狱

## 1.概述

回调地狱一直是令人头疼的问题，回调地狱使得代码非常的繁琐。想要拯救出回调地狱的代码，只能用ES6的Promise。

Promise在执行过程中，Promise会出初始化状态为Pending，一旦有了变化就会修改状态。


异步执行成功的状态是 Fulfilled , 这就是承诺给你的结果。状态修改后，会调用成功的回调函数 onFulfilled 来将异步结果返回。



异步执行成功的状态是 Rejected，这就是承诺给你的结果。然后调用 onRejected 说明失败的原因（异常接管）。



Promise在我们的开发中发挥着重要作用我们没有Promise的时候向服务器请求数据代码很繁琐，有时候因为前后的数据有依赖，就必须等第一个请求的结果回来之后再进行请求，然后第二次的请求必须放在第一次请求成功的回调函数中，多层的依赖调用就会一直放在上一级的回调函数中，这就造成了回调地狱，而Promise能很好的解决这一问题

## 2.通过手写带有Promise的ajax去理解

话不多说，直接上例子。

让我们手写一个带有Promise的ajax的异步请求封装

```js
function myAjax(Myurl) {
    return new Promise (function(resolve,reject){
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if(this.readyState == 4) //readyState共有5个状态值其中4表示响应内容解析完成，可以在客户端调用了
{
    if(this.status == 200){ //判断服务器是否正常返回内容
        resolve(this.responseText) //打开开关将服务器返回来的数据放行
    }else {
        reject (new Error()) //如果没返回200状态码说明没有正确调用抛出错误
    }
}
}
xhr.open('get',Myurl)   //创建请求
xhr.send() //发送请求
    })
}
```

如果返回的结果后，需要利用本次的结果再次请求数据，可记得一定要进行.then的链式调用，不然在then中直接发起下一次请求，又是回调地狱了





## 3.Promise的误区

```js

// Promise 误区
myAjax('./d1.json').then(data=>{
    console.log(data);
    myAjax('./d2.json').then(data=>{
        console.log(data)
        // 回调地狱
    })
})
```

如果还是这样调用说明，对Promise没有形成正确的理解，

正确的做法应该如下



```js
    //Promise正确做法
        myAjax('./d2.json').then(data=>{
            console.log(data)
            return myAjax('./d3.json')  返回一个promise对象
        })
    .then(data=>{
            console.log(data) //输出上一次的结果
          
            return myAjax('./d4.json')
        })
    .then(data=>{
            console.log(data)
          
        }) //进行链式调用
```

## 4.总结

这样终于逃脱了回调地狱，使代码简介，增加了可读性



虽然我们脱离了回调地狱，但是 .then 的链式调用依然不太友好。



频繁的 .then 并不符合自然的运行逻辑，Promise 的写法只是回调函数的改进，使用then 方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。



Promise 的最大问题是代码冗余。原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆 then，原来的语义变得很不清楚。



于是，在 Promise 的基础上，Async 函数出现了。