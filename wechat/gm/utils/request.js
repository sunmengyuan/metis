import { server, version, release } from '../settings/export'
import { getBaseInfo } from 'baseInfo'

module.exports = (opts = {}) => {
    const BaseInfo = getBaseInfo();
    const Tracks = `?t=${(new Date()).valueOf()}&xcx_version=${version}&release=${release}&platform=xcx&system=${BaseInfo.system}&wechat=${BaseInfo.wechat}&lat=${BaseInfo.lat || 0}&lng=${BaseInfo.lng || 0}`;
    var successFn = opts.successFn || function () {};
    var failFn = opts.failFn || function () {};
    var completeFn = opts.completeFn || function () {};
    var errorFn = () => {
        if (opts.errorFn) {
            opts.errorFn();
        } else {
            wx.showToast({
                title: '网络错误',
                icon: 'loading'
            });
        }
    };
    wx.request({
        url: server + opts.url + Tracks,
        data: {
            ...opts.params
        },
        method: opts.method || 'GET',
        success: (res) => {
            switch (res.statusCode) {
            case 200:
                (res.data.error == 0) ? successFn(res.data) : failFn(res.data);
                break;
            default:
                errorFn();
                break;
            }
        },
        fail: () => {
            errorFn();
        },
        complete: () => {
            completeFn();
        }
    });
}
