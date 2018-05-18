/**
 * Created by sunmy on 16/4/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connect('mongodb://localhost/chat');

var userSchema = new Schema({
    id: String,
    nickname: String,
    password: String,
    sex: String,
    tel: String,
    qq: String,
    intro: String
});

exports.User = db.model('users', userSchema);