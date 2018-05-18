/**
 * Created by sunmy on 15/9/28.
 */

/* 使用说明
var imgs = imgReader({
    input: '.js_imgs',
    previewer: '.js_previewer'
});
*/

function imgReader (opt) {

    var $input = $(opt.input);
    var $previewer = $(opt.previewer);
    var main = {

        imgs: null,
        results: [],

        do: function () {
            var _this = this;
            _this.selectImgs();
            _this.removeImgs();
        },
        selectImgs: function () {
            var _this = this;
            $input.on('change', function (e) {
                _this.imgs = e.target.files;
                _this.readImgs();
            });
        },
        previewImgs: function (i, data) {
            var _this = this;
            var $img = $(document.createElement('img'));
            var $em = $(document.createElement('em'));
            var $i = $(document.createElement('i'));
            var $span = $(document.createElement('span'));

            $img.attr('src', data);
            $span.text('remove');
            $em.text(_this.imgs[i].name);
            $i.text((_this.imgs[i].size / 1024).toFixed(2) + 'kB');
            $previewer.append([$img, $em, $i, $span]);
        },
        readImgs: function () {
            var _this = this;
            var index = 0;
            for (var i = 0;i < _this.imgs.length;i++) {
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    var imgData = e.target.result;
                    _this.previewImgs(index, imgData);
                    index += 1;
                };
                fileReader.readAsDataURL(_this.imgs[i]);

                _this.results.push(_this.imgs[i]);
            }
        },
        removeImgs: function () {
            var _this = this;
            $previewer.on('click', 'span', function () {
                var _self = $(this);
                var num = _self.index();
                var index = (num / 4) >> 0;

                $previewer.find('img').eq(index).remove();
                $previewer.find('em').eq(index).remove();
                $previewer.find('i').eq(index).remove();
                _self.remove();
                _this.results.splice(index, 1);
            });
        }
    };

    main.do();

    return main.results;
}