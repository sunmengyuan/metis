# Apply - Call #

### Apply ###

```javascript
var apply = $type.prototype.$method.apply(obj, [params]);
```

### Call ###

```javascript
var call = $type.prototype.$method.call(obj, params);
```

说明
- $type 变量类型
- $method 方法

*****

```javascript
var obj = {
    pro1: 'pro1',
    pro2: 'pro2'
};
var fun = function (x, y) {
    console.log(x + ' | ' + y);
    console.log(this);
};

fun('a', 'b'); 
// -> 'a | b'
// -> Window

fun.apply(obj, ['a', 'b']); 
// -> 'a | b'
// -> Object {pro1: 'pro1', pro2: 'pro2'}
```