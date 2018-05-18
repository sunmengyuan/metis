/**
 * Created by sunmy on 16/4/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://localhost/expo');

var userSchema = new Schema({
    id: String,
    username: String,
    password: String,
    sex: String,
    tel: String,
    qq: String,
    intro: String,
    portrait: String,
    diaries: [],
    followers: [],
    concerns: [],
    favours: []
});
var diarySchema = new Schema({
    id: String,
    author: String,
    title: String,
    content: String,
    voters: []
});

exports.User = db.model('users', userSchema);
exports.Diary = db.model('diaries', diarySchema);