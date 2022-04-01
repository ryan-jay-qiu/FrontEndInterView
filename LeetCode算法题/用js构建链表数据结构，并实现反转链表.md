用js构建链表数据结构，并实现反转链表

```js
        class Node { //定义一个节点类
            constructor(element) {
                this.element = element
                this.next = null
            }
        }
        class linkTable { //定义链表类
            constructor() {
                this.head = null
            }
            add(element) { //定义一个添加节点的方法
                let node = new Node(element) //构建一个节点
                let current = this.head //把链表头赋值给变量
                if (!current) { //检查当前链表是否有元素
                    this.head = node //没有的话直接返回当前节点并使她成为链表头
                    return
                }
                while (current.next) { //用while一直循环查找最后一项即节点的next属性值为null
                    current = current.next //进行往下查找
                }
                current.next = node //这里的current.next就是链表最后一个元素的next指向，把他指向新增元素即添加元素
            }
        }
        var a = new linkTable() //实例化链表
        a.add('1') //添加元素
        a.add('2')
        a.add('3')
        console.log('------原始的链表结构------')
        console.log(a.head) //输出链表结构

        function reverse(head) { //反转链表 原理 使他们的指向反过来，然后把链表头换成链表尾。
            if (!head && !head.next) return head //如果没有传入或者传入的链表没有next直接原封不动返回
            let current = head //当前处理的元素
            let prev = null //当前处理元素的上一个元素
            while (current) {
                let next = current.next //把当前元素的指向保存起来，防止丢失
                current.next = prev //给当前元素的next指向他的前一个元素
                prev = current //并保存当前的节点，是他成为节点下一个的父亲
                current = next//把一开始保存的下一个元素赋值给current进行递归
            }
            head = prev//重新确定头节点
            return head
        }
        console.log('------转换后的链表结构------')
        console.log(reverse(JSON.parse(JSON.stringify(a.head)))) //由于想让你们看清楚具体的前后变化所以把链表进行深拷贝，不然会因为引用类型数据
        //指向同一地址所导致原始的链表关系混乱
```

