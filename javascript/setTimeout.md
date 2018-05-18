# SetTimeout #

+ __$(document).ready()__ (dom 加载完毕)

+ __$(window).load()__ (source 加载完毕)

```javascript
console.log('first');
var t = setTimeout(function () {
    console.log('setTimeout');
}, 0);
console.log('second');
// -> 'first'
// -> 'second'
// -> 'setTimeout'
```