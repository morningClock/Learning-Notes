# TypeScript学习笔记

## 1.什么是TypeScript

TypeScript是一种类似JavaScript的语言，它增强了JS的部分语法功能，且遵循ES6语法。

## 2.TypeScript的优势

- ### 强类型，定义特定数据类型

  强制声明数据类型，使开发阶段规范代码的类型，避免不必要的类型错误。

  且可以尽早的发现命名错误，类型错误等低级错误。

## 3.搭建 TypeScript 开发环境

- 什么是 compiler？将语言转换为浏览器可识别的语言，例如
  - less 编译器：`less`
  - EcmaScript 6 编译器：`babel`
  - TypeScript 编译器：`typescript`
- 在线TypeScript测试编译环境
  - <https://www.typescriptlang.org/play/index.html>
- 本地开发编译环境
  - 编译转换`ts`后生成`js`文件

```shell
npm i -g typescript

# 查看版本号
tsc --version

# 查看使用帮助
tsc --help

# 编译转换
tsc test.js
```

## 4.TypeScript的数据类型

TypeScript中最重要的特点就是强数据类型的定义，有利于编辑器在我们开发编码阶段就进行初步的校验。大大规范了开发的代码严谨性以及避免了一些不必要的错误。

- ### 字符串

  使用方法：

  ```typescript
  let name: string = 'abc';
  ```

- ### 数字

  使用方法：

  ```typescript
  let num: number = 1;
  ```

- 布尔值

  使用方法：

  ```typescript
  let bool: boolean = true;
  ```

- #### 对象

  使用方法：

  ```typescript
  // 少用，因为当检测Object类型时，不会识别对象中的内容
  let obj: Object = {name: '张三', age: 14};
  // 多用
  let obj: {name: string, age: number} = {name: '张三', age: 14};
  ```

- ### Interface复用类型检测

  使用方法：

  ```typescript
  // obj1与obj2的类型检测机制一样时，可以使用interface
  let obj1: {name: string, age: number} = {name: '张三', age: 14};
  let obj2: {name: string, age: number} = {name: '李四', age: 14};
  
  // 可以写为
  interface Person {
    name: string,
    age: number
  }
  let obj1: Person = {name: '张三', age: 14};
  let obj2: Person = {name: '李四', age: 14};
  ```

  

- ### 数组

  使用方法：

  ```typescript
  // 写法1:在类型后加[]
  let arr: number[] = [1, 2, 3];
  // 写法2：Array<元素类型>
  let arr: Array<number> = [1, 2, 3];
  ```

- ### 元组

  数组定义时，数组的成员必须全部遵循统一类型，很显然有的需求场景下是不通用的，所以我们引进了新的概念，元组，可以指定已知数组中，遵循不同的类型，但必须长度，顺序一致。

  正确情况：

  ```typescript
  let arr: [number, string] = [1, 'str'];
  ```

  错误情况：

  ```typescript
  // 错误1： 不符合标注的类型
  let arr: [number, string] = [1, 2];
  let arr: [number, string] = ['1', '2'];
  // 错误2： 与标注类型顺序不同
  let arr: [number, string] = ['str', 2];
  // 错误3： 数组数量超出标记类型数量
  let arr: [number, string] = [1, 'str', 3];
  ```

- ### Any

  在不确定变量的类型时，可以使用`any`标记

  ```typescript
  let notSure: any = 4;
  notSure = "maybe a string instead";
  // 可以为任意类型值
  ```

- ### Void

  当我们确定值不存在类型时，使用void标记，多用于函数无返回值情况

  ```typescript
  function notRet(a:number, b:number): void {
    console.log(a+b)
  }
  ```

  或者声明一个空类型值(undefined or null)

  ```typescript
  let unusable: void = undefined;
  ```

  

- ### null && undefined

  不常用

  ```typescript
  // Not much else we can assign to these variables!
  let u: undefined = undefined;
  let n: null = null;
  ```

  > - 默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。
  > - 然而，当你指定了`--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自。 这能避免 *很多*常见的问题。许在某处你想传入一个 `string`或`null`或`undefined`，你可以使用联合类型`string | null | undefined`。
  > - 注意：我们推荐尽可能地使用`--strictNullChecks` ，因为它使你的代码更严谨，可以极大的减少出错的几率。

- ### 类型推断

  当我们确定类型时，且想了解某个值详细的信息（如调用其方法或对象内成员），使用类型推断进行类型转换，来了解内容。

  ```typescript
  // 方法1：尖括号
  let someValue: any = 'this is a string';
  let strLength: number = (<string>someValue).length
  
  // 方法2： as
  let someValue: any = 'this is a string';
  let strLength: number = (someValue as string).length
  ```

- ### 可选属性

  有时候某些属性不是必须的，我们就可以使用可选属性

  ```typescript
  interface SquareConfig {
    // 可以不传入color和width
    color?: string;
    width?: number;
  }
  
  function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }
  
  let mySquare = createSquare({color: "black"});
  ```

- ### 只读属性

  一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly`来指定只读属性:

  ```typescript
  interface Point {
      readonly x: number;
      readonly y: number;
  }
  let p1: Point = { x: 10, y: 20 };
  // error!不能修改
  p1.x = 5; 
  ```

  这种功能与const差不多，那么我们平常使用什么呢？

  ```typescript
  readonly` vs `const
  ```

  - 常量使用 const
  - 对象属性使用 readonly

## 5.TypeScript解构赋值

TypeScript中也拥有ES6的语法

- ### 数组的解构赋值

  根据数组顺序进行对应的解构赋值

  ```typescript
  let arr: Array<number> = [10, 20];
  // 解构赋值
  // 解开结构，对应赋值
  // 结果：var num1 = arr[0], num2 = arr[1];
  let [num1, num2] = arr
  ```

  

- ### 对象解构赋值

  根据对象成员名称进行对应的解构赋值

  ```typescript
  let obj: {
  	name: string,
    age: number
  } = {
    name: 'jack',
    age: 12
  }
  // 类型1，对应名称解构
  // 结果：var name = obj.name, age = age;
  let {name, age} = arr
  
  // 类型1，别名解构
  // 结果：var newname = obj.name, newage = obj.age;
  let {name: newname, age: newage} = arr
  ```

- ### 利用解构赋值交换变量

  ```typescript
  [first, second] = [second, first];
  ```

- ### 在函数中利用解构赋值

  ```typescript
  function add ([x, y]: [number, number]) :number {
    return x+y;
  }
  let arr = [1, 2];
  add([1, 2])
  ```

- ### 解构剩余参数（...）

  函数的剩余参数：

  ```typescript
  function sum ([x, ...arr]: number[]) {
    // arr = [2,3,4]
    console.log(arr)
  }
  sum([1,2,3,4])
  ```

  数组的剩余参数：

  ```typescript
  let [first, ...rest] = [1, 2, 3, 4]
  console.log(first) // 1
  console.log(rest) // [2, 3, 4]
  ```

- ### 数组的展开操作符

  ```typescript
  let arr1 = [1,2,3];
  let arr2 = [3,4,5];
  
  let arr3 = [6,7,8, ...arr1];
  let arr = [...arr1, ...arr2];
  ```

  

- ### 对象的展开操作符

  ```typescript
  let obj1 = {
    name: 'abc'
  }
  let obj2 = {
    // __assign({}, obj1, { age:12 })方法
    // 展开obj1混合入obj2中，放入新对象
    ...obj1,
    age: 12
  }
  console.log(obj2.name) //abc
  ```

  

## 6.Class类

- ### 类的基本用法

  JavaScript构造函数

  ```java
  function Person(name, age){
    this.name = name;
    this.age = age;
  }
  Person.prototype.sayName = function () {
    console.log(this.name);
  }
  let person1 new Person('jack',15);
  ```

  

  TypeScript(ES6)语法 === 上述JavaScript：

  ```typescript
  class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    sayName(): void {
      console.log(this.name)
    }
  }
  let person1 = new Person('jack',15);
  ```

- ### 继承

  - #### 方法的继承

    ```typescript
    class Parent{
      constructor() {
        
      }
      say(): void{
        console.log('helloworld');
      }
    }
    class child extends Parent{
      
    }
    // 可以使用继承自父级的方法
    let person1 = new child().say()
    ```

  - #### 属性的继承

    ```typescript
    class Parent{
      name: string;
      age: number;
      constructor(name: string, age: number) {
        this.name = name;
          this.age = age;
      }
    }
    class child extends Parent{
      constructor(name: string, age: number) {
        // 借用父类构造函数
        super(name, age);
      }
    }
    // 可以使用继承自父级的方法
    let person1 = new child('张三', 16).age;
    ```

    

- ### 实例成员访问修饰符

  - #### ==public==公开的（默认）

    ```typescript
    class Person {
        public name: string;
        public constructor(name: string) {
          this.name = name;
        }
        public say(): void{
          console.log(this.name);
        }
    }
    ```

  - #### ==private==私有的

    私有成员，外部不可以直接访问，必须通过构造函数内部的方法才可以访问到私有成员。且private私有成员不可以被继承

    ```typescript
    class Person {
        public name: string;
        private type: string = '人类';
        public constructor(name: string) {
          this.name = name;
        }
        public say(): void{
          console.log(this.name);
        }
        public sayFirstName(): void{
          // 内部可以访问私有成员
          console.log(this.firstName);
        }
    }
    class Student extends Person {
        getFoo() {
          //不可以继承type
          console.log(this.type); // error
      }
    }
    // 不可以访问private私有成员
    new Person('huang').firstName; //error
    // 外部只使用内部接口访问私有成员
    new Person('huang').sayFirstName()
    ```

    

  - #### ==protected==受保护的

    受保护成员，外部不可以访问，但是可以继承。

    ```typescript
    class Person {
        public name: string;
        private type: string = '人类';
        protected foo: string = 'bar';
        public constructor(name: string) {
          this.name = name;
        }
        public say(): void{
          console.log(this.name);
        }
        public sayFirstName(): void{
          // 内部可以访问私有成员
          console.log(this.firstName);
          console.log(this.foo);
        }
    }
    class Student extends Person {
        getFoo() {
          //可以继承foo
          console.log(this.foo);
      }
    }
    // 不可以直接访问protected私有成员
    new Person('huang').foo; //error
    // 外部只使用内部接口访问私有成员
    new Person('huang').sayFirstName()
    ```

    

  - #### ==readonly==只读

    只读成员，修改时报错

    ```typescript
    class Person {
        public readonly name: string;
        public constructor(name: string) {
          this.name = name;
        }
    }
    let person = new Person('huang');
    person.name = 'zhong'; // error readonly不可以修改
    
    ```

    

- ### 属性的存取(set/get)

  当成员被访问时，触发get，被设置时触发set

  ```typescript
  let passcode = "secret passcode";
  
  class Employee {
        // 私有成员，外部无法访问
      private _fullName: string;
  
        // 当访问 实例.fullName 的时候会调用 get 方法
      get fullName(): string {
          return this._fullName;
      }
  
        // 当对 实例.fullName = xxx 赋值的时候会调用 set 方法
      set fullName(newName: string) {
          if (passcode && passcode == "secret passcode") {
              this._fullName = newName;
          }
          else {
              console.log("Error: Unauthorized update of employee!");
          }
      }
  }
  
  let employee = new Employee();
  employee.fullName = "Bob Smith";
  if (employee.fullName) {
      alert(employee.fullName);
  }
  ```

- ### 静态成员

  #### ==static==静态关键字

  静态成员是，构造函数的实例不可以访问，只有作为类的属性才可以被访问。

  ```typescript
  class Person{
    static type: string = '人类';
      age: number = 18;
  }
  // 只能被类本身访问
  console.log(Person.type) //人类
  console.log(Person.age) //error无法访问实例属性
  
  // 实例无法访问static成员
  console.log(new Person().type)
  console.log(new Person().age)
  ```

  

- ### for-of循环

  - #### for循环

  - #### forEach（不支持break）

  - #### for in (会把数组当作对象遍历)

  - #### for of (ES6新增，支持break)



