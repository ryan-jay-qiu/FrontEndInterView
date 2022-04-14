# 手写instanceof

```js
        function instanceofs(p, target) { //实际上就是一个链表
            while (p) {
                if (p === target.prototype) {
                    return true
                }
                p = p.__proto__
            }
            return false
        }
        console.log(instanceofs([1, 3], Function))
```

