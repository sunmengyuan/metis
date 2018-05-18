/**
 * Created by sunmy on 16/5/4.
 */

var User = require('../models').User;
var Diary = require('../models').Diary;

/** find
 * 描述：[查询当前记录] [查询所有记录]
 * 模块：[find.info] [find.all]
 * 备注：find.do(param1, param2)
 *      param1: 待查询记录所在表
 *      param2: 待查询记录 id
 */
var find = {

    model: null,
    record: null,

    do: function (type, id) {
        var _this = this;
        switch (type) {
            case 'user':
                _this.model = User;
                break;
            case 'diary':
                _this.model = Diary;
                break;
        }
        _this.record = {id: id};
    },
    info: function (res, callback) {
        var _this = this;
        _this.model.find(_this.record, {}, {}, function (err, result) {
            if (err) {
                res.end(JSON.stringify({
                    message: '数据查询失败',
                    status: 0
                }));
            } else {
                callback(JSON.parse(JSON.stringify(result[0])));
            }
        });
    },
    all: function (res, callback) {
        var _this = this;
        _this.model.find({}, {}, {}, function (err, result) {
            if (err) {
                res.end(JSON.stringify({
                    message: '数据查询失败',
                    status: 0
                }));
            } else {
                callback(result);
            }
        });
    }
};

module.exports = find;