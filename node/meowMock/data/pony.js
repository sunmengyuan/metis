var type = require('../type');

module.exports = {
    chatList: {
        url: '/chatlist/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 99,
                    list: type.list({
                        length: 10,
                        data: function () {
                            return {
                                type: 'message',
                                spoker: type.string([
                                    'user',
                                    'doctor'
                                ]),
                                time: type.id(),
                                content: type.string({
                                    minL: 10,
                                    maxL: 100
                                })
                            }
                        }
                    })
                }
            }
        }
    }
}