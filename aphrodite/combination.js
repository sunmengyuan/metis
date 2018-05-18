/**
 * Created by sunmy on 16/1/22.
 */

/** m 取 n 组合算法
 *
 * 数组单元长度 m
 * 1. 前 n 位置 1
 * 2. 查询第一组 10 置为 01，同时将其左侧所有 1 置于数组单元最左侧
 * 3. 角标 1 => 提取，角标 0 => 不提取
 *
 * 选取 n 次
 *     第 1 次：m 种选择
 *     第 2 次：m - 1 种选择
 *     第 3 次：m - 2 种选择
 *     ...
 *     第 n 次：m - (n - 1) 种选择
 *
 * 考虑排序 => m(m - 1)(m - 2)...(m - (n - 1)) = m! / (m - n)!
 * 不考虑排序 => m! / n!(m - n)!
 */

/* 使用说明
var result = combination.main(['a', 'b', 'c', 'd', 'e', 'f'], 5);
console.log(result);
*/

var combination = {

    input: [],
    array: [],
    result: [],

    main: function (input, n) {
        var _this = this;
        var m = input.length;

        // 初始化数组单元，前 n 位置 1
        for (var i = 0;i < m;i++) {
            _this.array[i] = 1;
            if (i > n - 1) {
                _this.array[i] = 0;
            }
        }
        _this.result = [];
        _this.input = input;
        _this.recursion(_this.array);

        return _this.result;
    },
    recursion: function (array) {
        var _this = this;
        var length = array.length;
        _this.filter(array);

        // 查询数组单元，第一个 10 置换为 01
        for (var i = 0;i < length;i++) {
            var thisItem = array[i];
            var nextItem = array[i + 1];
            var judge = (thisItem == 1 && nextItem == 0);

            if (judge) {
                var count = 0;
                _this.array[i] = 0;
                _this.array[i + 1] = 1;

                // 将首组 10 左侧所有 1 置于数组单元最左侧
                for (var m = 1;m <= i;m++) {
                    if (_this.array[i - m]) {
                        _this.array.splice(i - m, 1);
                        count += 1;
                    }
                }
                for (var n = 0;n < count;n++) {
                    _this.array.unshift(1);
                }
                _this.recursion(_this.array);

                break;
            }
        }
    },
    filter: function (array) {
        var _this = this;
        var item = [];

        // 数组单元元素 1 代表提取当前项，元素 0 反之
        for (var i = 0;i < array.length;i++) {
            if (array[i]) {
                item.push(_this.input[i]);
            }
        }
        _this.result.push(item);
    }
};