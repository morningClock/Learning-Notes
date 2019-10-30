# <video>自定义控件

> 本文参考资料：[MDN - <video>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video、)
>
> [Annn - 从零实现一个自定义html5播放器的示例代码](https://www.jb51.net/html5/569050.html)
>
> 

### 前言

​	最近在思考一个视频播放网站是怎么实现的，然后发现自己对`<video>`还挺陌生的，所以回来恶补一下视频播放相关的知识，就实现一个使用自定义的视频播放器吧。本文只想剖析自定义播放器的简单实现过程，所以不作封装处理。

### 前提

​	在实现之前，我们必须要了解一点`<video>`的相关的属性与事件。当然这里分享一个网站，可以清晰的让你感受到各个属性与事件的作用：[HTML5 ideo Events and API](https://www.w3.org/2010/05/video/mediaevents.html)

本文主要涉及的事件/方法:

- 加载视频：`load()`

- 开始播放：`play()`

- 暂停播放：`pause()`

- 监听播放时间变化：`ontimeupdate()`

- 全屏状态：`fullscreenchange()`

- 全屏播放事件：

  `requestFullscreen()`||`webkitRequestFullScreen()`||`mozRequestFullScreen()`

- 退出全屏事件：

  `exitFullscreen()`||`mozCancelFullScreen()||webkitCancelFullScreen()`

涉及的相关属性：

- `currentTime`当前播放时间
- `duration`视频总时长



### 一步一步实现

了解了一些属性和方法，我们就可以开始动手实现功能了。

- #### `HTML结构`

  首先我们得拥有一个结构，包裹着我们自己的控件以及视频`<video>`标签，当然我们不会使用video中默认控件`control`属性

  ```html
  <div id="player">
    <!-- 播放器 -->
    <video id="video" src="111.mp4"></video>
    <!-- 控件 -->
    <div id="video-controls">
      <a href="javascript:;" class="mk-play">播放</a>
      <a href="javascript:;" class="mk-pause">暂停</a>
      <a href="javascript:;" class="mk-fullscreen">全屏播放</a>
      <!-- 进度条 -->
      <div class="progress">
        <div class="load">0%</div>
        <div class="bar"></div>
      </div>
      <!-- 时间 -->
      <div class="timer">
        <div class="current"></div>
        <div class="total"></div>
      </div>
    </div>
  </div>
  ```

- ### `CSS`

  再加上点简陋的CSS，作为初步的调试使用。

  ```css
  /* 视频播放器 */
  #player {
    position: relative;
    width: 600px;
    height: 400px;
    background: #000;
  }
  #player video{
    margin-left: 50%;
    transform: translateX(-50%);
  }
  /* 进度条 */
  .progress{
    width: 100%;
    height: 20px;
    background: #ccc;
  }
  .progress .load{
    float: left;
    width: 0%;
    height: 20px;
    background: red;
    transition: width .8s;
    -moz-transition: width .8s; /* Firefox 4 */
    -webkit-transition: width .8s; /* Safari 和 Chrome */
    -o-transition: width .8s; /* Opera */
  }
  .progress .bar{
    float: left;
    width: 10px;
    height: 20px;
    background: yellow;
  }
  ```

- ### `Javascript`

  上述已经构建了一个最基本的播放器结构了，接下来我们给控件赋予对应的功能吧！

  - #### 获取播放器以及对应要操作的元素

    ```javascript
    // video player
    var player = document.querySelector('#player')
    var video = document.querySelector('#video')
    // controls
    var playBtn = document.querySelector('.mk-play')
    var pauseBtn = document.querySelector('.mk-pause')
    var fullscreenBtn = document.querySelector('.mk-fullscreen')
    var load = document.querySelector('.load')
    var loadbar = document.querySelector('.bar')
    ```

  - #### 开始与暂停

    ```javascript
    // 播放
    playBtn.addEventListener('click', function(){
      console.log('播放')
      video.play()
    })
    // 暂停
    pauseBtn.addEventListener('click', function(){
      console.log('暂停')
      video.pause()
    })
    ```

  - #### 全屏播放

    全屏播放，使用的是`requestFullscreen()`事件来进入浏览器全屏，全屏时覆盖整个`document`浏览器全屏，默认`ESC`可以退出全屏（防止滥用全屏，我们无法使用`js`触发默认全屏，以及无法监听到ESC按键事件）。

    我们要自行退出浏览器全屏就要靠`exitFullscreen()`事件来退出全屏了。

    当然我们还需要知道当前是否为全屏状态，我们就可以借助`fullscreenchange()`事件来获取全屏状态。

    上述的三个方法，在不同浏览器有不同的实现，所以各个引擎的浏览器，方法名称都略有区别，为了兼容各大浏览器，只能写多点代码了。

    

    - 1.定义全屏状态变量

      ```javascript
      var isFullScreen = false
      ```

    - 2.全屏按钮事件绑定

      ```javascript
      // 全屏
      fullscreenBtn.addEventListener('click', function(){
        if (isFullScreen) {
          console.log('退出全屏')
          if(document.exitFullscreen){
            document.exitFullscreen();
          }
          else if(document.mozCancelFullScreen){
            document.mozCancelFullScreen();
          }
          else if(document.msExitFullscreen){
            document.msExiFullscreen();
          }
          else if(document.webkitCancelFullScreen){
            document.webkitCancelFullScreen();
          }
        } else{
          console.log('全屏播放')
          if (player.requestFullscreen) {
            player.requestFullscreen()
          } else if (player.webkitRequestFullScreen) {
            player.webkitRequestFullScreen()
          } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen()
          }
        }
      })
      
      ```

    - 3.全屏状态处理

      ```javascript
      // 全屏状态
      var screenChangeEvent = 'fullscreenchange' || 'webkitfullscreenchange' || 'mozfullscreenchange' || 'MSFullscreenChange'
      if(screenChangeEvent){
        player.addEventListener(screenChangeEvent, function(e){
          isFullScreen = !isFullScreen;
        });
      }
      ```

    - 进度条的掌控
    
      ```javascript
       // 监听播放时间
      video.ontimeupdate = function() {
        var progress = (this.currentTime * 100 / this.duration).toFixed(1);
        load.style.width = progress + '%';
        console.log(progress)
      }
      ```
    
      

