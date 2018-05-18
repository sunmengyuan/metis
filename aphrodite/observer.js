/**
 * Created by sunmy on 15/11/18.
 */

/* 使用说明
function function1 (a, b) {
    console.log('function1 触发');
    console.log(a + ', ' + b);
}

function function2 () {
    console.log('function2 触发');
}

// 订阅
observer.subscribe('event1', [function1, function2]);
// 发布
observer.publish('event1', ['param1', 'param2']);
// 取消订阅
observer.unsubscribe('event1');
*/

var observer = {

    events: {},

    subscribe: function (event, callback) {
        var _this = this;

        if (typeof event !== 'string') {
            return;
        }

        // 防止重复订阅
        if (!_this.events[event]) {
            _this.events[event] = $.Callbacks('unique');
            _this.events[event].add(callback);
        }
    },
    unsubscribe: function (event) {
        var _this = this;
        if (_this.events[event]) {
            _this.events[event].empty();
        }
    },
    publish: function (event, params) {
        var _this = this;
        if (_this.events[event]) {
            _this.events[event].fireWith(_this, params);
        }
    }
};