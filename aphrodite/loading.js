/**
 * Created by sunmy on 15/9/21.
 */

/* 使用说明
loading({
    percent: '.js_percent',
    inditron: '.js_inditron',
    container: '.js_loading',

    randomMin: 5,
    randomMax: 12,
    interval: 800
});
*/

function loading (opt) {

    var main = {

        random: null,

        do: function () {
            var _this = this;
            var percent = 0;
            var $percent = $(opt.percent);
            var interval = opt.interval || 500;

            var setPercent = setInterval(function () {
                _this.createRandom();
                percent += _this.random;
                $percent.text(percent + '%');
                _this.progress(percent);

                if (percent > 99) {
                    clearInterval(setPercent);
                    $percent.text(100 + '%');
                }

            }, interval);
        },
        createRandom: function () {
            var _this = this;
            var min = opt.randomMin || 0;
            var max = opt.randomMax || 10;
            _this.random = parseInt(Math.random() * (max - min + 1) + min);
        },
        progress: function (percent) {
            var $inditron = $(opt.inditron);
            var total = $(opt.container).width();

            $inditron.width((percent / 100) * total);
            if (percent > 99) {
                $inditron.width(total);
            }
        }
    };

    main.do();
}