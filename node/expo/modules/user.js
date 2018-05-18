/**
 * Created by sunmy on 16/6/7.
 */

var fs = require('fs');
var formidable = require('formidable');
var find = require('./find');
var User = require('../models').User;

/** user
 * 描述：[编辑用户信息] [关注用户]
 * 模块：[user.edit] [user.attention]
 */
var user = {
    edit: {
        info: function (req, res) {
            User.update({id: req.cookies.user}, req.body, {}, function (err) {
                if (err) {
                    res.end(JSON.stringify({
                        message: '提交失败',
                        status: 0
                    }));
                } else {
                    res.end(JSON.stringify({
                        message: '提交成功',
                        status: 1
                    }));
                }
            });
        },
        portrait: function (req, res) {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                if (err) {
                    res.end(JSON.stringify({
                        message: '上传失败',
                        status: 0
                    }));
                } else {

                    find.do('user', req.cookies.user);

                    // 上传新头像
                    var timestamp = (new Date()).valueOf();
                    var url = '/portrait/' + timestamp + '_' + files.portrait.name;
                    var tmp_path = files.portrait.path;
                    var target_path = '../upload' + url;

                    fs.renameSync(tmp_path, target_path);

                    // 删除旧头像
                    find.info(res, function (info) {
                        if (info.portrait) {
                            fs.unlink('../upload' + info.portrait, function (err) {
                                if (err) {
                                    res.end(JSON.stringify({
                                        message: '上传失败',
                                        status: 0
                                    }));
                                }
                            });
                        }
                    });

                    /**
                     * 操作：修改记录
                     * 数据表：users
                     * 字段：portrait
                     */
                    User.update(find.record, {portrait: url}, {}, function (err) {
                        if (err) {
                            res.end(JSON.stringify({
                                message: '上传失败',
                                status: 0
                            }));
                        } else {
                            res.end(JSON.stringify({
                                message: '上传成功',
                                status: 1,
                                url: url
                            }));
                        }
                    });
                }
            });
        }
    },
    attention: function () {

    }
};

module.exports = user;