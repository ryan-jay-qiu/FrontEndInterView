# vue组件子向父传值

简单说明一下思路，虽然很绕但很好理解，多琢磨几次，
子传父通过事件方法来传值，首先在子组件定义一个方法，当方法执行的时候调用this.$emit('自定义的方法名'，'要给父组件的值')的方法来提交值，在通过父组件中的子组件通过v-on或者@来绑定刚才的方法，当这个方法执行的时候后面会触发另外一个方法，在这个方法中的第一个参数就是传过来的值，然后可以处理这个值

1.子组件绑定一个事件，通过 this.$emit() 来触发

在子组件中绑定一个事件，并给这个事件定义一个函数

```vue
// 子组件
<button @click="changeParentName">改变父组件的name</button>

export default {
    methods: {
        //子组件的事件
        changeParentName: function() {
            this.$emit('handleChange', 'Jack') // 触发父组件中handleChange事件并传参Jack
            // 注：此处事件名称与父组件中绑定的事件名称要一致
        }
    }
}
```

在父组件中定义并绑定 handleChange 事件

```vue
// 父组件
<child @handleChange="changeName"></child>

methods: {
    changeName(name) {  // name形参是子组件中传入的值Jack
        this.name = name
    }
}
```

