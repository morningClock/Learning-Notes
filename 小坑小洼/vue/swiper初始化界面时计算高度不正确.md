# Swiper首次渲染界面时计算高度不正确



## 原因：

有图片加载，一开始图片没完全加载。导致`swiper`计算`swiper-wrapper`高度时，只计算了一部分的高度，导致盒子显示不完整。



## 解决：

[Swiper Observer](https://www.swiper.com.cn/api/observer/219.html)

增加Options选项，监听盒子的变化，触发刷新。

```js
swiperOptions: {
    autoHeight: true,
    observer:true,
    observeParents:true
}
```

