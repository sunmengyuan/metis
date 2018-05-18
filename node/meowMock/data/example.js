var type = require('../type');

module.exports = {
    example1: {
        url: '/example1/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    id: type.id(),
                    number: type.number({
                        min: 288,
                        max: 999
                    }),
                    bool: type.bool(),
                    string1: type.string([
                        '文案一',
                        '文案二',
                        '文案三'
                    ]),
                    string2: type.string({
                        minL: 5,
                        maxL: 16
                    }),
                    image1: type.image([
                        'http://oij8a9ql4.bkt.clouddn.com/default-fe.jpg',
                        'http://osm0bpix4.bkt.clouddn.com/thumb.jpg'
                    ]),
                    image2: type.image({
                        type: '-thumb'
                    }),
                    list1: type.list({
                        length: 5,
                        data: function () {
                            return type.number()
                        }
                    }),
                    list2: type.list({
                        length: 22,
                        index: {
                            name: 'idx',
                            format: '0\d'
                        },
                        data: function () {
                            return {
                                pro1: type.number(),
                                pro2: type.string()
                            }
                        }
                    })
                }
            }
        }
    },
    example2: {
        url: '/example2/_data',
        type: 'GET',
        list_name: 'items',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                items: type.list({
                    length: 36,
                    index: {
                        name: 'idx',
                        format: '0\d'
                    },
                    data: function () {
                        return {
                            id: type.id(),
                            number: type.number(),
                            string: type.string(),
                            image: type.image()
                        }
                    }
                })
            }
        }
    },
    example3: {
        url: '/example3/_data',
        type: 'POST',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    string: type.string()
                }
            }
        }
    }
}