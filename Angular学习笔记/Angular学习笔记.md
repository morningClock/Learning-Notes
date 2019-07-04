# Angular学习笔记

## 1.什么是Angular？

Angular是微软开发的JS结构化框架，Angular不同于JQuery，JQuery是JS的函数库，对日常DOM操作进行了方法的封装。Angular是数据JS结构化框架，优化了前端的架构，很好的分离了操作与视图之间的结构，使结构更清晰，维护起来更加方便。

## 2.Angular的特点

- MVVM，分离数据模型与视图，使代码耦合度降低。
- 双向数据绑定。
- 声明式依赖注入。
- 指令，完善页面的指令。
- 服务
- TypeScript

## 3.Angular适合的场景

- 构建SPA单页面应用。
  1. 将所有内容存于一个页面，通过操作路由展示不同的组件。
  2. 页面数据发生变化时，进行页面的局部刷新（AJAX及路由分发技术）。

# 4.环境搭建

> > > ```shell
> > > // 安装ng-cli命令行
> > > npm install -g @angular/cli
> > > // 新建项目
> > > ng new my-app
> > > // 运行项目
> > > ng serve --open
> > > ```

## 5.概念理解

- ### karma单元测试

- ### protractor端到端测试

-  

## 6.Angular项目启动过程

- `main.ts`入口文件

  ```typescript
  // 中文译名，platformBrowserDynamic小块浏览器动态化
  // bootstrapModule 启动模块
  // 启动模块AppModule动态作用于浏览器的一部分，即组件
  platformBrowserDynamic().bootstrapModule(AppModule)
  ```

- `app.module.ts` 项目的模块组织关系的文件

  ```typescript
  // 组装模块资源：组件、指令、服务
  @NgModule({
    // 声明组件
    declarations: [
      AppComponent
    ],
    // 依赖模块
    imports: [
      BrowserModule
    ],
    // 提供者
    providers: [],
    // 启动的组件
    bootstrap: [AppComponent]
  })
  ```

- app.components.ts 组件的配置文件

  ```typescript
  // @Component组件装饰器
  @Component({
    // 挂载的选择器名称
    selector: 'app-root',
    // 模板的路径
    templateUrl: './app.component.html',
    // 样式的路径
    styleUrls: ['./app.component.css']
  })
  ```

- app.components.spec.ts  组件的测试文件

## 7.基本操作

### 1.创建组件

```shell
// 代码自动构建
ng generate component mycomponents
```

