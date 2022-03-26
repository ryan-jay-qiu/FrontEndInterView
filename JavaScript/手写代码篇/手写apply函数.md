手写apply函数

```js
    Function.prototype.Myapply = function(content) {
        content = content || window
        content.fn = this
        var arg = arguments[1] ? arguments[1] : [] //这里时与call唯一的区别多一个判断 因为如果用户没有传入参数arguments[1]就时unidentified下面展开就会报错
        var fh = content.fn(...arg) //所以我们先判断时候是否传入了参数，如果没有传入参数就给一个空数组
        delete content.fn
        return fh
    }
    var foo = {
        value: 1
    };

    function bar(a, b, c) {
        console.log(a, b, c)
        console.log(this.value);
    }

    bar.Myapply(foo, [1, 2, 3]); // 1 2 3 1
```

