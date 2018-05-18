var express = require('express');
var User = require('./models').User;
var Article = require('./models').Article;
var log = require('./modules/log');
var upload = require('./modules/upload');
var edit = require('./modules/edit');
var publish = require('./modules/publish');
var router = express.Router();

var paging = function (req, res, opts) {
    var page = req.query.page >> 0;
    var start = page * opts.unit;
    var end = (page + 1) * opts.unit;
    opts.model.find(opts.record, {}, {skip: start, limit: opts.unit}, function (err, result) {
        if (err) {
            res.end(JSON.stringify({
                message: '网络错误',
                status: 0
            }));
        } else {
            var status = opts.total > end ? 1 : 2;
            res.end(JSON.stringify({
                message: '请求成功',
                status: status,
                data: result
            }));
        }
    });
};

router.get('/profile/:id', function (req, res) {
    var id = req.params.id;
    User.find({id: id}, {}, {}, function (err, result) {
        if (err) {
            res.end(JSON.stringify({
                message: '网络错误',
                status: 0
            }));
        } else {
            res.end(JSON.stringify({
                message: '请求成功',
                status: 1,
                data: {
                    userInfo: result[0]
                }
            }));
        }
    });
});
router.get('/article/:id', function (req, res) {
    var id = req.params.id;
    Article.find({id: id}, {}, {}, function (err, result) {
        if (err) {
            res.end(JSON.stringify({
                message: '网络错误',
                status: 0
            }));
        } else {
            var articleInfo = result[0];
            User.find({id: articleInfo.author}, {}, {}, function (err, result) {
                if (err) {
                    res.end(JSON.stringify({
                        message: '网络错误',
                        status: 0
                    }));
                } else {
                    var userInfo = result[0];
                    res.end(JSON.stringify({
                        message: '请求成功',
                        status: 1,
                        data: {
                            userInfo: userInfo,
                            articleInfo: articleInfo
                        }
                    }));
                }
            });
        }
    });
});
router.get('/users', function (req, res) {
    User.count({}, function (err, total) {
        if (err) {
            res.end(JSON.stringify({
                message: '网络错误',
                status: 0
            }));
        } else {
            paging(req, res, {
                model: User,
                record: {},
                total: total,
                unit: 4
            });
        }
    });
});
router.get('/articles', function (req, res) {
    var user = req.query.user;
    if (user) {
        User.find({id: user}, {}, {}, function (err, result) {
            if (err) {
                res.end(JSON.stringify({
                    message: '网络错误',
                    status: 0
                }));
            } else {
                var articles = result[0].articles;
                var total = articles.length;
                var record = {id: {$in: articles}};
                paging(req, res, {
                    model: Article,
                    record: record,
                    total: total,
                    unit: 6
                });
            }
        });
    } else {
        Article.count({}, function (err, total) {
            if (err) {
                res.end(JSON.stringify({
                    message: '网络错误',
                    status: 0
                }));
            } else {
                paging(req, res, {
                    model: Article,
                    record: {},
                    total: total,
                    unit: 6
                });
            }
        });
    }
});
router.get('/article', function (req, res) {
    var unit = 2;
    var id = req.query.id;
    var page = req.query.page >> 0;
    var start = page * unit;
    var end = (page + 1) * unit;
    Article.find({id: id}, {content: 1}, {}, function (err, result) {
        if (err) {
            res.end(JSON.stringify({
                message: '网络错误',
                status: 0
            }));
        } else {
            var data = '';
            var pattern = /\n(?=.)/g
            var content = result[0].content;
            var paragraphs = content.split(pattern);
            var total = paragraphs.length;
            var output = paragraphs.slice(start, end);
            var status = total > end ? 1 : 2;
            for (var j = 0;j < output.length;j++) {
                data += output[j] + '\n';
            }
            res.end(JSON.stringify({
                message: '请求成功',
                status: status,
                data: data
            }));
        }
    });
});


router.post('/login', function (req, res) {
    log.login(req, res);
});
router.post('/register', function (req, res) {
    log.register(req, res);
});
router.post('/upload/portrait', function (req, res) {
    upload.portrait(req, res);
});
router.post('/upload/cover', function (req, res) {
    upload.cover(req, res);
});
router.post('/edit/user/:id', function (req, res) {
    edit.user(req, res);
});
router.post('/edit/article/:id', function (req, res) {
    edit.article(req, res);
});
router.post('/publish', function (req, res) {
    publish(req, res);
});

module.exports = router;