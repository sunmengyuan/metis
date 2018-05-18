# 柯里化 #

### 柯里化 ###

> 固定异变参数，缩小适用范围。
    
### 反柯里化 ###

> 泛化参数，扩大适用范围。

*****

```javascript
var curry = function (curried) {
    // 过滤 curried 中 function
    var tmp = Array.prototype.slice.call(arguments, 1);
    var method = function () {
        // arguments 转数组
        var params = Array.prototype.slice.call(arguments, 0);
        // 组装 params，触发 function
        curried.apply(this, tmp.concat(params));
    };

    return method;
};
var fun = function (msg, from, to) {
    console.log(msg + '-' + from + '-' + to);
};
var curried = curry(fun, 'My name is smy');

curried('smy', 'yaq'); // -> 'My name is smy-smy-yaq'
```
```javascript
var curry = function (curried) {
    var params = Array.prototype.slice.call(arguments, 1);
    curried.apply(this, params);

    var method = function () {
        curried.apply(this, arguments);

        return method;
    };

    return method;
};
var sum = 0;
var add = function (num) {
    sum += num;
};
var curried = curry(add, 1);

curried(2)(3)(4);

console.log(sum); // -> 10
```