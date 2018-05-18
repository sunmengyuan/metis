<template>
    <h1>
        <a href="https://github.com/sunmengyuan" class="c-block">
            <img src="../assets/img/logo.png" />
        </a>
    </h1>
    <section v-show="users.length">
        <h3 class="zone-title">所有用户</h3>
        <users :users="users"></users>
        <div class="zone-btns" v-show="load.users.show">
            <a href="javascript:;" element="users" @click="loadMore($event)">查看更多</a>
        </div>
        <div v-show="load.users.message" class="zone-nomore">没有更多了</div>
    </section>
    <section v-show="articles.length">
        <h3 class="zone-title">所有文章</h3>
        <articles :articles="articles"></articles>
        <div class="zone-btns" v-show="load.articles.show">
            <a href="javascript:;" element="articles" @click="loadMore($event)">查看更多</a>
        </div>
        <div v-show="load.articles.message" class="zone-nomore">没有更多了</div>
    </section>
</template>

<script>
    import publicMethods from '../assets/script/public'
    import Articles from '../components/Articles'
    import Users from '../components/Users'

    export default {
        name: 'Homepage',
        components: {
            Articles,
            Users
        },
        vuex: {
            getters: {
                serverHostUrl: ({constant}) => constant.serverHostUrl
            }
        },
        data () {
            return {
                users: [],
                articles: [],
                load: {
                    users: {
                        page: 0,
                        show: 1,
                        message: ''
                    },
                    articles: {
                        page: 0,
                        show: 1,
                        message: ''
                    }
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
                var method = function (element) {
                    var url = _this.serverHostUrl + '/' + element
                    publicMethods.getRequest(_this, url, function (data) {
                        _this[element] = data.data
                        _this.load[element] = { page: 0, show: 1, message: '' }
                        data.status === 2 && (_this.load[element].show = 0)
                    })
                }
                method('users')
                method('articles')
            },
            loadMore (event) {
                var _this = this
                var element = event.target.getAttribute('element')
                publicMethods.loadMore(_this, event, {}, function (data) {
                    _this[element] = _this[element].concat(data.data)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    h1 {
        width: 168px;
        margin: -80px auto 0;
    }
</style>
