# Fn - Extend #

+ __$.fn__ (对象级别)

    ```javascript
    var div = document.createElement('div');

    $.fn.fun = function () {
        console.log('A TEST');
    };

    $.fun(); // error
    $(div).fun(); // -> 'A TEST'
    ```
    
+ __$.extend()__ (类级别)

    ```javascript
    $.extend({
        fun1: function (a, b) {
            console.log(a + b);
        },
        fun2: function (a, b) {
            console.log(a - b);
        }
    });
    $.fun1(10, 5); // -> 15
    $.fun2(10, 5); // -> 5
    ```

    #### *拷贝 ####

    ```javascript
    var obj1 = {name: 's', age: 22, object: {A: 'Maths', B: 'Chinese'}};
    var obj2 = {name: 'm', from: 'TJ', object: {A: 'Science', C: 'PE'}};
    var obj3 = {name: 'y', age: 23};
    var newObj = $.extend({}, obj1, obj2, obj3);
    console.log(newObj); // -> Object {name: 'y', age: 23, object: {A: 'Science', C: 'PE'}, from: 'TJ'}
    ```
    ```javascript
    var obj1 = {name: 's', age: 22, object: {A: 'Maths', B: 'Chinese'}};
    var obj2 = {name: 'm', from: 'TJ', object: {A: 'Science', C: 'PE'}};
    var obj3 = {name: 'y', age: 23};
    var newObj = $.extend(obj1, obj2, obj3);
    console.log(newObj); // -> Object {name: 'y', age: 23, object: {A: 'Science', C: 'PE'}, from: 'TJ'}
    ```

    _深度拷贝_
    ```javascript
    var obj1 = {name: 's', age: 22, object: {A: 'Maths', B: 'Chinese'}};
    var obj2 = {name: 'm', from: 'TJ', object: {A: 'Science', C: 'PE'}};
    var obj3 = {name: 'y', age: 23};
    var newObj = $.extend(true, {}, obj1, obj2, obj3);
    console.log(newObj); // -> Object {name: 'y', age: 23, object: {A: 'Science', B: 'Chinese', C: 'PE'}, from: 'TJ'}
    ```
    
+ __$.fn.extend()__ (对象级别)

    ```javascript
    var div = document.createElement('div');

    $.fn.extend({
        fun1: function (a, b) {
            console.log(a + b);
        },
        fun2: function (a, b) {
            console.log(a - b);
        }
    });
    
    $.fun1(10, 5); // error
    $.fun2(10, 5); // error

    $(div).fun1(10, 5); // -> 15
    $(div).fun2(10, 5); // -> 5
    ```