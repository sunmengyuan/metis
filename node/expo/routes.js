/**
 * Created by sunmy on 16/4/28.
 */

var express = require('express');
var find = require('./modules/find');
var log = require('./modules/log');
var user = require('./modules/user');
var diary = require('./modules/diary');
var router = express.Router();

// 主页
router.get('/', function (req, res) {
    find.do('user');
    find.all(res, function (users) {
        res.render('index', {
            log_user: req.cookies.user,
            users: users.reverse().splice(0, 5)
        });
    });
});
// 个人页
router.get('/profile/:id', function (req, res) {
    var id = req.params.id;
    var log_user = req.cookies.user;

    find.do('user', id);
    find.info(res, function (info) {
        if (info) {
            res.render('profile', {
                log_user: log_user,
                cur_user: id,
                is_author: (id == log_user),
                userinfo: info
            });
        } else {
            res.render('../message', {
                log_user: log_user,
                code: 404,
                message: '这枚用户还未注册本站'
            });
        }
    });
});
// 注册页
router.get('/register', function (req, res) {
    res.render('register', {log_user: req.cookies.user});
});
// 发布页
router.get('/diary/publish', function (req, res) {
    var log_user = req.cookies.user;
    if (log_user) {
        res.render('publish', {log_user: log_user});
    } else {
        res.redirect('/');
    }
});


router.post('/diaries', function (req, res) {
    var num = 10; // 分页单位
    var user = req.query.user;
    var page = req.query.page >> 0;
    var log_user = req.cookies.user;
    var data = {
        status: 1,
        data: []
    };
    var getDiaryInfo = function (id, count) {
        find.do('diary', id);
        find.info(res, function (info) {
            info.is_faved = 0;
            info.voter_num = info.voters.length;
            if (log_user) {
                var voters = info.voters;
                for (var j = 0;j < voters.length;j++) {
                    if (log_user == voters[j]) {
                        info.is_faved = 1;
                        break;
                    }
                }
            }
            data.data.push(info);
            !count && res.end(JSON.stringify(data));
        });
    };

    find.do('user', user);
    find.info(res, function (info) {
        var diaries = info.diaries.reverse();
        if (diaries.length) {
            var start = page * num;
            var end = (page + 1) * num;

            (diaries.length - start <= num)
                ? (end = diaries.length)
                : (data.status = 0);

            if (end > start) {
                var count = end - start; // 计数器
                for (var i = start;i < end;i++) {
                    count--;
                    getDiaryInfo(diaries[i], count);
                }
            }
        } else {
            res.end(JSON.stringify(data));
        }
    });
});


router.post('/login', function (req, res) {
    log.login(req, res);
});
router.post('/logout', function (req, res) {
    log.logout(req, res);
});
router.post('/register', function (req, res) {
    log.register(req, res);
});
router.post('/exit', function (req, res) {
    log.exit(req, res);
});

// user
router.post('/user/edit/info', function (req, res) {
    user.edit.info(req, res);
});
router.post('/user/edit/portrait', function (req, res) {
    user.edit.portrait(req, res);
});

// diary
router.post('/diary/publish', function (req, res) {
    diary.publish(req, res);
});
router.post('/diary/favour/verify/:id', function (req, res) {
    diary.favour.verify(req, res);
});
router.post('/diary/favour/cancel/:id', function (req, res) {
    diary.favour.cancel(req, res);
});


module.exports = router;