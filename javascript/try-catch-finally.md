# Try - Catch - Finally #

```javascript
try {
    console.lg('success');
} catch(e) {
    console.log(e);
    throw e;
} finally {
    console.log('finally');
}
// error
// -> finally
```

过程
+ 1. try 代码有误，不执行
+ 2. catch 捕获 error
+ 3. catch 抛出 error
+ 4. try 代码执行，报错

*****

```javascript
function MyError(msg) {
    this.name = 'MyError';
    this.message = msg;
}
MyError.prototype = new Error();
var error = new MyError('my error');

try {
    console.log('success');
    throw error;
} catch(e) {
    console.log(e);
} finally {
    console.log('finally');
}
// -> success
// -> error 对象
// -> finally
```

过程
+ 1. try 代码无误，被执行
+ 2. throw error 被执行
+ 3. catch 被执行，捕获所抛出自定义 error

*****

```javascript
try {
    console.lg('success');
    throw error;
} catch(e) {
    console.log(e);
} finally {
    console.log('finally');
}
// error
// -> finally
```

过程
+ 1. try 代码有误，不执行
+ 2. throw error 不执行
+ 3. catch 被执行，捕获默认 error

*****

```javascript
try {
    console.log('success');
} catch(e) {
    console.log(e);
} finally {
    console.log('finally');
}
// -> success
// -> finally
```

*****

```javascript
try {
    console.lg('success');
} catch(e) {
    console.log(e);
} finally {
    console.log('finally');
}
// error
// -> finally
```