# Break - Continue #

### Break ###

跳出循环

```javascript
for (var i = 0;i < 6;i++) {
    if (i == 3) {
        break;
    }
    console.log(i);
}
// -> 0
// -> 1
// -> 2
```
```javascript
var i = 0;
while (i < 6) {
    if (i == 3) {
        break;
    }
    console.log(i);
    i++;
}
// -> 0
// -> 1
// -> 2
```

### Continue ###

跳出本次循环

```javascript
for (var i = 0;i < 6;i++) {
    if (i == 3) {
        continue;
    }
    console.log(i);
}
// -> 0
// -> 1
// -> 2
// -> 4
// -> 5
```
```javascript
var i = 0;
while (i < 6) {
    i++;
    if (i == 3) {
        continue;
    }
    console.log(i);
}
// -> 1
// -> 2
// -> 4
// -> 5
// -> 6
```

注意：i++ 置于 continue 后造成死循环