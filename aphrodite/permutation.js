/**
 * Created by sunmy on 16/1/23.
 */

/** m 取 m 全排列
 *
 * 1. 初始字符串 '000'
 * 2. 数值 + 1，逢 m 进位
 * 3. 将含重复位字符串去除
 * 4. 按角标数组提取结果
 */

/* 使用说明
permutation.main(['a', 'b', 'c', 'd']);
console.log(permutation.result);
*/

var permutation = {

    input: [],
    result: [],
    count: 0,
    length: 0,

    main: function (input) {
        var _this = this;
        var length = input.length;
        var pow = Math.pow(length, length);
        var count = (length - 1) * (1 - pow) / (1 - length);

        _this.input = input;
        _this.result = [];
        _this.count = count;
        _this.length = length;
        _this.recursion(0);
    },
    recursion: function (int) {
        var _this = this;

        // 每次递归数值 +1 并转化为 m 进制
        var newInt = int + 1;
        var newString = newInt.toString(_this.length);
        var newLength = newString.length;

        // 字符串空缺位补 0
        for (var i = 0;i < _this.length - newLength;i++) {
            newString = '0' + newString;
        }

        // 筛选不含重复位字符串
        _this.filter(newString);

        // (q = n = m 等比数列求和) * (m 进制基数)
        if (newInt < _this.count) {
            _this.recursion(newInt);
        }
    },
    filter: function (string) {
        var _this = this;
        var object = {};
        var array = [];

        for (var i = 0;i < string.length;i++) {
            var thisItem = string[i];

            // 移除重复位
            if (!object[thisItem]) {
                object[thisItem] = 1;
                array.push(thisItem);
            }
        }

        // 筛选不含重复位字符串
        if (array.length == _this.length) {
            _this.getResult(string);
        }
    },
    getResult: function (string) {
        var _this = this;
        var array = [];

        // 按角标数组提取结果
        for (var i = 0;i < string.length;i++) {
            var thisItem = string[i];
            var index = parseInt(thisItem);
            var selected = _this.input[index];

            array.push(selected);
        }

        _this.result.push(array);
    }
};