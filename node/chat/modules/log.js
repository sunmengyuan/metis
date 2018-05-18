/**
 * Created by sunmy on 16/7/25.
 */

var User = require('../models').User;

var log = {

    login: function (req, res) {
        User.count(req.body, function (err, doc) {
            if (doc && !err) {
                var record = {nickname: req.body.nickname};
                User.find(record, {id: 1}, {}, function (err, result) {
                    if (err) {
                        res.cookie('user', '');
                        res.end(JSON.stringify({
                            message: '登录失败',
                            status: 0
                        }));
                    } else {
                        var user = {
                            id: result[0].id,
                            nickname: req.body.nickname
                        };

                        res.cookie('user', user);
                        res.end(JSON.stringify({
                            message: '登录成功',
                            status: 1,
                            user: user
                        }));
                    }
                });
            } else {
                res.cookie('user', '');
                res.end(JSON.stringify({
                    message: '登录失败',
                    status: 0
                }));
            }
        });
    },
    register: function (req, res) {
        User.find({nickname: req.body.nickname}, {}, {}, function (err, result) {
            if (err) {
                res.end(JSON.stringify({
                    message: '注册失败',
                    status: 0
                }));
            } else {
                if (result.length) {
                    res.end(JSON.stringify({
                        message: '该昵称已被使用',
                        status: 0
                    }));
                } else {
                    var id = (new Date()).valueOf().toString();
                    req.body.id = id;

                    var user = new User(req.body);
                    user.save(function (err) {
                        if (err) {
                            res.end(JSON.stringify({
                                message: '注册失败',
                                status: 0
                            }));
                        } else {
                            res.cookie('user', {
                                id: id,
                                nickname: req.body.nickname
                            });
                            res.end(JSON.stringify({
                                message: '注册成功',
                                status: 1
                            }));
                        }
                    });
                }
            }
        });
    },
    exit: function (req, res) {
        res.cookie('user', '');
        res.end(JSON.stringify({
            message: '退出登录成功',
            status: 1
        }));
    }
};

module.exports = log;