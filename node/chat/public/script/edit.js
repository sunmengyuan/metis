/**
 * Created by sunmy on 16/7/26.
 */

var edit = {
    user: {
        do: function () {
            var _this = this;
            var cur_user = global.cur_user;

            _this.firstime = main.getUrlParam('firstime');

            $('.js_password').on('click', function () {
                $(this).toggleClass('up');
                $(this).next().slideToggle();
            });
            $('.js_enter').on('click', function () {
                if (_this.firstime) {
                    socket.emit('online', {
                        id: cur_user.id,
                        nickname: cur_user.nickname
                    });
                }
            });
            _this.info();
        },
        info: function () {
            var _this = this;
            var $btn = $('.js_myinfo');
            var $form = $('#form_myinfo');
            var method = function () {
                var $newPassword = $('#password_new');
                var $oldPassword = $('#password_old');
                var reset = function () {
                    $oldPassword.attr('name', '');
                    $newPassword.attr('name', '');
                };

                if ($oldPassword.val() && $newPassword.val()) {
                    $oldPassword.attr('name', 'password_old');
                    $newPassword.attr('name', 'password');
                }
                if (Boolean($oldPassword.val()) ^ Boolean($newPassword.val())) {
                    reset();

                    main.showDialog({message: '原密码 & 新密码 均不能为空'});
                } else {
                    var nickname = $('#nickname').val();
                    if (nickname) {
                        $.ajax({
                            url: '/edit/user/info',
                            type: 'POST',
                            data: $form.serialize(),
                            success: function (data) {
                                !JSON.parse(data).status && reset();

                                main.showResult(data, function () {
                                    if (_this.firstime) {
                                        socket.emit('online', {
                                            id: global.cur_user.id,
                                            nickname: nickname
                                        });
                                    }
                                    location.href = '/chatroom';
                                });
                            },
                            error: function () {
                                reset();

                                main.showDialog({message: '提交失败'});
                            }
                        });
                    } else {
                        reset();

                        main.showDialog({message: '用户名不得为空'});
                    }
                }
            };
            $btn.on('click', function () {
                method();
            });
            $body.on('keydown', function (e) {
                $('.js_dialog').length || (e.keyCode == '13') && method();
            });
        }
    }
};

edit.user.do();