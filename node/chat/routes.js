/**
 * Created by sunmy on 16/7/14.
 */

var express = require('express');
var log = require('./modules/log');
var edit = require('./modules/edit');
var communicate = require('./communicate');
var User = require('./models').User;
var router = express.Router();

router.get(/^\/(login)?$/, function (req, res) {
    var cur_user = req.cookies.user;
    res.render('index', {
        cur_user: cur_user || {id: '', nickname: ''}
    });
});
router.get('/chatroom', function (req, res) {
    var onlines = communicate.onlines;
    var cur_user = req.cookies.user;
    if (cur_user) {
        User.find({}, {}, {}, function (err, result) {
            if (err) {
                res.redirect('/');
            } else {
                for (var i = 0;i < result.length;i++) {
                    result[i].status = 'offline';
                    for (var j = 0;j < onlines.length;j++) {
                        if (result[i].id == onlines[j]) {
                            var tmp = result[i];
                            tmp.status = 'online';

                            result.splice(i, 1);
                            result.unshift(tmp);
                        }
                    }
                }
                res.render('chatroom', {
                    cur_user: cur_user,
                    users: result
                });
            }
        });
    } else {
        res.redirect('/');
    }
});
router.get('/edit/myinfo', function (req, res) {
    var cur_user = req.cookies.user;
    if (cur_user) {
        User.find({id: cur_user.id}, {}, {}, function (err, result) {
            if (err) {
                res.redirect('/');
            } else {
                res.render('myinfo', {
                    cur_user: cur_user,
                    info: result[0]
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post('/login', function (req, res) {
    log.login(req, res);
});
router.post('/register', function (req, res) {
    log.register(req, res);
});
router.post('/exit', function (req, res) {
    log.exit(req, res);
});
router.post('/edit/user/info', function (req, res) {
    edit.user.info(req, res);
});

module.exports = router;