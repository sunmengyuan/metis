/**
 * Created by sunmy on 16/5/6.
 */

var profile = {};

profile.init = {
    do: function () {
        var _this = this;
        _this.renderDiaries();
    },
    renderDiaries: function () {
        main.loadmore({
            url: '/diaries?user=' + global.page.cur_user,
            to: '.js_diaries',
            tmpl: 'tmpl_diary',

            empty: function () {
                $('.js_diaries').append($('#module_empty').html());
            }
        });
    }
};

profile.user = {
    do: function () {
        var _this = this;
        _this.edit.do();
        _this.log.do();
        _this.attention();
    },
    edit: {
        do: function () {
            var _this = this;
            _this.info();
            _this.portrait();

            $('.js_edit_userinfo').on('click', function () {
                $('.js_edit_board').parent().show();
            });
            $('.js_cancel').on('click', function () {
                $('.js_edit_board').parent().hide();
            });
        },
        info: function () {
            var $btn = $('.js_userinfo');
            var $form = $('#form_userinfo');
            var method = function () {
                var username = $('#username').val();
                var sex = $('#sex').val();
                var tel = $('#tel').val();
                var qq = $('#qq').val();
                var judge = username && sex && tel && qq;
                if (judge) {
                    $.ajax({
                        url: '/user/edit/info',
                        type: 'POST',
                        data: $form.serialize(),
                        success: function (data) {
                            main.showResult(data, function () {
                                location.reload();
                            });
                        },
                        error: function () {
                            main.showDialog({message: '提交失败'});
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
                if ($('.js_edit_board').parent().is(':visible')) {
                    $('.js_dialog').length || (e.keyCode == '13') && method();
                }
            });
        },
        portrait: function () {
            var $btn = $('.js_portrait');
            var $form = $('#form_portrait');
            $btn.on('change', function () {
                var formData = new FormData($form[0]);
                $.ajax({
                    url: '/user/edit/portrait',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        main.showResult(data, function () {
                            location.reload();
                        });
                    },
                    error: function () {
                        main.showDialog({message: '上传失败'});
                    }
                });
            });
        }
    },
    log: {
        do: function () {
            var _this = this;
            _this.logout();
            _this.exit();
        },
        logout: function () {
            var $btn = $('.js_logout');
            $btn.on('click', function () {
                $.ajax({
                    url: '/logout',
                    type: 'POST',
                    success: function (data) {
                        main.showResult(data, function (message) {
                            main.showDialog({
                                message: message,
                                href: '/',
                                btnClass: 'js_goto'
                            });
                        });
                    },
                    error: function () {
                        main.showDialog({message: '注销失败'});
                    }
                });
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
    },
    attention: function () {

    }
};

profile.diary = {
    do: function () {
        var _this = this;
        _this.edit();
        _this.remove();
        _this.favour();
    },
    edit: function () {

    },
    remove: function () {

    },
    favour: function () {
        $('body').on('click', '.js_fav', function () {
            var _self = $(this);
            var $count = _self.children(':first');
            var $icon = _self.children(':last');
            var id = _self.data('id');
            var is_faved = _self.data('is_faved');
            var count = $count.text() >> 0;

            var cancelFavour = function () {
                $.ajax({
                    url: '/diary/favour/cancel/' + id,
                    type: 'POST',
                    success: function (data) {
                        main.showResult(data, function () {
                            _self.data('is_faved', 0);
                            count--;
                            $count.text(count);
                            $icon.removeClass('ico-faved');
                        });
                    },
                    error: function () {
                        main.showDialog({message: '取消点赞失败'});
                    }
                });
            };
            var verifyFavour = function () {
                $.ajax({
                    url: '/diary/favour/verify/' + id,
                    type: 'POST',
                    success: function (data) {
                        main.showResult(data, function () {
                            _self.data('is_faved', 1);
                            count++;
                            $count.text(count);
                            $icon.addClass('ico-faved');
                        });
                    },
                    error: function () {
                        main.showDialog({message: '点赞失败'});
                    }
                });
            };

            is_faved ? cancelFavour() : verifyFavour();
        });
    }
};

profile.init.do();
profile.user.do();
profile.diary.do();