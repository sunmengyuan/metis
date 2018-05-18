<template>
    <div class="m-banner">
        <div :style="{ backgroundImage: 'url(' + pattern + ')' }"></div>
    </div>
</template>

<script>
    import Trianglify from 'trianglify'

    export default {
        name: 'Banner',

        data () {
            return {
                pattern: null
            }
        },
        created () {
            var pattern = Trianglify({
                width: 1500,
                height: 300
            }).png()

            this.pattern = pattern
        }
    }
</script>

<style lang="less" scoped>
    .m-banner div {
        height: 300px;
        background-position: 50% 50%;
        background-size: cover;
    }
</style>
