const ws = require('ws')
const experss = require('express')
const app = experss()
app.use('/', experss.static('./public'))
var Wbs = new ws.Server({ host: '127.0.0.1', port: '8080' }, () => {
        console.log('成功')
    }) //创建服务器
var clients = [] //连接的客户端
var ulits = [] //用于保存用户的名字
Wbs.on('connection', (client) => { //服务器监听客户端连接服务器的事件
    console.log('连接成功')
    clients.push(client) //把这个客户端保存在一个数组中
    client.on('message', (msg) => { //监听这个客户端发送的消息
        var msg = JSON.parse(msg)
        if (msg.text) { //如果发送msg对象有text属性那么给列表上所有的客户端进行广播
            for (var i = 0; i < clients.length; i++) {
                clients[i].send(JSON.stringify(msg))
            }
        } else { //如果msg对象没有text属性就代表又新人加入聊天室，把新人的名字进行广播
            ulits.push(msg)
            for (var i = 0; i < clients.length; i++) {
                clients[i].send(JSON.stringify(ulits))
            }
        }
    })
    client.on('close', () => { //监听客户端断开连接
        for (var i = 0; i < clients.length; i++) {
            if (client == clients[i]) { //确定是客户端断开的连接在存入数组中的位置，进行删除
                clients.splice(i, 1)
                ulits.splice(i, 1) //以及删除他的信息
                break //若找到直接跳出循环，有利于程序优化
            }
        }
        for (var j = 0; j < clients.length; j++) {
            clients[j].send(JSON.stringify(ulits)) //最后把最新的用户列表广播所有客户端
        }
    })
})
app.listen('8090', () => {
    console.log('app启动成功')
})