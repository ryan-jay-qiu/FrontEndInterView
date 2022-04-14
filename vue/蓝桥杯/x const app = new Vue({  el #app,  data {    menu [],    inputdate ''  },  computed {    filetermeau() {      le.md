```
const app = new Vue({
  el: "#app",
  data: {
    menu: [],
    inputdate: ''
  },
  computed: {
    filetermeau() {
      let arr = []
      for (let i = 0; i < this.menu.length; i++) {
        arr.push(this.menu[i])
      }
      if (this.inputdate) {
        arr1 = arr.filter(item => {
          if(item.children){
          return  item.children.some(item1 => item1.meta.title.indexOf(this.inputdate) !== -1 ) 
          }
        } )
  
        arr2 = arr.filter(item => item.meta.title.indexOf(this.inputdate) !== -1 )
        console.log(arr1,arr2)
        var a =JSON.parse(JSON.stringify(Array.from(new Set( arr1.concat(arr2))) )) 
        console.log(a)
        for(var key of a){
          console.log(key.meta.title,this.inputdate)
          if(key.meta.title.includes(this.inputdate)){
            key['f'] = 1
          }
         if(key.children){
          for(var key1 of key.children){
            if(key1.meta.title.includes( this.inputdate)){
              key1['f'] = 1
            }

          }
        }
        }
        return a
      }
      return arr
    }
  },
  // 在此处补全代码，实现二级菜单搜索功能
  methods: {
    async getDate() {
      const { data: res } = await axios.get('./data.json')
      console.log(res)
      this.menu = res
    }
  },
  created() {
    this.getDate()
  }/*,
  watch:{
    inputdate (newdate){
      console.log(this.menu)
    console.log(this.menu)
    }
  }*/
});
```

```

<!DOCTYPE html>
<html lang="zh">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>test</title>
		<script src="./js/vue.js"></script>
		<script src="./js/axios.min.js"></script>
		<style>
			input{
				width: 200px;
				height: 32px;
				padding-left:5px;
			}
			.active{
				background-color:yellow
			}
		</style>
	</head>
	<body>
    <!-- 需求：输入待查找的字段，输出包含该字段的所有菜单数据。
    1、若该菜单有父级菜单，则返回其父级菜单及同胞菜单。
    2、若该菜单有子级菜单，则返回该菜单及其下子级菜单。
    3、若该菜单既无父级也无子级，则返回菜单本身即可。
    测试字段：查询、首页、管理、配置、维护 -->
		<div id="app">
			<input v-model='inputdate' type="text" placeholder="请输入要搜索的菜单内容"/>
			<ul v-for='item in filetermeau'>
				<li>
					<span :class="item.f ?'active':''">{{item.meta.title}}</span>
					<ul>
						<li v-for='child in item.children'>
							<span :class="child.f ?'active':''">{{child.meta.title}}</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</body>
  <script type="text/javascript" src="./js/index.js"></script>
</html>
```

