###### 让我们来手写一个简易的Promise



```js
<script>
    function Mypromise(task) {
        var _this = this //利用闭包保存当前变量不被污染
        this.status = 'pending' //status表示一种状态
        this.value = undefined //用来存储交给then函数的值
// 首先定义两个函数体resolve和reject里面分别处理成功时和失败时的业务逻辑
        function resolve(value) {
            if (_this.status === 'pending') {
                _this.value = value  //利用闭包原理如果一个函数的内部还有函数并且调用了外部函数的内部变量则形成闭包外层函数的局部变量会常驻内存缺点的造成内存泄漏
                _this.status = 'resolve'
            }
        } //如果用户调用resolve函数表示打开成功开关并把value传给then函数

        function reject(value) {
            if (_this.status === 'pending')
                _this.value = value
            _this.status = 'reject'
        } //如果用户调用reject函数表示打开失败开关并把value传给then函数


        try {
            task(resolve, reject) //在new之后传入的函数就是要你执行函数体内容，所以函数首先执行传进来的函数体，并把构造函数的两个已经定义好的函数以参数传入进去（函数作为形参传入的时地址指针）
            //用户在函数体里面可以分别处理正确时的业务逻辑则调用成功的开关reject，失败则调用reject的开关
        } catch (e) {
            reject(e)
        } //  promise传入的函数一般在调用时都用try catch进行 用于来捕获错误自动执行reject 
    }
    Mypromise.prototype.then = function(resolve, reject) {
        if (this.status == 'resolve') {
            resolve(this.value)  //判断用户打开的是否为成功的开关
        }
        if (this.status == 'reject') {
            reject(this.value)//判断用户打开的是否为成功的开关
        }

    }

    //进行Promise测试
    function fun(value) {
        return new Mypromise((resolve, reject) => {
            console.log(`${value}开始`)
            resolve('return resolve');
        }).then(data => {
            console.log(`success${data}`);
        }, err => {
            console.log(`err${data}`);
        })

    }

    fun('Promise')
</script>

</html>
```

