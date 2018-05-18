/**
 * Created by sunmy on 15/9/15.
 */

/* 使用说明
countdown({
    year: 2016,
    month: 12,
    day: 6,

    daySplit: '天',
    hourSplit: '时',
    minuteSplit: '分',
    secondSplit: '秒'
});
*/

function countdown (opt) {

    var main = {

        ts: null,
        day: null,
        hour: null,
        minute: null,
        second: null,

        do: function () {
            var _this = this;
            _this.setTime();
        },
        setTime: function () {
            var _this = this;
            var $countdown = $('.js_countdown');

            var daySplit = opt.daySplit || '天';
            var hourSplit = opt.hourSplit || '时';
            var minuteSplit = opt.minuteSplit || '分';
            var secondSplit = opt.secondSplit || '秒';

            var t = setInterval(function () {
                _this.calculateTime();

                var time = _this.day + daySplit + _this.hour + hourSplit + _this.minute + minuteSplit + _this.second + secondSplit;
                $countdown.text(time);

                if (_this.ts < 1) {
                    clearInterval(t);
                    $countdown.hide();
                }
            }, 1000);
        },
        calculateTime: function () {
            var _this = this;
            var now = new Date();
            var future = new Date(opt.year, opt.month - 1, opt.day);

            _this.ts = future - now;

            _this.day = (_this.ts / 1000 / 60 / 60 / 24) >> 0;
            _this.hour = (_this.ts / 1000 / 60 / 60 % 24) >> 0;
            _this.minute = (_this.ts / 1000 / 60 % 60) >> 0;
            _this.second = (_this.ts / 1000 % 60) >> 0;

            _this.day = _this.checkTime(_this.day, 0);
            _this.hour = _this.checkTime(_this.hour, 1);
            _this.minute = _this.checkTime(_this.minute, 1);
            _this.second = _this.checkTime(_this.second, 1);
        },
        checkTime: function (time, has_zero) {
            if (has_zero && time < 10) {
                time = '0' + time;
            }
            return time;
        }
    };

    main.do();
}