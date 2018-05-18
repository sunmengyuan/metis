<template>
    <user-info :user-info="userInfo"></user-info>
    <section>
        <h4 class="article-title">{{ articleInfo.title }}
            <a
                href="javascript:;"
                @click="toggleEditArticle"
                v-show="currentUser == articleInfo.author">
            </a>
        </h4>
        <div class="article-content">{{ articlePaged }}</div>
        <div class="zone-btns" v-show="load.article.show">
            <a href="javascript:;" element="article" @click="loadMore($event)">继续阅读</a>
        </div>
        <div class="zone-nomore" v-show="load.article.message">沒有更多了</div>
    </section>
    <div class="c-mask" v-show="editArticle.show">
        <form enctype="multipart/form-data" id="form_edit_article" class="zone-form form-edit c-center">
            <div class="form-upload">
                <img :src="editArticle.cover" />
                <input
                    type="file"
                    @change="coverAnalysis($event)" />
                <span>修改封面</span>
            </div>
            <div class="form-info">
                <input
                    type="text" placeholder="请输入标题" autofocus="autofocus"
                    :value="articleInfo.title"
                    v-model="editArticle.body.title"
                    v-el:title />
                <textarea
                    placeholder="请输入正文"
                    :value="articleInfo.content"
                    v-model="editArticle.body.content"
                    v-el:content>
                </textarea>
                <span>{{ editArticle.message }}</span>
                <div class="zone-btns">
                    <a href="javascript:;" @click="requestEditArticle">
                        提交
                        <input class="c-hidden" type="submit" @keyup.enter="requestEditArticle" />
                    </a>
                    <a href="javascript:;" @click="toggleEditArticle">取消</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import publicMethods from '../assets/script/public'
    import UserInfo from '../components/UserInfo'

    export default {
        name: 'ArticleDetail',
        components: {
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
                articleInfo: {},
                articlePaged: '',
                load: {
                    article: {
                        page: 0,
                        show: 1,
                        message: ''
                    }
                },
                editArticle: {
                    show: 0,
                    formData: null,
                    body: {
                        title: '',
                        content: '',
                        cover: ''
                    },
                    message: '',
                    cover: ''
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
                var loadArticle = function (id) {
                    var url = _this.serverHostUrl + '/article?id=' + id
                    publicMethods.getRequest(_this, url, function (data) {
                        _this.articlePaged = data.data

                        _this.load.article = { page: 0, show: 1, message: '' }
                        data.status === 2 && (_this.load.article.show = 0)
                    })
                }

                var url = _this.serverHostUrl + _this.$route.path
                publicMethods.getRequest(_this, url, function (data) {
                    _this.userInfo = data.data.userInfo
                    _this.articleInfo = data.data.articleInfo

                    // 表单 cover 需要特殊处理 (╯﹏╰)
                    var cover = _this.articleInfo.cover
                    _this.editArticle.cover = _this.serverHostUrl + cover
                    _this.editArticle.body.cover = ''
                    _this.editArticle.formData = null

                    loadArticle(_this.articleInfo.id)
                })
            },
            loadMore (event) {
                var _this = this
                var params = {
                    id: _this.articleInfo.id
                }
                publicMethods.loadMore(this, event, params, function (data) {
                    _this.articlePaged += data.data
                })
            },
            coverAnalysis (event) {
                var opts = {
                    key: 'cover',
                    action: 'editArticle'
                }
                publicMethods.fileAnalysis(this, event, opts)
            },
            toggleEditArticle () {
                var opts = {
                    clear: [],
                    action: 'editArticle'
                }
                publicMethods.toggleDialog(this, opts)
            },
            requestEditArticle () {
                var _this = this
                var _articleInfo = _this.articleInfo
                var _editArticle = _this.editArticle
                var body = _editArticle.body
                var formData = _editArticle.formData

                var $els = _this.$els
                var title = $els.title.value
                var content = $els.content.value

                var request = function () {
                    var upload = function (callback) {
                        var opts = {
                            url: _this.serverHostUrl + '/upload/cover',
                            body: formData,
                            action: 'editArticle'
                        }
                        publicMethods.postRequest(_this, opts, function (data) {
                            body.cover = data.url
                            callback()
                        })
                    }
                    var update = function () {
                        var id = _articleInfo.id
                        for (var key in body) {
                            body[key]
                                ? (_articleInfo[key] = body[key])
                                : delete body[key]
                        }
                        var opts = {
                            url: _this.serverHostUrl + '/edit/article/' + id,
                            body: body,
                            action: 'editArticle'
                        }
                        publicMethods.postRequest(_this, opts, function () {
                            _this.fetchData()
                            _this.toggleEditArticle()
                        })
                    }

                    formData ? upload(update) : update()
                }

                var noEmpty = title && content
                if (noEmpty) {
                    request()
                } else {
                    _editArticle.message = '标题及正文不可修改为空'
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    h4.article-title {
        font-size: 18px;
        line-height: 30px;
        height: 30px;
        color: #5c2b27;

        a {
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 30px;
            background: url("../assets/img/ico_edit.png") no-repeat 50% 2px;
            background-size: 20px auto;
            margin-left: 10px;
        }
    }
    .article-content {
        font-size: 16px;
        line-height: 22px;
        color: #666;
        white-space: pre-line;
        padding: 20px 0;
    }
</style>
