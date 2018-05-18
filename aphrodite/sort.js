/**
 * Created by sunmy on 15/11/2.
 */

/* 使用说明
var initLst = [10, 4, 6, 3, 14, 40, 1];
var sortLst = sort.do({
    initLst: initLst
});
console.log(sortLst);
*/

var sort = {
    do: function (opt) {
        var sortLst = opt.initLst;

        for (var i = 0;i < sortLst.length;i++) {
            for (var j = i;j < sortLst.length;j++) {
                if (sortLst[i] < sortLst[j]) {
                    var temp = sortLst[i];
                    sortLst[i] = sortLst[j];
                    sortLst[j] = temp;
                }
            }
        }

        return sortLst;
    }
};