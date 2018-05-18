<template>
    <div class="m-userinfo">
        <a v-link="{ path: '/profile/' + userInfo.id }">
            <img :src="serverHostUrl + userInfo.portrait" />
            <div>
                {{ userInfo.nickname }}
                <br />
                {{ userInfo.intro }}
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'UserInfo',
        props: {
            userInfo: Object
        },
        vuex: {
            getters: {
                serverHostUrl: ({constant}) => constant.serverHostUrl
            }
        }
    }
</script>

<style lang="less" scoped>
    .m-userinfo {
        text-align: center;
        max-width: 200px;
        margin: -80px auto 0;

        img {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            margin: 0 auto;
        }
        div {
            font-size: 14px;
            line-height: 24px;
            color: #666;
            margin-top: 15px;
        }
    }
</style>
