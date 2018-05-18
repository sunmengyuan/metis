/**
 * Created by sunmy on 15/12/12.
 */

/* 使用说明
scrolling.do({
    initPos: 0,
    endPos: 1000
});
*/

var scrolling = {

    pos: null,
    endPos: null,

    do: function (opt) {
        var _this = this;

        _this.pos = opt.initPos;
        _this.endPos = opt.endPos;
        _this.scrollEvent();
    },
    scrollEvent: function () {
        var _this = this;
        var $body = $('body');
        var interval = setInterval(function () {
            var dPos = (_this.endPos - _this.pos) / 10;

            if (dPos < 0.2) {
                _this.pos = _this.endPos;
                clearInterval(interval);
            }
            _this.pos += dPos;
            $body.scrollTop(_this.pos);

        }, 16);
    }
};