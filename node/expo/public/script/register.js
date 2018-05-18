/**
 * Created by sunmy on 16/5/6.
 */

var register = {
    do: function () {
        var $btn = $('.js_register');
        var $form = $('#form_register');
        var method = function () {
            var username = $('#username').val();
            var password = $('#password').val();
            var sex = $('#sex').val();
            var tel = $('#tel').val();
            var qq = $('#qq').val();

            var judge = username && password && sex && tel && qq;
            if (judge) {
                $.ajax({
                    url: '/register',
                    type: 'POST',
                    data: $form.serialize(),
                    success: function (data) {
                        main.showResult(data, function () {
                            main.showDialog({
                                message: '注册成功',
                                href: '/profile/' + JSON.parse(data).user.id,
                                btnClass: 'js_goto'
                            });
                        });
                    },
                    error: function () {
                        main.showDialog({message: '注册失败'});
                    }
                });
            } else {
                main.showDialog({message: '含空必填项~'});
            }
        };
        $btn.on('click', function () {
            method();
        });
        $body.on('keydown', function (e) {
            $('.js_dialog').length || (e.keyCode == '13') && method();
        });
    }
};

register.do();