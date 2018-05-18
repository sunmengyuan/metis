/**
 * Created by sunmy on 16/2/18.
 */

/* 使用说明
mapping.do('379', 'circle');
console.log(mapping.result);
*/

var mapping = {

    result: '',
    type: {
        chinese: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
        circle: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨']
    },

    do: function (str, type) {
        var _this = this;
        var length = str.length;
        _this.result = '';

        for (var i = 0;i < length;i++) {
            var index = parseInt(str[i]) - 1;
            var value = _this.type[type][index];

            _this.result += value;
        }
    }
};