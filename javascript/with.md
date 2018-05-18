# With #

with 改变作用域链

```javascript
var obj = {
    attr: {
        a: {
            a: 'inner',
            attr: 'attr'
        },
        b: 'b'
    }
};

with (obj.attr) {
    console.log(a);
    with (a) {
        console.log(attr);
    }
}
```