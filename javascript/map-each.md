# Map - Each #

+ __$.map()__

    ```javascript
    var array = [2, 4, 7, 11];
    var newArray = $.map(array, function (value, index) {
        console.log(this); // -> Window
        console.log('value : ' + value);
        console.log('index : ' + index);
    
        return value * value;
    });
    
    console.log(newArray); // -> [4, 16, 49, 121]
    ```
    ```javascript
    var obj = {
        pro1: 'TEST1',
        pro2: 'TEST2'
    };
    var newObj = $.map(obj, function (value, key) {
        console.log(this); // -> Window
        console.log('value : ' + value);
        console.log('key : ' + key);
    });
    ```

+ __$.each()__

    ```javascript
    var array = [2, 4, 7, 11];
    var newArray = $.each(array, function (index, value) {
        console.log(this); // -> 当前循环对象
        console.log('index : ' + index);
        console.log('value : ' + value);
    
        return value * value;
    });
    
    console.log(newArray); // -> [2, 4, 7, 11]
    ```
    ```javascript
    var obj = {
        pro1: 'TEST1',
        pro2: 'TEST2'
    };
    var newObj = $.each(obj, function (key, value) {
        console.log(this); // -> 当前循环对象
        console.log('key : ' + key);
        console.log('value : ' + value);
    });
    ```