# 尾调用 #

### 尾调用 ###
    
> 将调用内层函数作为外层函数的最后一步操作，无需保留外层函数的调用帧。
    
#### *尾调用优化 ####
    
> 内层函数不再使用外层函数的内部变量 (严格模式下开启)。

#### *尾递归优化 ####

> 尾调用自身 (严格模式下开启)。

``` javascript
// 非严格模式下尾递归优化
function tco (f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator () {
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false;
            return value;
        }
    };
}

var sum = tco(function (x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1);
    } else {
        return x;
    }
});

sum(1, 100000);
```