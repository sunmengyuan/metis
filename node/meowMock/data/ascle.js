var type = require('../type');

module.exports = {
    diaryList: {
        url: '/diarylist/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 89,
                    list: type.list({
                        length: 10,
                        data: function () {
                            return {
                                create_time: type.string(),
                                id: type.id(),
                                title: type.string(),
                                service_name: type.string(),
                                user: type.string(),
                                doctor_name: type.string(),
                                topic_num: type.number({
                                    min: 100,
                                    max: 1000
                                }),
                                view_num: type.number({
                                    min: 100,
                                    max: 1000
                                }),
                                reply_num: type.number({
                                    min: 100,
                                    max: 1000
                                }),
                                vote_num: type.number({
                                    min: 100,
                                    max: 1000
                                }),
                                content_level: type.string({
                                    minL: 2,
                                    maxL: 4
                                })
                            }
                        }
                    })
                }
            }
        }
    },
    diaryGatherTrans: {
        url: '/diary_gather/trans',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: type.list({
                    length: 26,
                    data: function () {
                        return {
                            id: type.id(),
                            name: type.string()
                        }
                    }
                })
            }
        }
    },
    supplementAll: {
        url: '/supplement/all/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 119,
                    settlements: type.list({
                        length: 10,
                        data: function () {
                            return {
                                id: type.id(),
                                month: type.number({
                                    min: 2001,
                                    max: 2020
                                }) + '-' + type.number({
                                    min: 1,
                                    max: 12
                                }),
                                should_pay: type.number({
                                    min: 100,
                                    max: 9999
                                }),
                                already_pay: type.number({
                                    min: 100,
                                    max: 9999
                                }),
                                loss: type.number({
                                    min: 100,
                                    max: 9999
                                }),
                                profit: type.number({
                                    min: 100,
                                    max: 9999
                                })
                            }
                        }
                    })
                }
            }
        }
    },
    shouldList: {
        url: '/shouldlist/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 99,
                    alread_pay: type.number(),
                    need_pay: type.number(),
                    payment: type.number(),
                    budans: type.list({
                        length: 10,
                        data: function () {
                            return {
                                id: type.id(),
                                order_id: type.id(),
                                username: type.string(),
                                user_phone: type.string(),
                                dev_projects: type.list({
                                    length: 2,
                                    data: function () {
                                        return {
                                            name: type.string(),
                                            money: type.number()
                                        }
                                    }
                                }),
                                create_time: type.string(),
                                extra_consume: type.number(),
                                payment: type.number(),
                                status: type.string()
                            }
                        }
                    })
                }
            }
        }
    },
    alreadyList: {
        url: '/alreadylist/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 78,
                    prices: type.number(),
                    month: type.number({
                        min: 2001,
                        max: 2020
                    }) + '-' + type.number({
                        min: 1,
                        max: 12
                    }),
                    balance: type.number(),
                    orders: type.list({
                        length: 10,
                        data: function () {
                            return {
                                id: type.id(),
                                service_price: type.number(),
                                discount: type.number(),
                                phone: type.string(),
                                validate_time: type.string(),
                                service_name: type.string()
                            }
                        }
                    })
                }
            }
        }
    },
    statementAll: {
        url: '/statement/all/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 92,
                    statements: type.list({
                        length: 10,
                        data: function () {
                            return {
                                id: type.id(),
                                statement_date: type.number({
                                    min: 2001,
                                    max: 2020
                                }) + '-' + type.number({
                                    min: 1,
                                    max: 12
                                }),
                                service_order_num: type.number({
                                    min: 100,
                                    max: 9999
                                }),
                                maidan_order_num: type.number({
                                    min: 100,
                                    max: 9999
                                }),
                                service_settle_amount: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                maidan_settle_amount: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                total_settle_amount: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                status: type.string()
                            }
                        }
                    })
                }
            }
        }
    },
    statementDetail: {
        url: '/statement/detail/:id',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    button_visible: true,
                    service_settle_id: type.id(),
                    maidan_settle_id: type.id(),
                    bank_info: {
                        account_name: type.string(),
                        account_number: type.string(),
                        statement_date: type.string(),
                        bank: type.string()
                    },
                    settle_info: {
                        maidan_settle_info: {
                            original_amount: type.number({
                                min: 1000,
                                max: 99999
                            }),
                            doctor_fee: type.number({
                                min: 1000,
                                max: 99999
                            }),
                            settle_amount: type.number({
                                min: 1000,
                                max: 99999
                            })
                        },
                        service_settle_info: {
                            normal_service_amount: type.number({
                                min: 1000,
                                max: 99999
                            }),
                            fenxiao_service_amount: type.number({
                                min: 1000,
                                max: 99999
                            }),
                            pos_back: type.number({
                                min: 1000,
                                max: 99999
                            }),
                            settle_amount: type.number({
                                min: 1000,
                                max: 99999
                            }),
                        },
                        feededuction_sum: type.number({
                            min: 1000,
                            max: 99999
                        }),
                        total_settle_amount: type.number({
                            min: 1000,
                            max: 99999
                        })
                    }
                }
            }
        }
    },
    statementHospital: {
        url: '/statement/hospital/:id/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 43,
                    doctors: type.list({
                        length: 10,
                        data: function () {
                            return {
                                doctor_id: type.id(),
                                doctor_name: type.string(),
                                service_settle_amount: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                maidan_settle_amount: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                total_settle_amount: type.number({
                                    min: 1000,
                                    max: 99999
                                })
                            }
                        }
                    })
                }
            }
        }
    },
    statementServiceList: {
        url: '/statement/service/:id/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 43,
                    orders: type.list({
                        length: 10,
                        data: function () {
                            return {
                                id: type.id(),
                                name: type.string(),
                                item: type.string(),
                                service_type: type.number({
                                    min: 0,
                                    max: 2
                                }),
                                service_price: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                pre_payment_price: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                settle_price: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                renmai: type.bool(),
                                validate_time: type.id()
                            }
                        }
                    })
                }
            }
        }
    },
    statementMaidanList: {
        url: '/statement/maidan/:id/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 56,
                    orders: type.list({
                        length: 10,
                        data: function () {
                            return {
                                id: type.id(),
                                name: type.string(),
                                price: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                payment: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                settle_price: type.number({
                                    min: 1000,
                                    max: 99999
                                }),
                                pay_time: type.id()
                            }
                        }
                    })
                }
            }
        }
    },
    unreadNotice: {
        url: '/unread/notice',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: type.number({
                        min: 10,
                        max: 100
                    }),
                    message_list: type.list({
                        length: 3,
                        data: function () {
                            return {
                                id: type.id(),
                                type: type.number({
                                    min: 0,
                                    max: 19
                                }),
                                info_id: type.id(),
                                content: type.string({
                                    minL: 40,
                                    maxL: 100
                                }),
                                can_view: type.bool()
                            }
                        }
                    })
                }
            }
        }
    },
    systemList: {
        url: '/systemlist/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 56,
                    message_list: type.list({
                        length: 10,
                        data: function () {
                            return {
                                id: type.id(),
                                type: type.number({
                                    min: 0,
                                    max: 19
                                }),
                                info_id: type.id(),
                                content: type.string({
                                    minL: 40,
                                    maxL: 100
                                }),
                                time: type.number({
                                    min: 2001,
                                    max: 2020
                                }) + '-' + type.number({
                                    min: 1,
                                    max: 12
                                }) + '-' + type.number({
                                    min: 1,
                                    max: 30
                                }) + ' ' + type.number({
                                    min: 0,
                                    max: 24
                                }) + ':' + type.number({
                                    min: 0,
                                    max: 59
                                }) + ':' + type.number({
                                    min: 0,
                                    max: 59
                                }),
                                is_read: type.bool(),
                                can_view: type.bool()
                            }
                        }
                    })
                }
            }
        }
    },
    unreadList: {
        url: '/unreadlist/_data',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {
                    total: 99,
                    message_list: type.list({
                        length: 10,
                        data: function () {
                            return {
                                id: type.id(),
                                type: type.number({
                                    min: 0,
                                    max: 21
                                }),
                                info_id: type.id(),
                                content: type.string({
                                    minL: 40,
                                    maxL: 100
                                }),
                                time: type.number({
                                    min: 2001,
                                    max: 2020
                                }) + '-' + type.number({
                                    min: 1,
                                    max: 12
                                }) + '-' + type.number({
                                    min: 1,
                                    max: 30
                                }) + ' ' + type.number({
                                    min: 0,
                                    max: 24
                                }) + ':' + type.number({
                                    min: 0,
                                    max: 59
                                }) + ':' + type.number({
                                    min: 0,
                                    max: 59
                                }),
                                can_view: type.bool()
                            }
                        }
                    })
                }
            }
        }
    },
    readNotice: {
        url: '/read_notice/_data',
        type: 'POST',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: {}
            }
        }
    },
    submechanisms: {
        url: '/submechanisms',
        type: 'GET',
        data: function () {
            return {
                message: '请求成功',
                error: 0,
                data: type.list({
                    length: 8,
                    data: function () {
                        return {
                            id: type.id(),
                            name: type.string()
                        }
                    }
                })
            }
        }
    }
}