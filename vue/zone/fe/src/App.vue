<template>
    <navigation></navigation>
    <banner></banner>
    <router-view></router-view>
    <div class="pendant"></div>
    <div class="zone-ctrls">
        <a href="javascript:;" class="ctrl-gotop" @click="gotop" v-show="showGotop"><span></span></a>
    </div>
</template>

<script>
    import store from './vuex/store'
    import Navigation from './components/Navigation'
    import Banner from './components/Banner'

    export default {
        name: 'App',
        components: {
            Navigation,
            Banner
        },
        store,
        data () {
            return {
                showGotop: 0
            }
        },
        created () {
            var _this = this
            window.onscroll = function () {
                var scrollTop = window.document.body.scrollTop
                _this.showGotop = (scrollTop > 1500) ? 1 : 0
            }
        },
        methods: {
            gotop () {
                window.document.body.scrollTop = 0
            }
        }
    }
</script>

<style src="./assets/style/init.less" lang="less"></style>
<style src="./assets/style/public.less" lang="less"></style>
<style src="./assets/style/app.less" lang="less"></style>
<style lang="less" scoped>
    .pendant {
        width: 89px;
        height: 310px;
        background: url('./assets/img/pendant.png') no-repeat 0 50%;
        background-size: 89px auto;
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: -2;
    }
    a.ctrl-gotop {
        right: 20px;
        bottom: 30px;

        span { background-position: 50% -48px; }
    }

    @media screen and (max-width: 600px) {
        .pendant { display: none; }
    }
</style>
