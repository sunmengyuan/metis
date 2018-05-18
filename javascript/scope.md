# 变量提升 #

__变量 / 函数声明提升__

__变量 / 函数定义及初始化时分配存储空间__

注意
- for, if, while 不是作用域的划分标准

概念
+ 函数作用域：其声明时所处作用域

*****

```javascript
function test () {
    console.log(a);
    var a = 2;
    console.log(a);
}
test();
// -> undefined
// -> 2
```
```javascript
var a = 1;
function test () {
    console.log(a);
    var a = 2;
    console.log(a); 
}
test();
// -> undefined 
// -> 2
```
```javascript
var a = 1;
function test () {
    console.log(a); 
}
test(); // -> 1
```
```javascript
function test () {
    fun1(); // error
    fun2(); // 执行

    // 变量声明提升，初始化未提升
    var fun1 = function () {
        console.log('function1');
    };
    // 函数声明提升
    function fun2 () {
        console.log('function2');
    }
}

test();
fun1(); // error
fun2(); // error
```