## 问题：

我们在使用map来设置每一项值的时候，涉及到异步操作，就会出现问题。

按照常规，重现出一种情形。

假设我要使用map对每一项值进行操作，其中涉及到异步操作（此处使用演示来模拟），在简短延时后将值设置为10。

我们理想中ret的值是[10,10,10,10,10]

```js
(async () => {
  let arr = [1,2,3,4,5]
  let res = await arr.map(async (item) => {
    console.log(item+'执行')
    // map并发执行
    await new Promise(resolve=>{
        setTimeout(()=>{
          console.log(item+'结束');
          resolve();
        },2000)
    })
    return 10
  })
  console.log(res)
})()
```

使用node执行一下发现

![image-20191211144945439](F:\Github\myrepositories\learning-notes\小坑小洼\js\assets\image-20191211144945439.png)




## 解决

### 1.使用`for..of`或者其他循环替代

因为我们无法改变map函数内部的代码，使用Promise同步化异步操作。

所以我们只能自己遍历出所有内容，进行逐一操作。

### 2.使用`promise.all`

```js
let arr1 = [1,2,3,4,5]
let res = await Promise.all(arr.map(async (item) => {
	await new Promise(resolve=>{
        setTimeout(() => {
          console.log(item + '内结束');
          resolve();
        }, 2000)
    })
    return 10
}));
console.log(res)
```



## 原因剖析

map函数的原理是：

循环数组，获取每项数组对应的内容，

调用map函数传入的方法，获取数组的新内容，

将新内容push到新数组，最后返回。



map函数是同步执行的，所以循环每一项时，到给新数组值时，都是同步操作。

上面返回数组中都是Promise对象，因为他们还没执行完成就赋值了。



为了更加了解为什么，我们可以自己写一个map方法。

```js
Array.prototype.mymap = async function (fun) {
  let ret = []
  for(let item of this) {
    // 遍历
    // 等待传入的异步执行完成再push
    item = await fun(item)
    ret.push(item)
  }
  // 全部完成
  return ret
};

(async () => {
  let arr1 = [1,2,3,4,5]
  let res = await arr1.mymap(async (item)=>{
    // 异步操作
    await new Promise(resolve=>{
        setTimeout(() => {
          console.log(item + '内结束');
          resolve();
        }, 2000)
    })
    return 10
  })

  console.log(res)
})()
```



## 总结

要运用最合适的方法处理最合适的问题，才能达到事半功倍~~




