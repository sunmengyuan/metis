var fs = require('fs');
var formidable = require('formidable');

var upload = {
    method: function (req, res, key) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.end(JSON.stringify({
                    message: '网络错误',
                    status: 0
                }));
            } else {
                var timestamp = (new Date()).valueOf();
                var url = '/' + key + '/' + timestamp + '_' + files[key].name;
                var tmp_path = files[key].path;
                var target_path = '../upload' + url;
                fs.renameSync(tmp_path, target_path);

                res.end(JSON.stringify({
                    message: '上传成功',
                    status: 1,
                    url: url
                }));
            }
        });
    },
    portrait: function (req, res) {
        this.method(req, res, 'portrait');
    },
    cover: function (req, res) {
        this.method(req, res, 'cover');
    }
};

module.exports = upload;