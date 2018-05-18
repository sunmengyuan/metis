var fs = require('fs');
var User = require('../models').User;
var Article = require('../models').Article;

var edit = {
    method: function (req, res, element) {
        switch (element) {
            case 'user':
                var model = User;
                var fileKey = 'portrait';
                break;
            case 'article':
                var model = Article;
                var fileKey = 'cover';
                break;
        }

        var id = req.params.id;
        var update = function () {
            model.update({id: id}, req.body, {}, function (err) {
                if (err) {
                    res.end(JSON.stringify({
                        message: '网络错误',
                        status: 0
                    }));
                } else {
                    res.end(JSON.stringify({
                        message: '修改成功',
                        status: 1
                    }));
                }
            });
        };
        model.find({id: id}, {}, {}, function (err, result) {
            if (err) {
                res.end(JSON.stringify({
                    message: '网络错误',
                    status: 0
                }));
            } else {
                if (req.body[fileKey]) {
                    var newFile = req.body[fileKey];
                    var oldFile = result[0][fileKey];
                    if (oldFile != newFile) {
                        fs.unlink('../upload' + result[0][fileKey]);
                    }
                }
                update();
            }
        });
    },
    user: function (req, res) {
        this.method(req, res, 'user');
    },
    article: function (req, res) {
        this.method(req, res, 'article');
    }
};

module.exports = edit;