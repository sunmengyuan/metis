/**
 * Created by sunmy on 15/9/22.
 */

/* 使用说明
var result = random.do({
    num: 10,
    from: 0,
    to: 10
});
console.log(result);
*/

var random = {
    do: function (opt) {
        var result = [];
        var temp = {};

        while (result.length < opt.num) {
            var num = Math.ceil(Math.random() * (opt.to - opt.from)) + opt.from;
            if (!temp[num]) {
                temp[num] = 1;
                result.push(num);
            }
        }

        return result;
    }
};