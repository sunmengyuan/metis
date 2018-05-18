/**
 * Created by sunmy on 15/11/3.
 */

/* 使用说明
var files = [];
uploadFiles({
    switch: '.js_upload',
    percent: '.js_percent',
    files: files,
    key: '',
    url: ''
});
*/

function uploadFiles (opt) {

    var $switch = $(opt.switch);
    var $percent = $(opt.percent);
    var main = {

        do: function () {
            var _this = this;
            var files = opt.files;

            $switch.on('click', function () {
                for (var i = 0;i < files.length;i++) {
                    var formData = new FormData();
                    var req = new XMLHttpRequest();

                    formData.append(opt.key, files[i]);

                    req.upload.addEventListener('progress', _this.progress, false);
                    req.upload.addEventListener('load', _this.success, false);
                    req.upload.addEventListener('error', _this.failed, false);
                    req.open('POST', opt.url, true);
                    req.send(formData);
                }
            });
        },
        progress: function (e) {

            // $percent 上传进度

            if (e.lengthComputable) {
                var percent = Math.round(e.loaded * 100 / e.total).toString();
                $percent.text(percent + '%');
            } else {
                $percent.text('无法显示上传进度');
            }
        },
        success: function () {
            // responseText 返回值
        },
        failed: function () {
            console.log('上传失败');
        }
    };

    main.do();
}