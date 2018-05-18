/**
 * Created by sunmy on 16/5/9.
 */

var fs = require('fs');
var find = require('./find');
var User = require('../models').User;
var Diary = require('../models').Diary;

/** log
 * 描述：[登录] [注销] [注册] [退出登录]
 * 模块：[log.login] [log.logout] [log.register] [log.exit]
 */
var log = {

    login: function (req, res) {
        var user = req.body;

        User.count(user, function (err, doc) {
            if (doc && !err) {
                var record = {username: user.username};
                User.find(record, {id: 1}, {}, function (err, result) {
                    if (err) {
                        res.cookie('user', '');
                        res.end(JSON.stringify({
                            message: '登录失败',
                            status: 0
                        }));
                    } else {
                        res.cookie('user', result[0].id);
                        res.end(JSON.stringify({
                            message: '登录成功',
                            status: 1
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
    logout: function (req, res) {
        find.do('user', req.cookies.user);
        find.info(res, function (info) {
            if (info.portrait) {
                fs.unlink('../upload' + info.portrait, function (err) {
                    if (err) {
                        res.end(JSON.stringify({
                            message: '注销失败',
                            status: 0
                        }));
                    }
                });
            }

            /**
             * 操作：删除记录
             * 数据表：users
             */
            User.remove(find.record, function (err) {
                if (err) {
                    res.end(JSON.stringify({
                        message: '注销失败',
                        status: 0
                    }));
                }
            });

            /**
             * 操作：删除记录
             * 数据表：diaries
             */
            Diary.remove({id: {$in: info.diaries}}, function (err) {
                if (err) {
                    res.end(JSON.stringify({
                        message: '注销失败',
                        status: 0
                    }));
                } else {
                    res.cookie('user', '');
                    res.end(JSON.stringify({
                        message: '注销成功',
                        status: 1
                    }));
                }
            });
        });
    },
    register: function (req, res) {
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
                res.cookie('user', id);
                res.end(JSON.stringify({
                    message: '注册成功',
                    status: 1,
                    user: {
                        id: id,
                        username: req.body.username
                    }
                }));
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