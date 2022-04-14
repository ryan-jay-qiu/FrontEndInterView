# flex布局

.yellow {

  align-self:flex-end;

  order:1;

}

![图片描述](https://doc.shiyanlou.com/courses/7835/1777363/2cbd49989a172233149d84b248cd0bb7-0/wm)

align-self ：
        控制子项自己在侧轴上的排列方式，用来给单个子元素设置，会覆盖掉父元素的align-items属性设置。

属性值：flex-start（默认）、flex-end、center、

eg:
        让1号和3号子元素按默认排列方式排列（默认主轴为x轴，排列为flex-start），2号在侧轴上居中排列，四号在侧轴上靠底端排列

	   <div>
			<span>1</span>
			<span>2</span>
			<span>3</span>
			<span>4</span>
		</div>
		<style type="text/css">
			div{
				display: flex;
				align-items: flex-start;	/*默认值 可不写*/
				width: 900px;
				height: 500px;
				background: #FAEBD7;
			}
			span{
				width: 200px;
				height: 100px;
				background: red;
			}
			div span:nth-child(2){
				align-self: center;	/*2号在侧轴上居中*/
				background: orange;
			}
			div span:nth-child(4){
				align-self: flex-end;	/*4号在侧轴上贴底端排列*/
				background: blue;
			}
		</style>


![在这里插入图片描述](https://img-blog.csdnimg.cn/2020022017003477.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTI0MTUz,size_16,color_FFFFFF,t_70)


order：控制子元素的排列顺序
用法：
        order：具体数字；
ps:
        order的属性值可以是任意值，默认值为0，数字越小，排在越前面


eg：将子项目中的1、2、3、4号盒子变为排列顺序为2、4、3、1

	   <div>
			<span>1</span>
			<span>2</span>
			<span>3</span>
			<span>4</span>
		</div>
		<style type="text/css">
			div{
				display: flex;
				width: 900px;
				height: 200px;
				background: #FAEBD7;
			}
			span{
				width: 200px;
				height: 100px;
				background: greenyellow;
			}
			div span:nth-child(1)
			{
				order: 2;
			}
			div span:nth-child(2){
				order: -2;
			}
			div span:nth-child(3){
				order: 1;
			}
			div span:nth-child(4){
				order: -1;
			}
		</style>
	执行结果：
————————————————
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200220172039482.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTI0MTUz,size_16,color_FFFFFF,t_70)