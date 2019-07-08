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

### 1.创建新组件

```shell
// 代码自动构建
ng generate component mycomponents
```

### 2.组件变量以及方法定义

在Vue中，组件的变量和方法在vue模板中的export一个默认对象中。Angular也是比较相像的，它分离了html、css、以及行为分别存储，以往的变量和方法在`app.component.ts`中的export的class类对象中定义。

![1562571299038](assets/1562571299038.png)

### 3.模板语法

类似Vue里的语法,但是ng里面使用新的变量，要先类型声明。

- #### 遍历`*ngFor`

  ```html
  <div *ngFor="let item of list; let i = index;"></div>
  ```

- #### 判断`*ngIf`

  - 普通用法

    ```html
    <div *ngIf="show">hello</div>
    ```

  - `<ng-template>`与`ngIf`结合

    ```html
    <ng-template [ngIf]="show">hello</ng-template>
    ```

    

- #### 动态数据绑定`[]`

  作用类似于Vue中的`:`，绑定动态数据。

- #### 事件处理`()`

  ```html
  // 事件用（）包起来
  // 触发事件传参$event，可取得当前dom元素 
  <div (click) = "clickHandler"></div>
  ```

- #### 双向绑定`[(ngModel)]`

  在Angular中，ngModel是不会默认载入的。所以我们要载入这个功能。

  - 在`app.module.ts`中引入表单处理模块`FormModule`
  - 将引入模块添加到@NgModule对象中的`imports`（模块依赖）中

  ```typescript
  import { FormModule } form '@angular/form'
  @Ngmodule({
    imports: [FormModule]
  })
  ```

- #### Class与Style的绑定

  - ##### Class的绑定（`ngClass`）:

  ```html
  // 根据isActive的布尔值，是否绑定样式activaClass
  <div [ngClass]="{activeClass: isActive}"></div>
  ```

  - ##### Style的绑定（`ngStyle`）:

- #### `get/set `数据拦截标识符

- #### `@Input()`装饰器

- 从父组件中接收值，类似于Vue的props属性

  ##### 使用方法：

  1.从父组件中传入数据

  ```html
  <app-product-alerts
    [product]="product">
  </app-product-alerts>
  ```

  2.从@anglar/core导入Input

  ```typescript
  import { Input } from '@angular/core';
  ```

  3.在子组件的类中，定义@input装饰器，接收父组件传入的值

  ```typescript
  export class ProductAlertsComponent {
    @Input() product;
  }
  ```

- #### 发布订阅事件

  使用`@Output()`装饰器与`EventEmitter`发布事件。

  1.引入功能模块

  ```typescript
  import { Output, EventEmitter } from '@angular/core';
  export class ProductAlertsComponent {
    @Output() notify = new EventEmitter();
  }
  ```

  2.发布事件

  ```html
  <button (click)="notify.emit()">Notify Me</button>
  ```

  3.订阅事件处理

  ```html
  <app-product-alerts
    (notify)="onNotify()">
  </app-product-alerts>
  ```

  ```typescript
  export class ProductListComponent {
    // 订阅noify事件
    onNotify() {
      window.alert('You will be notified when the product goes on sale');
    }
  }
  ```

## 4.路由

- #### 基本用法

1. ##### 引入路由功能模块

   ```typescript
   import { RouterModule } from '@angular/router';
   ```

2. ##### 配置路由

   ```typescript
   @NgModule({
     imports: [
       RouterModule.forRoot([
         { path: '', component: ProductListComponent },
         { path: 'products/:productId', component: ProductDetailsComponent },
       ])
     ]
   })
   ```

3. ##### 插入路由

   ```html
   <router-outlet></router-outlet>
   ```

4. ##### 定义跳转

   ```html
   <a [routerLink]="['/products', productId]">
      {{ product.name }}
   </a>
   ```

- #### 路由信息

  1.需要使用==路由信息组件==，引入路由信息包`ActivatedRoute`

  ```typescript
  import { ActivatedRoute } from '@angular/router';
  ```

  2.并把 `ActivatedRoute` 注入到构造函数中

  ```typescript
  export class ProductDetailsComponent {
    constructor(
      private route: ActivatedRoute,
    ) { }
  
  }
  ```

  3.初始化声明周期函数（`ngOnInit()`）中，订阅事件

  ```typescript
  ngOnInit() {
    // 订阅路由参数,路由参数信息都存在params中
    this.route.paramMap.subscribe(params => {
      this.product = products[params.get('productId')];
    });
  }
  ```

监听hash的改变事件

```typescript
window.onhashchange() {}
```



## 5.服务

- ### 生成服务

  ```typescript
  ng generate servive myServive
  ```

- ### 基本结构

  ```typescript
  import { Injectable } from '@angular/core';
  // 注入器
  @Injectable({
    // 注入的组件
    providedIn: 'root'
  })
  export class CartService {
  	// 注入的类，包含数据，方法等
    constructor() {}
  
  }
  ```

- ### 使用方法

  - ##### 在需要使用服务的组件，导入服务（例子的CartService是自定义服务）

    ```typescript
    import { CartService } from '../cart.service';
    ```

  - ##### 在constructor中注入服务

    ```typescript
    export class ProductDetailsComponent implements OnInit {
      constructor(
        private cartService: CartService
      ) { }
      addToCart(product) {
        // 使用服务
        this.cartService.addToCart(product);
      }
    }
    ```

  - ##### 使用服务

    ```html
    // 触发addToCart
    <button (click)="addToCart(product)">Buy</button>
    ```

    ```typescript
    
    ```

    