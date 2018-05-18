<template>
    <user-info :user-info="userInfo"></user-info>
    <section v-show="articles.length">
        <h3 class="zone-title">所有文章</h3>
        <articles :articles="articles"></articles>
        <div class="zone-btns" v-show="load.articles.show">
            <a href="javascript:;" element="articles" @click="loadMore($event)">查看更多</a>
        </div>
        <div class="zone-nomore" v-show="load.articles.message">沒有更多了</div>
    </section>
    <section v-else>
        <div class="zone-noresult">
            <span v-if="currentUser === userInfo.id">快发布文章丰富个人空间吧~</span>
            <span v-else>该用户还没有发布过文章~</span>
        </div>
    </section>
    <div class="c-mask" v-show="editUser.show">
        <form enctype="multipart/form-data" id="form_edit_user" class="zone-form form-edit c-center">
            <div class="form-upload">
                <img :src="editUser.portrait" />
                <input
                    type="file"
                    @change="portraitAnalysis($event)" />
                <span>更改头像</span>
            </div>
            <div class="form-info">
                <input
                    type="text" placeholder="用户名" autofocus="autofocus"
                    :value="userInfo.nickname"
                    v-model="editUser.body.nickname"
                    v-el:nickname />
                <input
                    type="password" placeholder="原密码"
                    v-el:old-password />
                <input
                    type="password" placeholder="新密码"
                    v-el:password />
                <input
                    type="password" placeholder="确认密码"
                    v-el:cfm-password />
                <input
                    type="text" placeholder="一句话描述自己"
                    :value="userInfo.intro"
                    v-model="editUser.body.intro"
                    v-el:intro />
                <span>{{ editUser.message }}</span>
                <div class="zone-btns">
                    <a href="javascript:;" @click="requestEditUser">
                        提交
                        <input class="c-hidden" type="submit" @keyup.enter="requestEditUser" />
                    </a>
                    <a href="javascript:;" @click="toggleEditUser">取消</a>
                </div>
            </div>
        </form>
    </div>
    <div class="zone-ctrls" v-show="currentUser === userInfo.id">
        <a v-link="{ path: '/publish' }" class="ctrl-publish"><span></span></a>
        <a href="javascript:;" class="ctrl-edituser" @click="toggleEditUser"><span></span></a>
    </div>
</template>

<script>
    import publicMethods from '../assets/script/public'
    import Articles from '../components/Articles'
    import UserInfo from '../components/UserInfo'

    export default {
        name: 'Profile',
        components: {
            Articles,
            UserInfo
        },
        vuex: {
            getters: {
                serverHostUrl: ({constant}) => constant.serverHostUrl,
                currentUser: ({user}) => user.current
            }
        },
        data () {
            return {
                userInfo: {},
                articles: [],
                load: {
                    articles: {
                        page: 0,
                        show: 1,
                        message: ''
                    }
                },
                editUser: {
                    show: 0,
                    formData: null,
                    body: {
                        nickname: '',
                        password: '',
                        intro: '',
                        portrait: ''
                    },
                    message: '',
                    portrait: ''
                }
            }
        },
        route: {
            data () {
                this.fetchData()
            }
        },
        methods: {
            fetchData () {
                var _this = this
                var loadArticles = function (id) {
                    var url = _this.serverHostUrl + '/articles?user=' + id
                    publicMethods.getRequest(_this, url, function (data) {
                        _this.articles = data.data

                        _this.load.articles = { page: 0, show: 1, message: '' }
                        data.status === 2 && (_this.load.articles.show = 0)
                    })
                }

                var url = _this.serverHostUrl + _this.$route.path
                publicMethods.getRequest(_this, url, function (data) {
                    _this.userInfo = data.data.userInfo

                    // 表单 portrait 需要特殊处理 (╯﹏╰)
                    var portrait = _this.userInfo.portrait
                    _this.editUser.portrait = _this.serverHostUrl + portrait
                    _this.editUser.body.portrait = ''
                    _this.editUser.formData = null

                    loadArticles(_this.userInfo.id)
                })
            },
            loadMore (event) {
                var _this = this
                var params = {
                    user: _this.userInfo.id
                }
                publicMethods.loadMore(this, event, params, function (data) {
                    _this.articles = _this.articles.concat(data.data)
                })
            },
            portraitAnalysis (event) {
                var opts = {
                    key: 'portrait',
                    action: 'editUser'
                }
                publicMethods.fileAnalysis(this, event, opts)
            },
            toggleEditUser () {
                var opts = {
                    clear: ['oldPassword', 'password', 'cfmPassword'],
                    action: 'editUser'
                }
                publicMethods.toggleDialog(this, opts)
            },
            requestEditUser () {
                var _this = this
                var _userInfo = _this.userInfo
                var _editUser = _this.editUser
                var body = _editUser.body
                var formData = _editUser.formData

                var $els = _this.$els
                var nickname = $els.nickname.value
                var oldPassword = $els.oldPassword.value
                var password = $els.password.value
                var cfmPassword = $els.cfmPassword.value
                var intro = $els.intro.value

                var checkPassword = function () {
                    if (password || cfmPassword || oldPassword) {
                        if (oldPassword !== _userInfo.password) {
                            _editUser.message = '原密码有误'
                            return 0
                        } else {
                            if (password && (password === cfmPassword)) {
                                body.password = password
                            } else {
                                _editUser.message = '密码或确认密码有误'
                                return 0
                            }
                        }
                    } else {
                        _editUser.message = ''
                    }

                    return 1
                }
                var request = function () {
                    var upload = function (callback) {
                        var opts = {
                            url: _this.serverHostUrl + '/upload/portrait',
                            body: formData,
                            action: 'editUser'
                        }
                        publicMethods.postRequest(_this, opts, function (data) {
                            body.portrait = data.url
                            callback()
                        })
                    }
                    var update = function () {
                        var id = _userInfo.id
                        for (var key in body) {
                            body[key]
                                ? (_userInfo[key] = body[key])
                                : delete body[key]
                        }
                        var opts = {
                            url: _this.serverHostUrl + '/edit/user/' + id,
                            body: body,
                            action: 'editUser'
                        }
                        publicMethods.postRequest(_this, opts, function () {
                            _this.fetchData()
                            _this.toggleEditUser()
                        })
                    }

                    formData ? upload(update) : update()
                }

                var noEmpty = nickname && intro
                if (noEmpty) {
                    checkPassword() && request()
                } else {
                    _editUser.message = '用户名及个人简介不可修改为空'
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    a.ctrl-publish {
        left: 20px;
        bottom: 100px;

        span { background-position: 50% 0; }
    }
    a.ctrl-edituser{
        left: 20px;
        bottom: 30px;

        span { background-position: 50% -24px; }
    }
</style>
