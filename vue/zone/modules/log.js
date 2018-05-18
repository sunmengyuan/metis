var User = require('../models').User;

var log = {
    login: function (req, res) {
        var user = req.body;
        User.count(user, function (err, doc) {
            if (err) {
                res.end(JSON.stringify({
                    message: '网络错误',
                    status: 0
                }));
            } else {
                if (doc) {
                    var record = {nickname: user.nickname};
                    User.find(record, {id: 1}, {}, function (err, result) {
                        if (err) {
                            res.end(JSON.stringify({
                                message: '网络错误',
                                status: 0
                            }));
                        } else {
                            var id = result[0].id;
                            res.end(JSON.stringify({
                                message: '登录成功',
                                status: 1,
                                id: id
                            }));
                        }
                    });
                } else {
                    res.end(JSON.stringify({
                        message: '用户名或密码有误',
                        status: 0
                    }));
                }
            }
        });
    },
    register: function (req, res) {
        var id = (new Date()).valueOf().toString();
        req.body.id = id;

        var user = new User(req.body);
        user.save(function (err) {
            if (err) {
                res.end(JSON.stringify({
                    message: '网络错误',
                    status: 0
                }));
            } else {
                res.end(JSON.stringify({
                    message: '注册成功',
                    status: 1,
                    id: id
                }));
            }
        });
    }
};

module.exports = log;