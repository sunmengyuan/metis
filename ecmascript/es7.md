# ECMAScript 7 #

### Async 函数 ###

```javascript
async function getStockPriceByName (name) {
    var symbol = await getStockSymbol(name);
    var price = await getStockPrice(symbol);
    return price;
}

getStockPriceByName('goo').then(function (price) {
    console.log(price);
});
```

*****

+ 指数运算符：**

+ 函数绑定运算符：::