# WebSocket

## 1.什么是WebSocket？



WebSocket是html5提供的一种在单个TCP连接上进行全双工的双向通信协议，浏览器和服务器只需要完成一次的连接，两者就可以创建一个持久的连接，解决了客户端和服务端之间的实时通信问题。



## 2.WebSocket的优点



以前没有WebSocket的时候很多网站为了实现数据推送，都用ajax进行频繁的请求和拉取数据，造成占用大量的带宽和服务器资源。现在有了WebSocket，使用WebSocket建立连接后服务器可以主动给客户端传递数据，跟够更好的节省低带宽和资源。实现更实时的通讯。



## 3.WebSocket的属性



readyState：只读属性

0： 表示连接尚未建立

1：连接已建立，可以通信

2： 表示连接正在进行关闭

3： 表示连接已经关闭或者连接不能打开



## 4.WebSocket的方法



send方法：

使用连接发送数据



close方法：

关闭连接



## 5.WebSocket的实例

　　WebSocket协议本质上是一个基于TCP的协议，为了建立一个WebSocket连接，浏览器需要向服务器发起一个HTTP请求，这个请求和普通的HTTP请求不同，它包含了一些附加头信息，服务器解析这些附加头信息后产生应答信息返回给客户端，客户端和服务端的WebSocket连接就建立起来了，双方可以通过连接通道自由的传递信息，并且这个连接会持续存在直到客户端或服务端某一方主动关闭连接。



```js

var ws = new WebSocket("ws://localhost:8080"); 
//申请一个WebSocket对象，参数是服务端地址，同http协议使用http://开头一样，WebSocket协议的url使用ws://开头，另外安全的WebSocket协议使用wss://开头
ws.onopen = function(){
　　//当WebSocket创建成功时，触发onopen事件
   console.log("open");
　　ws.send("hello"); //将消息发送到服务端
}
ws.onmessage = function(e){
　　//当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
　　console.log(e.data);
}
ws.onclose = function(e){
　　//当客户端收到服务端发送的关闭连接请求时，触发onclose事件
　　console.log("close");
}
ws.onerror = function(e){
　　//如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
　　console.log(error);
}

```



这是客户端的代码，我们还需要写一个服务端

```js
    //搭建ws服务器
    const WebSocket = require('ws');
    const WebSocketServer = require('ws').Server;
    const wss = new WebSocketServer({
        port: 8080
    });
    //有客户端连接时
    wss.on('connection', (ws) => {
        //收到客户端发的消息时
        ws.on('message', (message) => {
            ws.send("给客户端发消息")
        })
    })
```

运行结果如下



![image-20220318164307267](C:\Users\qqq\AppData\Roaming\Typora\typora-user-images\image-20220318164307267.png)



刚刚在调试这些代码的时候一直错误不知道哪里出了问题，然后莫名奇妙的又好了。

这个在做实时聊天室很方便，改天利用ws写一个多人聊天室

现在就先这样吧。