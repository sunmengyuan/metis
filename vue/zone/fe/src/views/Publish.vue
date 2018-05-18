<template>
    <form enctype="multipart/form-data" id="form_publish" class="zone-form">
        <div class="form-upload">
            <img :src="publish.cover" />
            <input
                type="file"
                @change="coverAnalysis($event)"
                v-el:cover />
            <span>上传封面</span>
        </div>
        <div class="form-info">
            <h3>发布</h3>
            <input
                type="text" placeholder="请输入标题" autofocus="autofocus"
                v-model="publish.body.title"
                v-el:title />
            <textarea
                placeholder="请输入正文"
                v-model="publish.body.content"
                v-el:content>
            </textarea>
            <span>{{ publish.message }}</span>
            <div class="zone-btns">
                <a href="javascript:;" @click="requestPublish">
                    提交
                    <input class="c-hidden" type="submit" @keyup.enter="requestPublish" />
                </a>
                <a v-link="{ path: '/profile/' + currentUser }">取消</a>
            </div>
        </div>
    </form>
</template>

<script>
    import publicMethods from '../assets/script/public'

    export default {
        name: 'Publish',
        vuex: {
            getters: {
                serverHostUrl: ({constant}) => constant.serverHostUrl,
                currentUser: ({user}) => user.current
            }
        },
        data () {
            return {
                publish: {
                    formData: null,
                    body: {
                        title: '',
                        content: '',
                        cover: '',
                        author: this.currentUser
                    },
                    message: '',
                    cover: '/static/default_upload.png'
                }
            }
        },
        created () {
            this.currentUser || this.$router.go('/')
        },
        methods: {
            coverAnalysis (event) {
                var opts = {
                    key: 'cover',
                    action: 'publish'
                }
                publicMethods.fileAnalysis(this, event, opts)
            },
            requestPublish () {
                var _this = this
                var _publish = _this.publish
                var body = _publish.body
                var formData = _publish.formData

                var $els = _this.$els
                var title = $els.title.value
                var content = $els.content.value
                var cover = $els.cover.value

                var upload = function (callback) {
                    var opts = {
                        url: _this.serverHostUrl + '/upload/cover',
                        body: formData,
                        action: 'publish'
                    }
                    publicMethods.postRequest(_this, opts, function (data) {
                        body.cover = data.url
                        callback()
                    })
                }
                var update = function () {
                    var opts = {
                        url: _this.serverHostUrl + '/publish',
                        body: body,
                        action: 'publish'
                    }
                    publicMethods.postRequest(_this, opts, function () {
                        _publish.message = ''
                        _this.$router.go('/profile/' + _this.currentUser)
                    })
                }

                var noEmpty = title && content && cover
                if (noEmpty) {
                    upload(update)
                } else {
                    _publish.message = '发布信息不完整'
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
