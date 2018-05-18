/**
 * Created by sunmy on 16/5/6.
 */

var index = {
    do: function () {
        var _this = this;
        _this.login();
        _this.switch(); // 切换账号
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
                        location.href = '/';
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
            if ($form.find('input').val()) {
                $('.js_dialog').length || (e.keyCode == '13') && method();
            }
        });
    },
    switch: function () {
        $('.js_switch').on('click', function () {
            $.ajax({
                url: '/exit',
                type: 'POST',
                success: function (data) {
                    main.showResult(data, function () {
                        location.href = '/';
                    });
                },
                error: function () {
                    main.showDialog({message: '报错啦'});
                }
            });
        });
    }
};

index.do();