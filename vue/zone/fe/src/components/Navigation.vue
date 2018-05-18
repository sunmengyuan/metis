<template>
    <div class="m-nav c-fix c-header">
        <ul>
            <li><a v-link="{ path: '/' }">首页</a></li>
            <li><a href="https://github.com/sunmengyuan/metis/tree/master/vue/zone">源码</a></li>
        </ul>
        <div class="m-log" v-if="currentUser">
            <a v-link="{ path: '/profile/' + currentUser }">个人页</a>
            <a href="javascript:;" @click="exitLogin">退出</a>
        </div>
        <div class="m-log" v-else>
            <a href="javascript:;" @click="toggleLogin">登录</a>
            <a v-link="{ path: '/register' }">注册</a>
        </div>
    </div>
    <div class="c-mask" v-show="login.show">
        <form enctype="multipart/form-data" id="form_login" class="zone-form form-login">
            <div class="form-info c-center">
                <h3>登录<a v-link="{ path: '/register' }" @click="toggleLogin">注册</a></h3>
                <input
                    type="text" placeholder="用户名" autofocus="autofocus"
                    v-model="login.body.nickname"
                    v-el:nickname />
                <input
                    type="password" placeholder="密码"
                    v-model="login.body.password"
                    v-el:password />
                <span>{{ login.message }}</span>
                <div class="zone-btns">
                    <a href="javascript:;" @click="requestLogin">
                        确定
                        <input class="c-hidden" type="submit" @keyup.enter="requestLogin" />
                    </a>
                    <a href="javascript:;" @click="toggleLogin">取消</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import publicMethods from '../assets/script/public'
    import user from '../assets/script/user'
    import {markLogin, markExit} from '../vuex/actions'

    export default {
        name: 'Navigation',
        vuex: {
            getters: {
                serverHostUrl: ({constant}) => constant.serverHostUrl,
                currentUser: ({user}) => user.current
            },
            actions: {
                markLogin,
                markExit
            }
        },
        data () {
            return {
                login: {
                    show: 0,
                    body: {
                        nickname: '',
                        password: ''
                    },
                    message: ''
                }
            }
        },
        methods: {
            toggleLogin () {
                var opts = {
                    clear: ['password'],
                    action: 'login'
                }
                publicMethods.toggleDialog(this, opts)
            },
            requestLogin () {
                var _this = this
                var opts = {
                    url: _this.serverHostUrl + '/login',
                    body: _this.login.body,
                    action: 'login'
                }
                publicMethods.postRequest(_this, opts, function (data) {
                    _this.toggleLogin()

                    _this.markLogin(data.id)
                    user.login(data.id)
                })
            },
            exitLogin () {
                this.markExit()
                user.exit()
            }
        }
    }
</script>

<style lang="less" scoped>
    .m-nav {
        line-height: 22px;
        padding: 20px 15px;
        background-color: rgba(0, 0, 0, 0.2);

        a { color: #fff; }
        ul {
            float: left;
            margin: 0 -15px;

            li {
                float: left;
                font-size: 22px;
                padding: 0 15px;
                border-right: 1px solid rgba(255, 255, 255, 0.3);

                &:last-child { border-right: none; }
            }
        }
        .m-log {
            float: right;
            font-size: 16px;
            margin: 0 -5px;

            a {
                margin: 0 5px;

                &:hover { text-decoration: underline; }
            }
        }
    }
    form.zone-form.form-login {
        .form-info {
            width: 250px;
            position: fixed;

            h3 {
                position: relative;

                a {
                    font-size: 12px;
                    color: #999;
                    text-decoration: underline;
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }
        }
    }
</style>
