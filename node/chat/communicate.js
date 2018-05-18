/**
 * Created by sunmy on 16/7/25.
 */

var User = require('./models').User;

var method = {
    getCookie: function (socket, key) {
        var cookie = socket.handshake.headers.cookie;
        var lst = cookie.split(';');
        for (var i = 0;i < lst.length;i++) {
            var kvp = lst[i].split('=');
            if (key == kvp[0].trim() && kvp[1]) {
                var pattern = /\{.*\}/;
                var jsonStr = pattern.exec(
                    decodeURIComponent(kvp[1])
                )[0];
                return JSON.parse(jsonStr);
            }
        }
    },
    rmArrElem: function (arr, elem) {
        for (var i = 0;i < arr.length;i++) {
            (arr[i] == elem) && arr.splice(i, 1);
        }
    }
};
var communicate = {

    activers: {},
    onlines: [],

    do: function (io) {
        var _this = this;
        io.on('connection', function (socket) {
            _this.handleEvents(socket, io);
            _this.checkActivers(socket, io);
        });
    },
    handleEvents: function (socket, io) {
        var _this = this;
        socket.on('online', function (data) {
            User.find({id: data.id}, {}, {}, function (err, result) {
                if (!err) {
                    io.sockets.emit('online', result[0]);
                    _this.onlines.push(data.id);
                }
            });
        });
        socket.on('offline', function (data) {
            User.find({id: data.id}, {}, {}, function (err, result) {
                if (!err) {
                    io.sockets.emit('offline', result[0]);
                    method.rmArrElem(_this.onlines, data.id);

                    delete _this.activers[data.id];
                }
            });
        });
        socket.on('message', function (data) {
            io.sockets.emit('message', {
                user: {
                    id: data.user.id,
                    nickname: data.user.nickname
                },
                message: data.message
            });
        });
    },
    checkActivers: function (socket, io) {
        var _this = this;
        var cur_user = method.getCookie(socket, 'user');

        (cur_user) && (_this.activers[cur_user.id] = true);

        socket.on('disconnect', function () {
            if (cur_user) {
                _this.activers[cur_user.id] = false;

                var t = setTimeout(function () {
                    var status = _this.activers[cur_user.id];
                    if (!status) {
                        io.sockets.emit('offline', {
                            id: cur_user.id,
                            nickname: cur_user.nickname
                        });
                        method.rmArrElem(_this.onlines, cur_user.id);

                        delete _this.activers[cur_user.id];
                    }
                }, 1000);
            }
        });
    }
};

module.exports = communicate;