# HTML5 地理定位

HTML5 Geolocation（地理定位）用于定位用户的位置。

Geolocation 通过请求一个位置信息，用户同意后，浏览器会返回一个包含经度和维度的位置信息！

## 地理定位中概要知识点

1. 与蜂窝基站三角定位或网络IP相比，**GPS**是获取位置的一种更为精确的方法。
2. 地理定位API的主要方法是**getCurrentPosition**，这是**navigator.geolocation对象**的一个方法，navigator.geolocation是navigator对象中的一个属性，它也是一个对象，包含了整个地理定位API。
3. getCurrentPosition是API的一个主要方法，它的功能是获取当前浏览器的位置，它有一个必要参数，即**成功处理程序**，还有两个可选参数，分别是**错误处理程序**和**选项**。
    **navigator.geolocation.getCurrentPosition(successHandler,errorHandler,options)**

- successHandler：获取位置成功时候的调用函数
- errorHandler：获取位置出错时的调用函数
- options：允许定制地理定位方法

1. **position对象**包含一个**coords属性**，这是一个coordinates对象。
2. coordinate对象的属性包括**纬度(latitude)**和**经度(longitude)**和**精度(accuracy)**。
3. 调用getCurrentPosition时，浏览器必须验证你允许共享你的位置。
4. getCurrentPosition的第三个参数options对象有一些属性，可以设置这些属性来控制地理定位API的行为。
5. **maximumAge属性**确定getCurrentPosition是否使用一个缓存位置，如果是，**他指定了请求一个全新位置之前这个位置的最大年龄**。
6. timeout属性确定**调用错误处理程序之前getCurrentPosition可以有多长时间来得到一个全新的位置**。
7. **enableHighAccuracy属性**向设备提供一个提示，如果可以**得到一个高精度的位置**，需要更多能量。
8. 可以使用地理位置定位API并结合**Google Maps API（BMap百度地图API）**在地图上显示你的位置。



```js
var x=document.getElementById("demo");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{x.innerHTML="该浏览器不支持获取地理位置。";}
  }
function showPosition(position)
  {
  x.innerHTML="Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude; 
  }
```





一般都会结合百度地图API使用，我已经做了一个可以查询两地之间的距离的网页，利用了HTML的新特性加百度地图实现