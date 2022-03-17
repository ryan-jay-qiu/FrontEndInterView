# 一、什么是Promise？

Promise是JavaScript的一个对象用于生成在将来产生结果的值，值可以是已经解析的值也可以是说明为什么未解析该值的原因。

> promise出现的目的一为处理JavaScript里的异步，再就是避免回调地狱。

## 1.Promise的几种状态

先手我们应该清楚Promise有三中状态分别是：

pending：Promise的初始状态，既不成功也不失败。

resolved：已经解决，意味着操作完全成功。

rejected：表示问题为解决，意味着操作失败。



一个pengding状态的Promise对象在完成操作成功后能返回一个值，但如果失败的话会带回一个错误值返回，当一个Promise的任意一个操作完成改变后处理函数会排队执行在Promise的原型上的then方法。



resolve和reject分别是Promise内部定义的两个函数，在回调函数中调用时，会改变promise实例的状态，resolve状态会变为成功，而reject状态会变为失败



## 2.promise的链式调用

promise的 then 方法之后会继续返回一个promise对象，使用then方法之后会返回一个promise对象，可以继续用then方法调用，再次调用所获取的参数是上个then方法return的内容

例子如下：

手写简易Promise



## 3.Promise的状态

Promise的状态只能由其包裹的异步操作的结果来决定，且什么样的结果决定什么样的状态是自己的编程逻辑决定，而非固定,可以看出来Promise对象是一个很倔强的对象，这也是Promise对象名字的来历，其英文单词的意思为“承诺”。
 Promise对象的状态一旦改变，就将定性在此，不会发生二次改变，并且我们可以放心的在任何时候拿到这个结果并使用。这便是Promise相对于事件的优势，假如我们在事件方法中设定了回调函数，只要是错过了这个事件，即使是再去监听也是得不到结果的，而Promise可以在任何时候拿到结果。

