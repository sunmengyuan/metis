# Callee - Caller #

```javascript
// 正在被执行的当前函数
function inner () {
    console.log(inner.caller);
    console.log(arguments.callee);
}

// 调用当前函数的函数
function outer () {
    inner();
}

function trigger () {
    outer();
}

trigger();
// -> function outer () {}
// -> function inner () {}
```

备注
- 形参 arguments.callee
- 实参 arguments