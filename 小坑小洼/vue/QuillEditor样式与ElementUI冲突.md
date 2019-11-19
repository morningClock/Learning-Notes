# vue-quill-editor富文本选项对齐混乱

## 问题：

今天使用ElementUI与vue-quill-editor的时候发现，富文本编辑框选项对齐出现了点问题。

![image-20191113172923312](F:\Github\myrepositories\learning-notes\小坑小洼\vue\assets\image-20191113172923312.png)

## 原因：

查询结构发现，是与ElementUI的样式出现问题。

vue-quill-editor中，没有设置自身的行高，而是通过继承来设置的line-height，而且其中选项并没有BFC限制，导致行高混乱了。

解决方法：

为vue-quill-editor组件设置更高优先权的行高样式，覆盖elementUI的行高样式就OK了。

## 代码：

```vue
<quill-editor
   class="quill-editor"
   v-model="content"
   :options="editorOption">
</quill-editor>
```

```css
.quill-editor {
    line-height: normal;
}
```



## 发现

quill-editor中默认样式quill-editor没有行高，但是在ql-editor中有定义默认行高。我们直接添加样式就可以解决。

```vue
<quill-editor
   class="ql-editor"
   v-model="content"
   :options="editorOption">
</quill-editor>
```

