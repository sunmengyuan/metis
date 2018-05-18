var method = require('./method');

module.exports = {

    router: null,
    getRequestCache: {},

    createGetRequest: function (requestObj) {
        var _this = this;
        this.router.get(requestObj.url, function (req, res) {
            var requestUrl = req.originalUrl;
            if (_this.getRequestCache[requestUrl]) {
                responseData = _this.getRequestCache[requestUrl];
            } else {
                var responseData = method.faultTolerant(requestObj.data);
                var listName = requestObj.list_name || 'data';
                if (responseData[listName] instanceof Array) {
                    var start_num = req.query.start_num >> 0;
                    var count = req.query.count >> 0 || 10;
                    var page = req.query.page >> 0 || 1;
                    (req.query.start_num !== undefined) && (responseData[listName] = responseData[listName].slice(start_num, start_num + count));
                    (req.query.page !== undefined) && (responseData[listName] = responseData[listName].slice((page - 1) * count, (page - 1) * count + count));
                }
                _this.getRequestCache[requestUrl] = responseData;
            }

            res.end(JSON.stringify(responseData));
        });
    },
    createPostRequest: function (requestObj) {
        this.router.post(requestObj.url, function (req, res) {
            var responseData = method.faultTolerant(requestObj.data);
            console.log(req.body)
            res.end(JSON.stringify(responseData));
        });
    },
    do: function (router, requestGatherLst) {
        this.router = router;
        for (var requestGatherLstI in requestGatherLst) {
            var requestGather = requestGatherLst[requestGatherLstI];
            for (var requestGatherI in requestGather) {
                var requestObj = requestGather[requestGatherI];
                var requestObjType = requestObj.type;
                switch (requestObjType) {
                    case 'GET':
                        this.createGetRequest(requestObj);
                        break;
                    case 'POST':
                        this.createPostRequest(requestObj);
                        break;
                    default:
                        this.createGetRequest(requestObj);
                        break;
                }
            }
        }
    }
}