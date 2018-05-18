<template>
    <div class="m-articles">
        <ul class="c-fix">
            <li v-for="item in articles">
                <a v-link="{ path: '/article/' + item.id }">
                    <div class="article-info">
                        <img :src="serverHostUrl + item.cover" />
                        <h4>{{ item.title }}</h4>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Articles',
        vuex: {
            getters: {
                serverHostUrl: ({constant}) => constant.serverHostUrl
            }
        },
        props: {
            articles: Array
        }
    }
</script>

<style lang="less" scoped>
    .m-articles {
        ul {
            margin: 0 -20px;

            li {
                float: left;
                width: 25%;
                box-sizing: border-box;
                padding: 20px;
            }
        }
        .article-info {
            position: relative;
            height: 0;
            padding-bottom: 100%;
            background-color: #f7f7f7;

            h4 {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                font-size: 14px;
                line-height: 30px;
                color: #fff;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.5);
            }
        }
    }

    @media screen and (max-width: 600px) {
        .m-articles {
            ul {
                margin: 0 -10px;

                li {
                    width: 50%;
                    padding: 10px;
                }
            }
        }
    }
</style>
