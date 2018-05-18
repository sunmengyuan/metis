import Common from '../../utils/common'
import Loadmore from '../../utils/loadmore'

const app = getApp();
Page({
    data: {
        /**
         * list1 加载完毕后加载 list2
         * 请关注 onReachBottom、loadList1 内 completeFn
         */
        curList: 'list1',
        // 与页面渲染相关的 data 请定义于 render 内
        render: {
            /**
             * list 无数据时调用通用占位图
             * data 内 empty 字段名已被征用，类似于关键字，不可重复定义
             * 请关注 loadList1 内 nodataFn
             */
            empty: {
                show: false,
                message: '无相关美购'
            },
            serviceList1: [],
            serviceList2: [],
            // 控制列表加载底部 loading 动画，通过赋值 true 或 false 转化状态
            loading: true
        },
        // 筛选器参数
        fliters: {
            area: '',
            tag: '',
            order: ''
        }
    },
    // 注册 Common 内通用 Function
    ...Common,
    onLoad: function () {
        // 一个网络请求示例
        this.exampleRequest();

        // 一个联动列表加载示例
        this.loadList1();

        // 一个 Toast 示例
        app.showToast(this, {
            message: '我是呆恋小喵',
            duration: 3000,
            type: 'common'
        });
    },
    onPullDownRefresh: function () {
        /**
         * 网络请求错误时，下拉页面调用 reload
         * app.reload(this) 也可在其它应用场景调用
         * app.reload(this, callback) 支持传入 callback 定义需要刷新的内容
         */
        app.reload(this);
    },
    onReachBottom: function () {
        switch (this.data.curList) {
            case 'list1':
                this.loadList1();
                break;
            case 'list2':
                this.loadList2();
                break;
        }
    },
    onPageScroll: function (obj) {
        // 调起返回置顶监听
        app.gotop(this, obj);
    },
    exampleRequest: function () {
        app.request({
            url: '/api/service/detail/v1',
            method: 'GET',
            params: {
                service_id: 235
            },
            successFn: (data) => {
                console.log(data);
            },
            errorFn: () => {
                /**
                 * 网络请求错误时调用通用占位页，须根据业务场景自行决定是否定义 errorFn
                 * data 内 reqError 字段名已被征用，类似于关键字，不可重复定义
                 * 请尝试修改 url 体验网络请求错误时的效果
                 */
                this.setData({
                    reqError: true
                });
            }
        });
    },
    loadList1: function () {
        const _page = this;
        Loadmore.loadData(_page, {
            url: '/hybrid/promotion/_data',
            params: {
                service_id: 235,
                // 筛选器参数
                ..._page.data.fliters
            },
            callbackFn: (data) => {
                var list = _page.data.render.serviceList1;
                list = list.concat(data);
                _page.setData({
                    'render.serviceList1': list
                });
            },
            // list1 加载完毕后加载 list2
            completeFn: () => {
                // 联动加载必须初始化 Loadmore
                Loadmore.clear(_page);
                _page.setData({
                    curList: 'list2'
                });
                _page.loadList2();
            },
            nodataFn: () => {
                // list1 无数据时调用通用占位图
                _page.setData({
                    'render.empty.show': true
                });
            }
        });
    },
    loadList2: function () {
        const _page = this;
        Loadmore.loadData(_page, {
            url: '/hybrid/promotion/favor_service/_data',
            params: {
                service_id: 230
            },
            callbackFn: (data) => {
                var list = _page.data.render.serviceList2;
                list = list.concat(data);
                _page.setData({
                    'render.serviceList2': list
                });
            },
            completeFn: () => {
                _page.setData({
                    // 控制列表加载底部 loading 动画
                    'render.loading': false
                });
            }
        });
    },
    triggerFliter (e) {
        Loadmore.clear(this);
        this.setData({
            // 获取筛选器参数
            fliters: e.detail,
            curList: 'list1',
            'render.empty.show': false,
            'render.loading': true,
            'render.serviceList1': [],
            'render.serviceList2': []
        });
        this.loadList1();
    }
});
