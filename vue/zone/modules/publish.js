var User = require('../models').User;
var Article = require('../models').Article;

var publish = function (req, res) {
    var id = (new Date()).valueOf().toString();
    var author = req.body.author;
    var record = function () {
          User.find({id: author}, {articles: 1}, {}, function (err, result) {
            if (err) {
                res.end(JSON.stringify({
                    message: '网络错误',
                    status: 0
                }));
            } else {
                var articles = result[0].articles;
                articles.push(id);

                User.update({id: author}, {articles: articles}, {}, function (err) {
                    if (err) {
                        res.end(JSON.stringify({
                            message: '网络错误',
                            status: 0
                        }));
                    } else {
                        res.end(JSON.stringify({
                            message: '发布成功',
                            status: 1,
                            id: id
                        }));
                    }
                });
            }
        });
    };

    req.body.id = id;
    var article = new Article(req.body);
    article.save(function (err) {
        if (err) {
            res.end(JSON.stringify({
                message: '网络错误',
                status: 0
            }));
        } else {
            record();
        }
    });
}

module.exports = publish;