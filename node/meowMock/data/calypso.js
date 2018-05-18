var type = require('../type');

module.exports = {
    channelTypes: {
        url: '/api/calypso/channel/types',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                default: type.string(),
                data: {
                    types: type.list({
                        length: type.number({
                            min: 3,
                            max: 5
                        }),
                        data: function () {
                            return {
                                value: type.string(),
                                label: type.string()
                            }
                        }
                    })
                }
            }
        }
    },
    channelStatistic: {
        url: '/api/calypso/channel/statistic',
        type: 'POST',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {}
            }
        }
    }
}