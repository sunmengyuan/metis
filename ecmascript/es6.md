# ECMAScript 6 #

### #变量 ###

+ __let__

+ __const__ (只读常量)

    ```javascript
    const a = [];
    
    a.push('hello'); // 执行
    a.length = 0; // 执行
    a = ['hello world']; // 报错
    ```

注意
- 块级作用域
- 重复声明报错

*****

### #解构赋值 ###

```javascript
function method () {
    return 'method';
}

var [x = method()] = [1]; // -> 1
var [y = method()] = [null]; // -> null
var [z = method()] = [undefined]; // -> 'method'
```
```javascript
var obj = {
    slogan: [
        'hello',
        {
            name: 'sunmy',
            age: '23'
        }
    ]
};
var {slogan: [wels, {name, age}]} = obj;

console.log(slogan); // error
console.log(wels); // -> 'hello'
console.log(name); // -> 'sunmy'
console.log(age); // -> '23'
```

适用于
- 数组
- 对象
- 字符串
- 数值
- 布尔值

*****

+ __字符串扩展__

    + str.startsWith(), str.endsWith(), str.includes()

    #### *模板字符串 ####
    
    ```javascript
    var name = 'sunmy';
    var module = `My name is ${name}`;
    ```

+ __数值扩展__

    + Number.parseInt(), Number.parseFloat()
    
    + Number.isInteger()

+ __数组扩展__

    + Array.from(), Array.of()
    
    + array.find(), array.findIndex() (返回首个查询结果)
    
    + array.entries(), array.keys(), array.values()

+ __对象扩展__

    + Object.entries(), Object.keys(), Object.values()
    
    + Object.assign() (浅拷贝)

        ```javascript
        var target = {a: 1};
        var source1 = {b: 2};
        var source2 = {c: 3};
    
        Object.assign(target, source1, source2);
        console.log(target); // -> {a: 1, b: 2, c: 3}
        ```

+ __函数扩展__

    + _函数默认值_

        ```javascript
        function fun (x = 0, y = 0) {
            console.log(x);
            console.log(y);
        }
    
        fun();
        // -> 0
        // -> 0
        ```

    #### *箭头函数 ####
    
    ```javascript
    function Timer (x, y) {
        this.x = x;
        this.y = y;
    
        var t1 = setTimeout(() => {
            console.log(this); // -> Timer
        }, 1000);
        var t2 = setTimeout(function () {
            console.log(this); // -> Window
        }, 1000);
    }
    
    var timer = new Timer('x', 'y');
    ```
    
    形式
    - var 函数名 = (参数) => 返回值;
    - var 函数名 = (参数) => {函数体};
    
    注意
    - 无 this
    - 无 arguments

*****

### Promise 对象 ###

```javascript
var ajax = function (url) {
    var promise = new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', url);
        req.onreadystatechange = handler;
        req.send();
        
        function handler () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    });
    
    return promise;
}

ajax('url').then(function (data) {
    console.log(data);
})
.catch(function (err) {
    console.log(err);
});
```

*****

+ 扩展运算符：...