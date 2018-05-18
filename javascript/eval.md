# Eval #

```javascript
var result = eval('2 + 1'); 
console.log(result); // -> 3
```
```javascript
var num = 3;
var result = eval(num + 2 + '3'); 
console.log(result); // -> 53
```
```javascript
var result = eval('var x = 10;var y = 20;console.log(x + y)'); 
console.log(result); // -> undefined
```
```javascript
var myEval = eval;
myEval('1 + 2'); // -> 3
```
```javascript
var jsonStr = '{name: "sunmy", password: "123"}';
var result = eval('(' + jsonStr + ')'); 
console.log(result); // -> Object {name: 'sunmy', password: '123'}
```