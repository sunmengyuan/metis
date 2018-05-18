/**
 * Created by sunmy on 15/9/28.
 */

/* 使用说明
var param = getUrlParam.do(3);
console.log(param);
*/

var getUrlParam = {
    do: function (index) {
        var pattern = /[?&]/;
        var params = location.search.split(pattern).splice(1);
        var values = new Array();

        for (var i = 0;i < params.length;i++) {
            var value = params[i].split('=')[1];
            values.push(value);
        }

        return values[index];
    }
};