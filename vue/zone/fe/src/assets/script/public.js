export default {
    fileAnalysis (_this, event, opts) {
        var fileReader = new window.FileReader()
        var file = event.target.files[0]

        _this[opts.action].formData = new window.FormData()
        _this[opts.action].formData.append(opts.key, file)

        fileReader.onload = function (e) {
            var fileData = e.target.result
            _this[opts.action][opts.key] = fileData
        }
        fileReader.readAsDataURL(file)
    },
    getRequest (_this, url, callback) {
        _this.$http.get(url)
            .then((res) => {
                var data = JSON.parse(res.data)
                data.status && callback(data)
            })
    },
    postRequest (_this, opts, callback) {
        _this.$http.post(opts.url, opts.body)
            .then((res) => {
                var data = JSON.parse(res.data)
                if (data.status) {
                    callback(data)
                } else {
                    _this[opts.action].message = data.message
                }
            }, () => {
                _this[opts.action].message = '网络错误'
            })
    },
    loadMore (_this, event, params, callback) {
        var element = event.target.getAttribute('element')
        var page = _this.load[element].page
        var paramStr = ''

        for (var key in params) {
            var value = params[key]
            var tmp = '&' + key + '=' + value
            paramStr += tmp
        }
        page += 1

        var url = _this.serverHostUrl + '/' + element + '?page=' + page + paramStr
        this.getRequest(_this, url, function (data) {
            var status = data.status
            if (status === 2) {
                _this.load[element].show = 0
                _this.load[element].message = '没有更多了'
            }
            _this.load[element].page = page

            callback(data)
        })
    },
    toggleDialog (_this, opts) {
        var obj = _this[opts.action]
        var status = obj.show
        obj.message = ''
        obj.show = status ? 0 : 1

        this.clearObj(_this.$els, opts.clear, 'value')
        this.clearObj(_this[opts.action].body, opts.clear)
    },
    clearObj (obj, lst, key) {
        var k1 = String(Boolean(lst) >> 0)
        var k2 = String(Boolean(key) >> 0)

        switch (k1 + k2) {
            case '11':
                for (var i in lst) {
                    obj[lst[i]][key] = ''
                }
                break
            case '10':
                for (var j in lst) {
                    obj[lst[j]] = ''
                }
                break
            case '00':
                for (var k in obj) {
                    obj[k] = ''
                }
                break
            default:
                break
        }
    }
}
