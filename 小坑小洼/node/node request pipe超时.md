# Unhandled stream error in pipe报错

## 问题

在使用Node.js写爬虫的时候，使用到了node 的request库，请求图片URL并保存到本地时。

遇到报错 Unhandled stream error in pipe

```
request(downloadURL).pipe(fs.createWriteStream(path))
```

![image-20191121232656106](F:\Github\myrepositories\learning-notes\小坑小洼\node\assets\image-20191121232656106.png)

### 原因

根据错误提示的关键词查询。发现时node写入文件时，打开pipe Stream流进行文件处理后，没有正确关闭pipe管道，导致的报错

### 解决方案

查询百度，找到了一个非常好的解决方法

> [request的pipe方法的问题](https://segmentfault.com/q/1010000009323745)

根据问题回答，就可以解决了。

### 代码

```js
const fs=require('fs');
const request=require('request');
// 写入完成后自动关闭管道
let fileStream=fs.createWriteStream('./1.jpg',{autoClose:true})
request(downloadURL).pipe(fileStream);
// 完成写入操作后，进行提示。
fileStream.on('finish',function(){
    console.log('文件写入成功')
})
```