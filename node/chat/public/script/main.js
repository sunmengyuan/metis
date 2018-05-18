/**
 * Created by sunmy on 16/7/14.
 */

var socket = io.connect();
var $body = $('body');

var main = {
    do: function () {
        var _this = this;
        _this.commonCtrl();
    },
    commonCtrl: function () {
        $body.on('click', '.js_close', function () {
            $('.js_dialog').remove();
        });
        $body.on('keydown', function (e) {
            if ($('.js_dialog').length && (e.keyCode == '13')) {
                var t = setTimeout(function () {
                    $('.js_close').trigger('click');
                }, 0);
            }
        });
    },
    showResult: function (data, callback) {
        var _this = this;
        var status = JSON.parse(data).status;
        var message = JSON.parse(data).message;

        switch (status) {
            case 0: // 操作失败
                _this.showDialog({message: message});
                break;
            case 1: // 操作成功
                callback(message);
                break;
        }
    },
    showDialog: function (opt) {
        $('.js_dialog').remove();

        var $dialog = $('#module_dialog').html()
            .replace('$message', opt.message)
            .replace('$btnClass', opt.btnClass || 'js_close');
        $body.append($dialog);
    },
    showTips: function (message) {
        $('.js_tips').remove();

        var $tips = $('#module_tips').html()
            .replace('$message', message);
        $body.append($tips);

        var t = setTimeout(function () {
            $('.js_tips').fadeOut(function () {
                $(this).remove();
            });
        }, 3000);
    },
    getUrlParam: function (key) {
        var search = location.search;
        var tmp = search && search.substr(1).split('&');
        for (var i = 0;i < tmp.length;i++) {
            if (tmp[i].substring(0, tmp[i].indexOf('=')) === key) {
                var value = tmp[i].substr(tmp[i].indexOf('=') + 1);
                break;
            }
        }
        return value;
    }
};

main.do();