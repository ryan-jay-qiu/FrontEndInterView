# 手写call函数

```js
<script>
    Function.prototype.Mycall = function(content) {
        content = content || window //利用或运算符特性如果第一个为真那么就不会计算第二个
        content.fn = this //把要改变this的函数挂到目标函数的一个属性上，那么根据this指向规则，谁调用的这个函数那么这个函数内部的this就指向谁
        var arg = [...arguments].slice(1) //获取参数
        const result = content.fn(...arg) //调用函数并把参数传递过去，把函数返回值保存下来
        delete content.fn //把挂在这个函数的属性删掉
        return result //返回函数返回值
    }

    function aa() {
        console.log(this.a)
        return 56
    }

    var bb = {
        a: 1,
        b: 2
    }

    console.log(aa.Mycall(bb))
    var foo = {
        value: 1
    };

    function bar() {
        console.log(this.value);
    }

    bar.Mycall(foo); // 1
</script>
```

