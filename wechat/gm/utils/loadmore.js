import Request from 'request'

const Loadmore = {
    loadData: (page, opts = {}) => {
        var callbackFn = opts.callbackFn || function () {};
        var completeFn = opts.completeFn || function () {};
        var nodataFn = opts.nodataFn || function () {};
        var failFn = opts.failFn || function () {};
        var errorFn = opts.errorFn || function () {};
        var _Loadmore = page.data._Loadmore;
        var status = {
            page: (_Loadmore && _Loadmore.page) || 1,
            start_num: (_Loadmore && _Loadmore.start_num) || 0,
            flag: ((_Loadmore && _Loadmore.flag) != undefined)
                ? _Loadmore.flag
                : true
        };
        if (status.flag) {
            Request({
                url: opts.url,
                params: {
                    ...opts.params,
                    page: status.page,
                    start_num: status.start_num
                },
                successFn: (data) => {
                    callbackFn(data.data);
                    page.setData({
                        '_Loadmore.page': status.page + 1,
                        '_Loadmore.start_num': status.start_num + 10
                    });
                    if (data.data.length < 10) {
                        if ((status.page == 1) || (status.start_num == 0)) {
                            page.setData({
                                '_Loadmore.flag': false
                            });
                            completeFn();
                        }
                    }
                },
                failFn: (data) => {
                    var isNull = (data.error == 1)
                        || (data.data == null)
                        || ((data.data instanceof Array) && !data.data.length)
                        || (JSON.stringify(data.data) == '{}')
                    if (isNull) {
                        page.setData({
                            '_Loadmore.flag': false
                        });
                        if ((status.page == 1) || (status.start_num == 0)) {
                            nodataFn();
                        }
                        completeFn();
                    }
                    failFn();
                },
                errorFn: () => {
                    if ((status.page == 1) || (status.start_num == 0)) {
                        errorFn();
                    }
                }
            });
        }
    },
    clear: (page) => {
        page.setData({
            '_Loadmore.flag': true,
            '_Loadmore.page': 1,
            '_Loadmore.start_num': 0
        });
    }
}

module.exports = Loadmore;
