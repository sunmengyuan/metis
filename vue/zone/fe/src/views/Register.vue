<template>
    <form enctype="multipart/form-data" id="form_register" class="zone-form">
        <div class="form-upload">
            <img :src="register.portrait" />
            <input
                type="file"
                @change="portraitAnalysis($event)"
                v-el:portrait />
            <span>上传头像</span>
        </div>
        <div class="form-info">
            <h3>注册</h3>
            <input
                type="text" placeholder="用户名" autofocus="autofocus"
                v-model="register.body.nickname"
                v-el:nickname />
            <input
                type="password" placeholder="密码"
                v-model="register.body.password"
                v-el:password />
            <input
                type="password" placeholder="确认密码"
                v-el:cfm-password />
            <input
                type="text" placeholder="个人简介"
                v-model="register.body.intro"
                v-el:intro />
            <span>{{ register.message }}</span>
            <div class="zone-btns">
                <a href="javascript:;" @click="requestRegister">
                    提交
                    <input class="c-hidden" type="submit" @keyup.enter="requestRegister" />
                </a>
                <a v-link="{ path: '/' }">取消</a>
            </div>
        </div>
    </form>
</template>

<script>
    import publicMethods from '../assets/script/public'
    import user from '../assets/script/user'
    import {markLogin} from '../vuex/actions'

    export default {
        name: 'Register',
        vuex: {
            getters: {
                serverHostUrl: ({constant}) => constant.serverHostUrl
            },
            actions: {
                markLogin
            }
        },
        data () {
            return {
                register: {
                    formData: null,
                    body: {
                        nickname: '',
                        password: '',
                        intro: '',
                        portrait: ''
                    },
                    message: '',
                    portrait: '/static/default_upload.png'
                }
            }
        },
        methods: {
            portraitAnalysis (event) {
                var opts = {
                    key: 'portrait',
                    action: 'register'
                }
                publicMethods.fileAnalysis(this, event, opts)
            },
            requestRegister () {
                var _this = this
                var _register = _this.register
                var body = _register.body
                var formData = _register.formData

                var $els = _this.$els
                var nickname = $els.nickname.value
                var password = $els.password.value
                var cfmPassword = $els.cfmPassword.value
                var intro = $els.intro.value
                var portrait = $els.portrait.value

                var upload = function (callback) {
                    var opts = {
                        url: _this.serverHostUrl + '/upload/portrait',
                        body: formData,
                        action: 'register'
                    }
                    publicMethods.postRequest(_this, opts, function (data) {
                        body.portrait = data.url
                        callback()
                    })
                }
                var update = function () {
                    var opts = {
                        url: _this.serverHostUrl + '/register',
                        body: body,
                        action: 'register'
                    }
                    publicMethods.postRequest(_this, opts, function (data) {
                        _register.message = ''

                        _this.markLogin(data.id)
                        user.login(data.id)

                        _this.$router.go('/')
                    })
                }

                var noEmpty = nickname && password && cfmPassword && intro && portrait
                if (noEmpty) {
                    if (password === cfmPassword) {
                        upload(update)
                    } else {
                        _register.message = '密码或确认密码有误'
                    }
                } else {
                    _register.message = '注册信息不完整'
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
