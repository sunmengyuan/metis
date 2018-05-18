/**
 * Created by sunmy on 16/7/26.
 */

var User = require('../models').User;

var edit = {
    user: {
        info: function (req, res) {
            var cur_user = req.cookies.user;
            var updateData = function () {
                User.update({id: cur_user.id}, req.body, {}, function (err) {
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
            };

            User.find({nickname: req.body.nickname}, {}, {}, function (err, result) {
                if (err) {
                    res.end(JSON.stringify({
                        message: '提交失败',
                        status: 0
                    }));
                } else {
                    if (result.length && (result[0].id != cur_user.id)) {
                        res.end(JSON.stringify({
                            message: '该昵称已被使用',
                            status: 0
                        }));
                    } else {
                        if (!req.body.password) {
                            updateData();
                        } else {
                            if (req.body.password_old == result[0].password) {
                                updateData();
                            } else {
                                res.end(JSON.stringify({
                                    message: '原密码填写错误',
                                    status: 0
                                }));
                            }
                        }
                    }
                }
            });
        }
    }
};

module.exports = edit;