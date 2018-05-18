/**
 * Created by sunmy on 16/7/25.
 */

var log = {

    do: function () {
        var _this = this;
        _this.login();
        _this.register();
        _this.exit();

        $('.js_switch').on('click', function () {
            var _self = $(this);
            var $current = _self.parents('.js_area');
            var $noncurrent = $current.siblings();

            $current.addClass('shrink');
            $current[0].addEventListener('webkitAnimationEnd', function () {
                $(this).removeClass('shrink').hide()
                    .siblings().addClass('magnify').show();
            }, false);
            $noncurrent[0].addEventListener('webkitAnimationEnd', function () {
                $(this).removeClass('magnify').show()
                    .siblings().hide();
            }, false);
        });
    },
    login: function () {
        var $btn = $('.js_login');
        var $form = $('#form_login');
        var method = function () {
            $.ajax({
                url: '/login',
                type: 'POST',
                data: $form.serialize(),
                success: function (data) {
                    main.showResult(data, function () {
                        var user = JSON.parse(data).user;
                        socket.emit('online', {
                            id: user.id,
                            nickname: user.nickname
                        });
                        location.href = '/chatroom';
                    });
                },
                error: function () {
                    main.showDialog({message: '登录失败'});
                }
            });
        };
        $btn.on('click', function () {
            method();
        });
        $body.on('keydown', function (e) {
            if ($form.length && $form.parent().is(':visible')) {
                $('.js_dialog').length || (e.keyCode == '13') && method();
            }
        });
    },
    register: function () {
        var $btn = $('.js_register');
        var $form = $('#form_register');
        var method = function () {
            var nickname = $('#nickname').val();
            var password = $('#password').val();

            if (nickname && password) {
                $.ajax({
                    url: '/register',
                    type: 'POST',
                    data: $form.serialize(),
                    success: function (data) {
                        main.showResult(data, function () {
                            location.href = '/edit/myinfo?firstime=1';
                        });
                    },
                    error: function () {
                        main.showDialog({message: '注册失败'});
                    }
                });
            } else {
                main.showDialog({message: '用户名或密码不得为空'});
            }
        };
        $btn.on('click', function () {
            method();
        });
        $body.on('keydown', function (e) {
            if ($form.length && $form.parent().is(':visible')) {
                $('.js_dialog').length || (e.keyCode == '13') && method();
            }
        });
    },
    exit: function () {
        var $btn = $('.js_exit');
        $btn.on('click', function () {
            $.ajax({
                url: '/exit',
                type: 'POST',
                success: function (data) {
                    main.showResult(data, function () {
                        location.href = '/';
                    });
                },
                error: function () {
                    main.showDialog({message: '无法退出登录'});
                }
            });
        });
    }
};

log.do();