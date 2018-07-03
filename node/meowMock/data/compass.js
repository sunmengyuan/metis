var type = require('../type');

module.exports = {
    appointCalendar: {
        url: '/appoint/calendar',
        type: 'GET',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                data: [
                    {
                        date: '2018-05-01',
                        reservationCount: type.number({
                            min: 150,
                            max: 200
                        })
                    },
                    {
                        date: '2018-05-11',
                        reservationCount: type.number()
                    },
                    {
                        date: '2018-05-20',
                        reservationCount: type.number()
                    }
                ]
            }
        }
    },
    appointList: {
        url: '/appoint/list',
        type: 'GET',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                page: {
                    total: 10,
                    offset: 0,
                    limit: 10
                },
                data: type.list({
                    length: 10,
                    data: function () {
                        return {
                            id: type.id(),
                            poiId: type.id(),
                            poiName: type.string(),
                            poiAddr: type.string({
                                minL: 20,
                                maxL: 100
                            }),
                            status: type.number({
                                min: 0,
                                max: 1
                            }),
                            geoPoint: {
                                lat: +('39.' + type.number({
                                    min: 9000,
                                    max: 10000
                                })),
                                lon: +('116.' + type.number({
                                    min: 4000,
                                    max: 5000
                                }))
                            }
                        }
                    }
                })
            }
        }
    },
    appointListLeader: {
        url: '/appoint/list/leader',
        type: 'GET',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                page: {
                    total: 10,
                    offset: 0,
                    limit: 10
                },
                data: type.list({
                    length: 200,
                    data: function () {
                        return {
                            id: type.id(),
                            name: type.string(),
                            orderCount: type.number(),
                            visitCount: type.number()
                        }
                    }
                })
            }
        }
    },
    appointListSuper: {
        url: '/appoint/list/super',
        type: 'GET',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                page: {
                    total: 10,
                    offset: 0,
                    limit: 10
                },
                data: type.list({
                    length: 200,
                    data: function () {
                        return {
                            id: type.id(),
                            name: type.string(),
                            orderCount: type.number(),
                            visitCount: type.number()
                        }
                    }
                })
            }
        }
    },
    appointListDetail: {
        url: '/appoint/list/detail',
        type: 'GET',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                page: {
                    total: 10,
                    offset: 0,
                    limit: 10
                },
                data: type.list({
                    length: 200,
                    data: function () {
                        return {
                            bdName: type.string(),
                            poiId: type.id(),
                            poiName: type.string(),
                            poiAddr: type.string({
                                minL: 50,
                                maxL: 200
                            }),
                            plan: type.string(),
                            checkInStatus: type.number({
                                min: 0,
                                max: 1
                            })
                        }
                    }
                })
            }
        }
    },
    appointSignin: {
        url: '/appoint/signin',
        type: 'POST',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                data: 0
            }
        }
    },
    choiceOwnedOrder: {
        url: '/choice/owned/order',
        type: 'POST',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                data: 0
            }
        }
    },
    choiceOwnedPayment: {
        url: '/choice/owned/payment',
        type: 'POST',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                data: 0
            }
        }
    },
    choiceList: {
        url: '/choice/list',
        type: 'GET',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                page: {
                    total: 0,
                    offset: 0,
                    limit: 0
                },
                data: type.list({
                    length: 10,
                    data: function () {
                        return {
                            poiId: type.id(),
                            poiName: type.string(),
                            poiAddr: type.string({
                                minL: 20,
                                maxL: 100
                            }),
                            distance: type.number({
                                min: 800,
                                max: 5000
                            }),
                            geoPoint: {
                                lat: +('39.' + type.number({
                                    min: 9000,
                                    max: 10000
                                })),
                                lon: +('116.' + type.number({
                                    min: 4000,
                                    max: 5000
                                }))
                            },
                            tags: [
                                {
                                    tagId: 1,
                                    tagName: '标签一',
                                    tagValue: true,
                                    tagOrder: 0
                                },
                                {
                                    tagId: 3,
                                    tagName: '标签三',
                                    tagValue: true,
                                    tagOrder: 2
                                },
                                {
                                    tagId: 2,
                                    tagName: '标签二',
                                    tagValue: true,
                                    tagOrder: 1
                                },
                                {
                                    tagId: 4,
                                    tagName: '标签四',
                                    tagValue: false,
                                    tagOrder: 3
                                },
                                {
                                    tagId: 5,
                                    tagName: '标签五',
                                    tagValue: true,
                                    tagOrder: 4
                                }
                            ],
                            pv: type.number({
                                min: 800,
                                max: 5000
                            }),
                            remark: type.number({
                                min: 800,
                                max: 5000
                            }),
                            grouponAmount: type.number({
                                min: 800,
                                max: 5000
                            }),
                            zcm: type.bool(),
                            secpay: type.bool()
                        }
                    }
                })
            }
        }
    },
    choiceVisitList: {
        url: '/choice/visit/list',
        type: 'GET',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                page: {
                    total: 10,
                    offset: 0,
                    limit: 10
                },
                data: type.list({
                    length: 10,
                    data: function () {
                        return {
                            intention: type.number({
                                min: 0,
                                max: 4
                            }),
                            reservation: type.number({
                                min: 0,
                                max: 1
                            }),
                            date: type.string(),
                            bdId: type.id(),
                            bdName: type.string({
                                minL: 2,
                                maxL: 4
                            })
                        }
                    }
                })
            }
        }
    },
    choiceSettingFilter: {
        url: '/choice/setting/filter',
        type: 'POST',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                data: 0
            }
        }
    },
    choiceSettingStrategy: {
        url: '/choice/setting/strategy',
        type: 'POST',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                data: 0
            }
        }
    },
    choiceSettingFetch: {
        url: '/choice/setting/fetch',
        type: 'GET',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                bdConf: {
                    id: type.id(),
                    // filter: '{"query":{"bool":{"must_not":[{"term":{"cate_one_id":1}},{"term":{"hava_kp_tag":1}}],"filter":[{"terms":{"close_status":[7,6]}},{"geo_distance":{"distance":"1500m","gis_location":{"lat":39.941,"lon":116.439}}},{"terms":{"publicorprivate_sea_zcm":[1]}},{"terms":{"publicorprivate_sea_secpay":[1,2]}},{"term":{"have_new_mdc_poi":1}},{"term":{"have_kateam_tag":1}},{"term":{"have_headwaist_tag":1}}]}}}', // jsonString
                    filter: '',
                    currentStragegy: type.number({
                        min: 0,
                        max: 7
                    }),
                    strategys: [
                        {
                            id: 0,
                            name: type.string()
                        },
                        {
                            id: 1,
                            name: type.string()
                        },
                        {
                            id: 2,
                            name: type.string()
                        },
                        {
                            id: 3,
                            name: type.string()
                        },
                        {
                            id: 4,
                            name: type.string()
                        },
                        {
                            id: 5,
                            name: type.string()
                        },
                        {
                            id: 6,
                            name: type.string()
                        },
                        {
                            id: 7,
                            name: type.string()
                        }
                    ]
                }
            }
        }
    },
    appointCreate: {
        url: '/appoint/create',
        type: 'POST',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                data: 0
            }
        }
    },
    merchantSearch: {
        url: '/merchant/search',
        type: 'GET',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                page: {
                    total: 0,
                    offset: 0,
                    limit: 0
                },
                data: type.list({
                    length: 10,
                    data: function () {
                        return {
                            poiId: type.id(),
                            poiName: type.string(),
                            poiAddr: type.string({
                                minL: 20,
                                maxL: 100
                            }),
                            distance: type.number({
                                min: 800,
                                max: 5000
                            }),
                            geoPoint: {
                                lat: +('39.' + type.number({
                                    min: 9000,
                                    max: 10000
                                })),
                                lon: +('116.' + type.number({
                                    min: 4000,
                                    max: 5000
                                }))
                            },
                            tags: [
                                {
                                    tagId: 1,
                                    tagName: '标签一',
                                    tagValue: true,
                                    tagOrder: null
                                },
                                {
                                    tagId: 3,
                                    tagName: '标签三',
                                    tagValue: true,
                                    tagOrder: 2
                                },
                                {
                                    tagId: 2,
                                    tagName: '标签二',
                                    tagValue: true,
                                    tagOrder: 1
                                },
                                {
                                    tagId: 4,
                                    tagName: '标签四',
                                    tagValue: false,
                                    tagOrder: 3
                                },
                                {
                                    tagId: 5,
                                    tagName: '标签五',
                                    tagValue: true,
                                    tagOrder: 4
                                }
                            ],
                            pv: type.number({
                                min: 800,
                                max: 5000
                            }),
                            remark: type.number({
                                min: 800,
                                max: 5000
                            }),
                            grouponAmount: type.number({
                                min: 800,
                                max: 5000
                            }),
                            zcm: type.bool(),
                            secpay: type.bool()
                        }
                    }
                })
            }
        }
    },
    choiceVisitCreate: {
        url: '/choice/visit/create',
        type: 'POST',
        data: function () {
            return {
                success: true,
                status: {
                    code: '',
                    message: ''
                },
                data: 0
            }
        }
    }
}