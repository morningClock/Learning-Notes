# POST接受JSON

## 1.使用`body-parse`

body-parse可以将接收参数整理到req.body中，十分方便。

我们只需要简单的配置

```js
// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

然后在post请求接口，就可以使用`req.body`获取JSON数据。

需要注意的是，前端必需设置请求头`Content-Type: application/json`，标记是以json格式传输数据，否则接口无法解析json数据。



1