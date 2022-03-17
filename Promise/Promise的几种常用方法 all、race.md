# Promise的几种常用方法

Promise作为ES6最重要的特性之一，我们有必要掌握并理解透彻

让我们来直接打印出来Promise看下，console.dir(Promise)

![image-20220317105336745](https://github.com/Coolboyzzzzz/FrontEndInterView/blob/main/%E8%BD%AE%E6%92%AD%E5%9B%BE/small001309ZlXg61645719189.jpg?raw=true)



其实Promise时一个构造函数，自己的身上定义这all、race、reject、resolve这几个常用的方法，Promise的原型对象上有.then、catch、finally等同样的眼熟方法，那么利用new Promise后的对象也会有这些方法（原型链）

## 1.Promise.all方法

其中all方法在实际开发环境中有很大的用处，all的参数能收一个数组，这里面的每一项异步操作都是并发执行的，等待执行then的时间为数组中的最长时间的一个异步操作时间，等都完成后才会进入.then里面。

其中异步操作返回的数据都在then里面，all会把所有的异步操作结果放进对应位置的数组中并传入zhen

如图所示：



![image-20220317120936086](C:\Users\qqq\AppData\Roaming\Typora\typora-user-images\image-20220317120936086.png)

代码如下：

```js
<script>
    function Promise1() {
        return new Promise(function(resolve, reject) {//返回promise对象
            //做一些异步操作，模拟数据请求
            setTimeout(function() {
                console.log('我是任务一')
                resolve('我是任务一')
            }, 3000)
        });
    }

    function Promise2() {
        return new Promise(function(resolve, reject) {//返回Promise对象
            //做一些异步操作，做一些异步操作，模拟数据请求
            setTimeout(setTimeout(function() {
                console.log('我是任务二')
                resolve('我是任务二')
            }, 4000))
        });
    }

    function Promise3() {
        return new Promise(function(resolve, reject) { //返回Promise对象
            //做一些异步操作，做一些异步操作，模拟数据请求
            setTimeout(setTimeout(function() {
                console.log('我是任务三')
                resolve('我是任务三')
            }, 2000))
        });
    }

    Promise.all([Promise1(), Promise2(), Promise3()]).then(
        function(result) {
            console.log(result)
        }// 注意数组中的参数应该是Promise对象，all方法都进行并发的执行

    )
</script>
```



由图可见，Promise的all方法会让所有的异步操作并发进行并把结果以数组的形式返回一个新数组。

在实际的项目开发中，all方法可以把没有相互依赖请求用all进行并发的请求会极大的使我们响应数据更加的低延迟。



## 2.Promise.race方法

race方法和all方法用法一样，all方法实际上的效果是（以最慢的那个为准，执行回调），而race方法和all方法相反（以最快的那个为准，执行回调）

race这个单词就是赛跑的意思。

让我们把上面的代码修改下，代码如下：



```js
  Promise.race([Promise1(), Promise2(), Promise3()]).then(
        function(result) {
            console.log(result)
        }

    )
```

返回的结果：

![image-20220317152232206](C:\Users\qqq\AppData\Roaming\Typora\typora-user-images\image-20220317152232206.png)



从上面的函数代码我们知道任务三的延迟最小。在race方法中果然先暑促任务三，然后直接执行回调根本没有等待后面两个，执行完回调剩下的两个才陆续地执行完，需要注意的时函数返回的结果只有最快的一个

其实race函数的作用使用场景也有很多，如我们可以让我们真实的异步请求和用延时器模拟的异步请求赛跑，并给延时器设置相应的时间，并给他设置上一个reject失败的开关。如果延迟器跑过了真实的异步请求说明异步请求延迟太大了，图片请求超时。

代码如下





```js
<script>
    function reqimg() {
        return new Promise(function(resolve, reject) {
            var img = new Image() //利用new Image()创建一个Image的dom元素
            img.onload = function() { //利用img的onload方法来监听img的src属性时候加载成功，
                //img的onload事件只在图片的src资源请求成功的时候触发
                resolve(img) //如果图片的src属性加载成功则打开成功的开关
                document.body.appendChild(img) //在body中追加一个子节点img，用于把照片显示在网页上
            }
            img.src = '*'
        })
    }

    function timeout(timeout) {
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                reject('图片请求超时')
            }, timeout);
        })
    }

    Promise.race([reqimg(), timeout(5000)]).then(function(result) {
            console.log(result)
        },
        function(err) {
            console.log(err)

        } //需要注意的时then后面如果有第二个参数则这个参数时reject的回调，
        //当然也可以用catch捕获，
        //但是在then加了第二个参数加了回调函数，和在catch中加了错误的回调函数则then会覆盖catch相当于没写
    )
</script>
```





运行结果如下

![image-20220317162011202](C:\Users\qqq\AppData\Roaming\Typora\typora-user-images\image-20220317162011202.png)

首先timeout函数是一个延时5秒的异步操作。我们把这两个返回Promise对象的函数放进race，于是他俩就会赛跑，如果5秒之内图片请求成功了，那么遍进入then方法，执行正常的流程。如果5秒钟图片还未成功返回，那么timeout就跑赢了，timeout函数就会执行完毕并进入then提醒加载超时



其次图片没有加载成功，然后onload事件就不会触发，resolve的开关就不会放行这个Promise的状态一直处于Pending状态，而timeout会打开reject开关进入then



## 3.reject的用法



reject的作用就是把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。

因为reject时最基本的方法，这里就不过多的叙述了



## 4.resolve的用法

reject的作用就是把Promise的状态置为resolved，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。

