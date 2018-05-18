/**
 * Created by sunmy on 16/5/24.
 */

var publish = {
    do: function () {
        var $btn = $('.js_publish');
        var $form = $('#form_publish');
        var method = function () {
            var title = $('#title').val();
            var content = $('#content').val();

            var judge = title && content;
            if (judge) {
                $.ajax({
                    url: '/diary/publish',
                    type: 'POST',
                    data: $form.serialize(),
                    success: function (data) {
                        main.showResult(data, function () {
                            location.href = '/profile/' + global.log_user;
                        });
                    },
                    error: function () {
                        main.showDialog({message: '发布失败'});
                    }
                });
            } else {
                main.showDialog({message: '标题 or 正文 呐~'});
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

publish.do();