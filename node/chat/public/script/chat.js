/**
 * Created by sunmy on 16/7/26.
 */

var chat = {

    news: $('.js_news'),
    message: $('.js_message'),
    members: $('.js_members'),

    do: function () {
        var _this = this;
        _this.handleEvents();
        _this.sendMessage();
        _this.resendMessage();
        _this.showMemberInfo();
    },
    handleEvents: function () {
        var _this = this;
        socket.on('online', function (data) {
            _this.sendNews(data, '进入聊天室');

            var $user = $('#user_' + data.id);
            if ($user.length) {
                $user.removeClass('offline').addClass('online');
            } else {
                $user = $('#module_member').html()
                    .replace('$id', data.id)
                    .replace('$status', 'online')
                    .replace('$nickname', data.nickname)
                    .replace('$info', JSON.stringify(data));
            }
            _this.members.prepend($user);
        });
        socket.on('offline', function (data) {
            _this.sendNews(data, '离开聊天室');

            var $user = $('#user_' + data.id);
            if ($user.length) {
                $user.removeClass('online').addClass('offline');
            }
            _this.members.append($user);
        });
        socket.on('message', function (data) {
            $('.js_active').removeClass('failed').find('p').removeClass('js_resend');

            if (global.cur_user.id != data.user.id) {
                var $item = $('#module_message').html()
                    .replace('$view', 'other')
                    .replace('$nickname', data.user.nickname)
                    .replace('$message', data.message);
                _this.message.append($item);
                _this.scrolling();
            }
        });
        socket.on('failed', function () {
            var judge = $('.js_active').length;
            if (!judge) {
                _this.message.find('li').last().addClass('failed')
                             .find('p').addClass('js_resend');
            }
            main.showTips('消息发送失败 点击消息重新发送');
        });
    },
    scrolling: function () {
        var totalHeight = $body.height();
        var winHeight = window.innerHeight;
        var distance = totalHeight - winHeight;

        $body.scrollTop(distance);
    },
    sendNews: function (data, news) {
        var _this = this;
        var id = (new Date()).valueOf().toString();
        var $item = $('#module_news').html()
            .replace('$id', id)
            .replace('$nickname', data.nickname)
            .replace('$news', news);
        _this.news.append($item);

        var t = setTimeout(function () {
            $('#' + id).slideUp(function () {
                $(this).remove();
            });
        }, 5000);
    },
    sendMessage: function () {
        var _this = this;
        var $btn = $('.js_send');
        var $input = $('.js_input');
        var method = function () {
            var value = $input.val();
            var cur_user = global.cur_user;

            if (value) {
                $('.js_active').removeClass('js_active');

                socket.emit('message', {
                    user: {
                        id: cur_user.id,
                        nickname: cur_user.nickname
                    },
                    message: value
                });
                $input.val('');

                var $item = $('#module_message').html()
                    .replace('$view', 'self')
                    .replace('$nickname', '我')
                    .replace('$message', value);
                _this.message.append($item);
                _this.scrolling();
            }
        };

        $btn.on('click', function () {
            method();
        });
        $input.on('keydown', function (e) {
            $('.js_dialog').length || (e.keyCode == '13') && method();
        });
    },
    resendMessage: function () {
        $body.on('click', '.js_resend', function () {
            var _self = $(this);
            var value = _self.text();
            var cur_user = global.cur_user;

            _self.parents('li').addClass('js_active').siblings().removeClass('js_active');
            socket.emit('message', {
                user: {
                    id: cur_user.id,
                    nickname: cur_user.nickname
                },
                message: value
            });
        });
    },
    showMemberInfo: function () {
        var _this = this;
        _this.members.on('click', 'a', function () {
            $('.js_mask').remove();

            var _self = $(this);
            var info = _self.parent().data('info');
            var $item = $('#module_userinfo').html()
                .replace('$nickname', info.nickname)
                .replace('$sex', info.sex || '保密')
                .replace('$tel', info.tel || '保密')
                .replace('$qq', info.qq || '保密')
                .replace('$intro', info.intro || info.nickname + '没有留下个人描述');
            $body.append($item);
        });
        $body.on('click', function (e) {
            $(e.target).parent().hasClass('js_user') || $('.js_mask').remove();
        });
    }
};

chat.do();