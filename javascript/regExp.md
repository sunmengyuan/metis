# 正则 #

### #匹配函数 ###

+ __pattern.exec()__
    
    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/;
    pattern.exec(str); // -> ['16']
    ```
    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/g;
    pattern.exec(str); // -> ['16']
    pattern.exec(str); // -> ['19']
    pattern.exec(str); // -> ['92']
    pattern.exec(str); // -> null
    ```
    
+ __pattern.test()__
    
    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/;
    pattern.test(str); // -> true
    ```
    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/g;
    pattern.test(str); // -> true
    ```
    
+ __str.match()__

    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/;
    str.match(pattern); // -> ['16']
    ```
    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/g;
    str.match(pattern); // -> ['16', '19', '92']
    ```
    
+ __str.search()__
    
    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/;
    str.search(pattern); // -> 10
    ```
    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/g;
    str.search(pattern); // -> 10
    ```

*****

### #量词 ###

+ __default__ 贪婪量词 (右 -> 左，长 -> 短)

+ __?__ 惰性量词 (左 -> 右，短 -> 长)

+ __+__ 支配量词 (仅尝试匹配整个字符串，支持度低)

```javascript
var str = 'aaxxxaaaxxxx';
var pattern = /a[a-z]*a/;
pattern.exec(str); // -> ['aaxxxaaa']
```
```javascript
var str = 'aaxxxaaaxxxx';
var pattern = /a[a-z]*?a/;
pattern.exec(str); // -> ['aa']
```
```javascript
var str = 'abcd';
var pattern = /[a-z]{1,3}/g;

pattern.exec(str); // -> ['abc']
pattern.exec(str); // -> ['d']
pattern.exec(str); // -> null
```
```javascript
var str = 'abcd';
var pattern = /[a-z]{1,3}?/g;

pattern.exec(str); // -> ['a']
pattern.exec(str); // -> ['b']
pattern.exec(str); // -> ['c']
pattern.exec(str); // -> ['d']
pattern.exec(str); // -> null
```

#### *环视 ####

+ __?=expression__ 顺序肯定环视 (右侧匹配 expression)

+ __?!expression__ 顺序否定环视 (右侧不匹配 expression)

+ __?<=expression__ 逆序肯定环视 (左侧匹配 expression)

+ __?<!expression__ 逆序否定环视 (左侧不匹配 expression)

```javascript
var str = 'sunmy age 1992';
var pattern = /\w{3}(?=\s\d)/g;
pattern.exec(str); // -> ['age']
```
```javascript
var str = 'bir1992th';
var pattern = /\w(?!\d)/g;
pattern.exec(str); // -> ['c']
pattern.exec(str); // -> ['3']
pattern.exec(str); // -> ['v']
pattern.exec(str); // -> ['n']
pattern.exec(str); // -> null
```
```javascript
var str = 'bir1992th';
var pattern = /\w(?=\D)/g;
pattern.exec(str); // -> ['c']
pattern.exec(str); // -> ['3']
pattern.exec(str); // -> ['v']
pattern.exec(str); // -> null
```

*****

### #子匹配 ###

```javascript
var str = 'my name is sunmy age 16 birth 1992 12 06';
var pattern = /(\d+)\s(.+)(\d){2}/;
pattern.exec(str); // -> ['16 birth 1992 12 06', '16', 'birth 1992 12 ', '6']
str.match(pattern); // -> ['16 birth 1992 12 06', '16', 'birth 1992 12 ', '6']
```

*****

+ __str.replace()__

    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/;
    str.replace(pattern, 's'); // -> 'sunmy age s birth 1992'
    ```
    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/g;
    str.replace(pattern, 's'); // -> 'sunmy age s birth ss'
    ```
    ```javascript
    var tel = '(010)12345678 (022)23456798 (011)12356895';
    var pattern = /\((\d{3})\)(\d{8})/g;
    tel.replace(pattern, '$1-$2'); // -> '010-12345678 022-23456798 011-12356895'
    ```

+ __str.split()__

    ```javascript
    var str = 'sunmy age 16 birth 1992';
    var pattern = /\d{2}/;
    str.split(pattern); // -> ['sunmy age ', ' birth ', '', '']
    ```