# Instanceof #

```javascript
function A () {}
function B () {}
B.prototype = new A();

var obj = new B();
console.log(obj instanceof A); // -> true
console.log(obj instanceof B); // -> true
```
```javascript
Function instanceof Function // -> true
Function instanceof Object // -> true

Number instanceof Number // -> false
Number instanceof Object // -> true

String instanceof Object // -> true
```