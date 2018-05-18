# 异步编程 #

### #同步 ###

```javascript
function fun1 () {
    setTimeout(function () {
        console.log('setTimeout');
    }, 500);
}
function fun2 () {
    console.log('fun2');
}

fun1();
fun2();
// -> 'fun2'
// -> 'setTimeout'
```

### #回调函数 ###

```javascript
function fun1 (callback) {
    setTimeout(function () {
        console.log('setTimeout');
        callback();
    }, 500);
}
function fun2 () {
    console.log('fun2');
}

fun1(fun2);
// -> 'setTimeout'
// -> 'fun2'
```

### #事件监听 ###

```javascript
var $body = $('body');

function fun (event, a, b) {
    console.log('fun' + a + b);
}

$body.on('done', fun);

setTimeout(function () {
    console.log('setTimeout');
    $body.trigger('done', ['var1', 'var2']);
}, 500);
// -> 'setTimeout'
// -> 'funvar1var2'
```

### #发布订阅 ###

```javascript
function fun () {
    console.log('fun');
}

$.subscribe('done', fun);

setTimeout(function () {
    console.log('setTimeout');
    $.publish('done');
}, 500);
// -> 'setTimeout'
// -> 'fun'
```

*****

#### *循环 ####

```javascript
for (var i = 0;i < 5;i++)
{
    console.log('inner' + i);
}
console.log('outer');
// -> 'inner0'
// -> 'inner1'
// -> 'inner2'
// -> 'inner3'
// -> 'inner4'
// -> 'outer'
```
```javascript
for (var i = 0;i < 5;i++)
{
    console.log('outer' + i);

    function fun () {
        console.log('inner' + i);
    }
}
fun();
// -> 'outer0'
// -> 'outer1'
// -> 'outer2'
// -> 'outer3'
// -> 'outer4'
// -> 'inner5'
```
```javascript
for (var i = 0;i < 5;i++)
{
    console.log('inner' + i);

    fun(i);
}
function fun (j) {
    console.log('outer' + j);
}
// -> 'inner0'
// -> 'outer0'
// -> 'inner1'
// -> 'outer1'
// -> 'inner2'
// -> 'outer2'
// -> 'inner3'
// -> 'outer3'
// -> 'inner4'
// -> 'outer4'
```
```javascript
for (var i = 0;i < 5;i++)
{
    console.log('outer' + i);

    (function fun (j) {
        console.log('inner' + j);
    })(i);
}
// -> 'outer0'
// -> 'inner0'
// -> 'outer1'
// -> 'inner1'
// -> 'outer2'
// -> 'inner2'
// -> 'outer3'
// -> 'inner3'
// -> 'outer4'
// -> 'inner4'
```