# 原型继承 #

```javascript
/**
 * obja.constructor (构造函数) <=> function A(x, y) {this.attr1 = x;this.attr2 = y;}
 * obja.constructor.prototype (构造函数原型) <=> A {}
 * obja.constructor.prototype.constructor -...>
 *
 * A.constructor <=> function Function () {}
 * A.constructor.prototype <=> function () {}
 */

/**
 * obja => 1. constructor (构造函数) <=> function A(x, y) {this.attr1 = x;this.attr2 = y;}
 *         2. __proto__ (原型链) <=> A {} ...
 *
 * A {} => 1. constructor (构造函数) <=> function A(x, y) {this.attr1 = x;this.attr2 = y;}
 *         2. __proto__ (原型链) <=> Object {} ...
 */

function A(x, y) {
    this.attr1 = x;
    this.attr2 = y;
}
var obja = new A('attr1', 'attr2');
```
```javascript
function A (x, y) {
    this.a1 = x;
    this.a2 = y;
}

function B (x, y) {
    this.b1 = x;
    this.b2 = y;
}

var obj = new Object();

A.call(obj, 'a1', 'a2');
B.call(obj, 'b1', 'b2');
```
```javascript
function A (x, y) {
    this.a1 = x;
    this.a2 = y;
}

A.prototype.pro1 = 'pro1';
A.prototype.pro2 = function () {
    console.log('A.prototype.pro2');
};

var obj1 = new A('a1', 'a2');
var obj2 = new A('aa1', 'aa2');
```
```javascript
function A (x, y) {
    this.a1 = x;
    this.a2 = y;
}

function B (x, y) {
    this.b1 = x;
    this.b2 = y;
}

A.prototype.pro1 = 'proA1';
A.prototype.pro2 = function () {
  console.log('A.prototype.pro2');
};
A.prototype.pro3 = 'proA3';

B.prototype.pro1 = 'proB1';
B.prototype.pro2 = 'proB2';

B.prototype.__proto__ = A.prototype;

var obj = new B('b1', 'b2');
```