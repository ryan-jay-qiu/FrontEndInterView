# js两个超范围的数相加

```
 function big (str1,str2) {
const arr1 = str1.split('').reverse()
const arr2 = str2.split('').reverse()
let max = Math.max(arr1.length,arr2.length)
const result = []
let flag = 0 //进位标志
for (var i=0;i<max;i++){
    const num1 = (arr1[i]-0) || 0 //或运算符，如果前面的为假无论后面是真是假都会取后面的。
    const num2 = (arr2[i]-0) || 0
    flag +=  num1+num2
   if(flag >= 10 ){
   
   result[i] = flag -10
   flag = 1
   } else{
    result[i] = flag
       flag = 0
      
   }
}
return console.log(result.reverse().join('') )
    }
    big("4564654654846","151316513123132213")
    
    
```

