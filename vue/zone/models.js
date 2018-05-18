var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://localhost/zone');

var userSchema = new Schema({
    id: String,
    nickname: String,
    password: String,
    intro: String,
    portrait: String,
    articles: []
});
var articleSchema = new Schema({
    id: String,
    author: String,
    title: String,
    content: String,
    cover: String
});

exports.User = db.model('users', userSchema);
exports.Article = db.model('articles', articleSchema);