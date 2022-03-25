# JS延迟加载的方式有哪些

### **1.defer 属性：**

等于告诉浏览器立即下载，但延迟执行（脚本会被延迟到整个页面都解析完毕之后再执行。），即使<script>元素放在了<head>元素中，但包含的脚本将延迟浏览器遇到</html>标签后再执行，所有的defer脚本保证是按顺序依次执行的。

### **2.async 属性**

不让页面等待脚本下载和执行，从而异步加载页面其他内容，缺点是不能保证脚本会按照顺序执行

```html
<head>
    <script src="test1.js" async></script>
    <script src="test2.js" async></script>
</head>
```

### **3.动态创建DOM的方式**

```html
<script type="text/javascript"> 
   function downloadJSAtOnload() { 
       varelement = document.createElement("script"); 
       element.src = "defer.js"; 
       document.body.appendChild(element); 
   } 
   if (window.addEventListener) 
      window.addEventListener("load",downloadJSAtOnload, false); 
   else if (window.attachEvent) 
      window.attachEvent("onload",downloadJSAtOnload); 
   else
      window.onload =downloadJSAtOnload; 
</script>
```

### **4.使用setTimeout延迟方法**

```html
<script type="text/javascript">
  function A(){
    $.post("/lord/login",{name:username,pwd:password},function(){
      alert("Hello World!");
    })
  }
  $(function (){
    setTimeout("A()",1000); //延迟1秒
  })
</script>
```

### **6.让js最后加载**

```
引入外部js脚本文件时，如果放入html的head中,则页面加载前该js脚本就会被加载入页面，而放入body中，则会按照页面从上倒下的加载顺序来运行javascript的代码，所以我们可以把js外部引入的文件放到页面底部，来让js最后引入，从而加快页面加载速度。
```

