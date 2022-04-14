# reduce函数用法

```js
    let arr = ['name','job','long','big','job','long','big','name','name','big']
    let result = arr.reduce((pre,cur) =>{ //reduce函数不会改变数组，返回一个新数组。第一个参数为一个函数接受两个参数第一个是累加器第二个是数组中的元素
        if(pre[cur]){ //，第二个参数是累加器的初始值,若省略第二个默认值参数则把数组的第一个元素当作初始值并从第二个元素开始迭代
            pre[cur]++
        }else{
            pre[cur] = 1
        }
        return pre //主要这里的return返回，这里返回的是下一次pre的值
    },{})
    console.log(result)
```

