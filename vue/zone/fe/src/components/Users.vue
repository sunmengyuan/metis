<template>
    <div class="m-users">
        <ul>
            <li v-for="item in users">
                <a v-link="{ path: '/profile/' + item.id }">
                    <img :src="serverHostUrl + item.portrait" class="c-vertical" />
                    <div>
                        <h4>{{ item.nickname }}</h4>
                        <p>{{ item.intro }}</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Users',
        vuex: {
            getters: {
                serverHostUrl: ({constant}) => constant.serverHostUrl
            }
        },
        props: {
            users: Array
        }
    }
</script>

<style lang="less" scoped>
    .m-users {
        margin: 20px 0;

        ul {
            margin: -20px 0;

            li {
                position: relative;
                padding: 20px 0 20px 100px;
                border-top: 1px solid #f7f7f7;
                border-bottom: 1px solid #e8e8e8;
                min-height: 80px;

                img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                }
                h4, p {
                    line-height: 20px;
                    margin: 10px 0;
                }
                h4 {
                    font-size: 16px;
                    color: #333;
                }
                p {
                    font-size: 14px;
                    color: #666;
                }

                &:first-child { border-top: none; }
                &:last-child { border-bottom: none; }
            }
        }
    }
</style>
