# This #

```javascript
var obj = {
    pro: 'pro',
    action: function () {
        this.pro = 'new';
    }
};
var fun = obj.action;

obj.action();
fun();
```
```javascript
var Story = new Function;
Story.prototype = {
    pro: 'pro',
    action: function () {
        this.pro = 'new';
    }
};
var obj = new Story;

obj.action();
obj.hasOwnProperty('pro');
obj.hasOwnProperty('start');
```