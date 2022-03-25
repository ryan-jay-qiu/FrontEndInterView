# 介绍一下css盒子模型？

①盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)

②类型： IE 盒子模型、标准 W3C 盒子模型；

③两种盒模型的主要区别是:标准盒模型的宽高是值内容宽高(content)

 

④而IE盒模型的宽高是指content+padding+border。

 

⑤设置盒模型的方式是：设置box-sizing

  box-sizing:content-box 标准盒模型 默认值

  box-sizing:border-box IE盒模型 设置这个值 盒子的margin和padding和算到width和margin种