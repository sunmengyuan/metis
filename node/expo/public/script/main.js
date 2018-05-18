/**
 * Created by sunmy on 16/4/29.
 */

var $body = $('body');

var main = {
    do: function () {
        var _this = this;
        _this.commonCtrl();
    },
    commonCtrl: function () {
        $body.on('click', '.js_close', function (e) {
            $('.js_dialog').remove();
        });
        $body.on('click', '.js_goto', function (e) {
            e.preventDefault();
            location.href = e.target.href;
        });
        $body.on('click', '.js_back', function () {
            history.back();
        });
        $body.on('keydown', function (e) {
            if ($('.js_dialog').length && (e.keyCode == '13')) {
                var t = setTimeout(function () {
                    $('.js_dialog').find('a').trigger('click');
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
            case 1001: // 未登录
                _this.showDialog({
                    message: message,
                    href: '/',
                    btnClass: 'js_goto'
                });
                break;
        }
    },
    showDialog: function (opt) {
        var $dialog = $('#module_dialog').html()
            .replace('$message', opt.message)
            .replace('$href', opt.href || 'javascript:;')
            .replace('$btnClass', opt.btnClass || 'js_close');
        $body.append($dialog);
    },
    loadmore: function (opt) {
        var _this = this;
        var t = null;
        var page = 1;
        var $loadmore = $('.js_loadmore');
        var $loading = $('.js_loading');
        var request = function (page) {
            $.ajax({
                url: opt.url + '&page=' + page,
                type: 'POST',
                success: function (res) {
                    var data = JSON.parse(res);
                    $('#' + opt.tmpl)
                        .tmpl(data)
                        .appendTo(opt.to);

                    switch (data.status) {
                        case 0:
                            break;
                        case 1:
                            var length = data.data.length;
                            (length <= 10 && !page) && $loading.hide();

                            if (length) {
                                $loading.text('没有更多了');
                                opt.complete && opt.complete();
                            } else {
                                $loading.hide();
                                opt.empty && opt.empty();
                            }
                            $loadmore.unbind('click');
                            break;
                    }
                },
                error: function () {
                    _this.showDialog({message: '网络错误'});
                }
            });
        };

        // 渲染首分页
        request(0);

        $loadmore.on('click', function () {
            request(page);
        });

        $(window).on('scroll', function () {
            if (t == null) {
                t = setTimeout(function () {
                    var scrollTop = $body.scrollTop();
                    var totalHeight = $body.height();
                    var screenHeight = window.innerHeight;

                    // 上拉至底
                    if (totalHeight - scrollTop < screenHeight + 20) {
                        $loadmore.trigger('click');
                        page++;
                    }
                    t = null;
                }, 500);
            }
        });
    }
};

main.do();