import { getBaseInfo } from 'utils/baseInfo'
import Request from 'utils/request'
import Toast from 'utils/toast'

App({
    GLOBAL: {
        baseInfo: getBaseInfo()
    },
    request: function (params) {
        Request(params);
    },
    reload: function (page, callback) {
        page.setData({
            reqError: false
        });
        callback && callback();
        page.onLoad();
        page.onReady();
    },
    gotop: function (page, obj) {
        if (obj.scrollTop > this.GLOBAL.baseInfo.winHeight) {
            page.setData({
                'render.gotop': true
            });
        } else {
            page.setData({
                'render.gotop': false
            });
        }
    },
    showToast: function (page, opts) {
        Toast.show(page, opts);
    },
    onLaunch: function (opts) {},
    onShow: function () {},
    onHide: function () {},
    onError: function () {}
});
