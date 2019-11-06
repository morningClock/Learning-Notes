## 前言： 

在写一个按钮切换效果时，遇到了一个数据类型问题。我打算的是通过属性判断按钮是否被选中，设置其属性为true和false，但是奇怪的发现，当属性为空，切换到true，在切换到false，之后一直就为false了，非常奇怪。

后来`debuger`发现，原来是数据类型出现的错误。

html标签内存的都是字符串，所以使用`getAttribute`读出来的就是字符串

整体流程是

- 读出字符串为`''`，设置其属性为`!''`等于`!0`等于`true`
- 读出字符串为`'true'`，设置属性为`!'true'`等于`!1`等于false
- 之后读出字符串为`'false'`，设置属性为`!'false'`等于`!1`等于false

其中要注意的是，在自动转换比较时，所有数据隐式转换时更偏向转换为数字number类型进行比较。



解决方法

将字符串转换后再进行非运算

使用方法：

```js
JSON.parse(checked)
```

注意：`JSON.parse()`不能接受空字串



```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>IE9+兼容性更高的switch按钮</title>
  <style>
    .switchBtn {
      position: relative;
      display: inline-block;
      width: 4rem;
      height: 2rem;
      border-radius: 2rem;
      box-shadow: inset 0 0 5px rgb(0, 0, 0, .2);
      background: #c6c6c6;
      transition: .5s
    }
    .switchBtn::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      box-shadow: 0 2px 5px rgb(0, 0, 0, .2);
      background: #fff;
      transition: .5s
    }
    .switchBtn[data-checked="true"] {
      background: #03a9f4;
    }
    .switchBtn[data-checked="true"]::before {
      left: 2rem;
    }
  </style>
</head>
<body>
  <span class="switchBtn" data-checked></span>
  <script>
    var switchBtn = document.querySelector('.switchBtn')
    switchBtn.onclick = function(e) {
      var checked = switchBtn.getAttribute('data-checked')
      if(checked === '') {
        checked = false
      }
      switchBtn.setAttribute('data-checked', JSON.parse(checked))
    }
  </script>
</body>
</html>
```

