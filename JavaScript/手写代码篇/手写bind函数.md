# 手写bind函数

```html
<script>
    Function.prototype.Mybind = function(content) {
        content = JSON.parse(JSON.stringify(content)) || window //对传入的函数进行深拷贝，防止在没有执行函数的时候传入的content修改的情况
        content.fn = this
        var arg = [...arguments].slice(1)
        return function() { //需要注意的时bind返回的是一个函数所以我们必须使用闭包
            var args = arg.concat(Array.from(arguments)) //bind函数需要合并两次传入的参数
            return content.fn(...args)
        }
    }
    var foo = {
        value: 1
    };
    function bar(a, b, c) {
        console.log(a, b, c)
        console.log(this.value);
    }

    bar.Mybind(foo)(); //undefined undefined undefined 1
    bar.Mybind(foo, 1, 2)(3); // 1 2 3 1
</script>
```




