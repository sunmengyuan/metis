/**
 * Created by sunmy on 16/6/8.
 */

var find = require('./find');
var User = require('../models').User;
var Diary = require('../models').Diary;

/** diary
 * 描述：[发布日记] [编辑日记] [移除日记] [点赞日记]
 * 模块：[diary.publish] [diary.edit] [diary.remove] [diary.favour]
 */
var diary = {
    publish: function (req, res) {
        var diary_id = (new Date()).valueOf().toString();

        /**
         * 操作：添加记录
         * 数据表：diaries
         */
        req.body.id = diary_id;
        req.body.author = req.cookies.user;

        var diary = new Diary(req.body);
        diary.save(function (err) {
            if (err) {
                res.end(JSON.stringify({
                    message: '发布失败',
                    status: 0
                }));
            }
        });

        /**
         * 操作：记录日记 id
         * 数据表：users
         * 字段：diaries
         */
        find.do('user', req.cookies.user);
        find.info(res, function (info) {
            info.diaries.push(diary_id);
            User.update(find.record, {diaries: info.diaries}, {}, function (err) {
                if (err) {
                    res.end(JSON.stringify({
                        message: '发布失败',
                        status: 0
                    }));
                } else {
                    res.end(JSON.stringify({
                        message: '发布成功',
                        status: 1
                    }));
                }
            });
        });
    },
    edit: function () {

    },
    remove: function () {

    },
    favour: {
        verify: function (req, res) {
            var id = req.params.id;
            var log_user = req.cookies.user;
            if (log_user) {
                /**
                 * 操作：记录日记 id
                 * 数据表：users
                 * 字段：favours
                 */
                find.do('user', log_user);
                find.info(res, function (info) {
                    info.favours.push(id);
                    User.update({id: log_user}, {favours: info.favours}, {}, function (err) {
                        if (err) {
                            res.end(JSON.stringify({
                                message: '点赞失败',
                                status: 0
                            }));
                        }
                    });
                });

                /**
                 * 操作：记录用户 id
                 * 数据表：diaries
                 * 字段：voters
                 */
                find.do('diary', id);
                find.info(res, function (info) {
                    info.voters.push(log_user);
                    Diary.update({id: id}, {voters: info.voters}, {}, function (err) {
                        if (err) {
                            res.end(JSON.stringify({
                                message: '点赞失败',
                                status: 0
                            }));
                        } else {
                            res.end(JSON.stringify({
                                message: '点赞成功',
                                status: 1
                            }));
                        }
                    });
                });
            } else {
                res.end(JSON.stringify({
                    message: '请登录',
                    status: 1001
                }));
            }
        },
        cancel: function (req, res) {
            var id = req.params.id;
            var log_user = req.cookies.user;
            var rmItem = function (lst, id) {
                for (var i = 0;i < lst.length;i++) {
                    if (id == lst[i]) {
                        lst.splice(i, 1);
                    }
                }
            };

            /**
             * 操作：记录日记 id
             * 数据表：users
             * 字段：favours
             */
            find.do('user', log_user);
            find.info(res, function (info) {
                rmItem(info.favours, id);
                User.update({id: log_user}, {favours: info.favours}, {}, function (err) {
                    if (err) {
                        res.end(JSON.stringify({
                            message: '点赞失败',
                            status: 0
                        }));
                    }
                });
            });

            /**
             * 操作：记录用户 id
             * 数据表：diaries
             * 字段：voters
             */
            find.do('diary', id);
            find.info(res, function (info) {
                rmItem(info.voters, log_user);
                Diary.update({id: id}, {voters: info.voters}, {}, function (err) {
                    if (err) {
                        res.end(JSON.stringify({
                            message: '点赞失败',
                            status: 0
                        }));
                    } else {
                        res.end(JSON.stringify({
                            message: '点赞成功',
                            status: 1
                        }));
                    }
                });
            });
        }
    }
};

module.exports = diary;