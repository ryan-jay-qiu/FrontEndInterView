# vue的插槽的理解与使用

## 1.什么是插槽？

插槽就是子组件中的提供给父组件使用的一个占位符，用<slot></slot> 表示，父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的<slot></slot>标签。

需要注意的是父组件向子组件里面传值



 在子组件中放一个占位符



 在父组件中给这个占位符填充内容



## 2.插槽的种类

### ①普通插槽

Vue想尽办法把父组件的内容传给子组件。不仅组件传参，也可以通过插槽来传递。通过插槽更方便传递虚拟DOM。父组件向子组件优雅地传递dom结构。

默认插槽的传递入口在放在父组件的子组件标签之间，默认插槽的数据传递出口在子组件的slot标签位置。



```html

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>默认插槽</title>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            {{message}}
            <tode-item>这是一个默认插槽<h3>这是标签h3</h3></tode-item>
        </div>
    </body>
    <script type="text/javascript">　　　　//子组件
        Vue.component('tode-item', {
            template: `<div>
                <slot>这里面是slot的默认值</slot>//当引入组件的地方没有写插槽内容，将显示子组件插槽中默认的值，如果没有默认值也没用写插槽内容，则插槽内容为空。
            </div>`
        });
        var app = new Vue({
            el: "#app",
            data: {
                message: 'hello world!'
            }
        });
</script>
</html>
```

执行结果 hello world!

​				这是一个默认插槽

​				这是标签h3

注意：子组件里面slot有值就是默认值

### ②具名插槽

父组件如果要需要在子组件中传入多个DOM，这些DOM都需要通过**标识**在子组件找到对应的出口。



```html
<!DOCTYPE html>
<html>
   <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>具名插槽</title>
       <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   </head>
   <body>
       <div id="app">
           这是2.60版本后使用v-slot引入插槽名称
           <my-component>
               <template v-slot:first>nihao</template>
               <template v-slot:last>hi</template>
           </my-component>
           <!-- 这是具名插槽缩写方案 v-slot:缩写为 # -->
           <my-component>
               <template #first>nihao</template>
               <template #last>hi</template>
           </my-component>
       </div>
   </body>
   <script type="text/javascript">
       Vue.component('my-component',{
           template: `
           <div>
               <h4>这是第一个具名插槽</h4>
               <slot name='first'></slot>
               <h4>这是第二个具名插槽</h4>
               <slot name='ast'></slot>
           </div>`
      })
       let app = new Vue({
           el: "#app",
           data: {
               
          }
      })
</script>
</html>
```



### ③作用域插槽

作用域插槽这是用处最多的，也是最难理解的一个

核心原理：作用域插槽其实就是带数据的插槽，原来父组件可以通过绑定数据传递给子组件。作用域插槽就可以通过子组件绑定数据传递给父组件。

之所以叫做”作用域“插槽，是因为模板虽然是在父级作用域中渲染的，却能拿到子组件的数据。它在一定范围内，延伸了子组件的作用域。

使用场景：当子组件做循环显示列表或 某一部分由外部传递进来 时，则使用 作用域插槽。



```html

<!DOCTYPE html>
<html>
   <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>作用域插槽</title>
       <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
       <!-- <script type="text/javascript" src="vue.js"></script> -->
   </head>
   <body>
       <div id="app">
           <my-component :message='msg'>
               
               <!--这里的val也是随便取的名称，不与任何地方对应-->
               <template v-slot:listbox='val'>
                   <p>{{val.send.text}}</p>
               </template>
               <!--这里的thing是随便取的名称，不与任何地方对应-->
               
               <div slot='sayWhat' slot-scope='thing'>这是2.60版本前的写法：{{thing.said}}</div>
               <!-- 注意作用域插槽最好用于子组件的slot是批量循环的情况，子组件的slot是非批量循环的情况下无效，子组件中slot我们这样想：如果只是传一个值，有没有必要使用插槽？直接在子组件中写就行了，何必多次一举。-->
               <!-- 这是无效的写法
               <div v-slot:sayWhat='thing'>说了：{{thing.said}}</div> -->
               <!-- 这是无效的写法
               <template v-slot:sayWhat='thing'>
                  {{thing.said}}
               </template> -->
           </my-component>
       </div>
   </body>
   <script type="text/javascript">
       Vue.component('my-component',{
           template: `
               <div>
                   <slot name='listbox' v-for='value in list' :send='value'></slot>
                   <slot name='sayWhat' :said='message'></slot>
               </div>
           `,
           props:['message'],
           data(){
               return {
                 list:[
                    {
                         "id":10,
                         "text":"苹果"
                    },{
                         "id":20,
                         "text":"香蕉"
                    },{
                         "id":30,
                         "text":"梨"
                    },{
                         "id":40,
                         "text":"芒果"
                    },
                  ]
              }
          }
      })
       let app = new Vue({
           el: "#app",
           data: {
               msg: '这是动态传入的slot的内容',
          }
      })
</script>
</html>
```

## 3、总结

- 插槽实现了父组件向子组件优雅地传递dom结构
- 插槽是对组件的一种扩展，秉承软件设计思想：开放扩展，关闭修改
- 作用域插槽是最难理解的部分，作用域插槽可以通过子组件绑定数据传递给父组件