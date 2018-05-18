<template>
    <button
        class="playpause"
        :class="status"
        @click="playpause">
    </button>
</template>

<script>
    export default {
        name: 'playpause',
        props: {
            ended: Boolean
        },
        data () {
            return {
                status: 'play'
            }
        },
        watch: {
            ended: function (val) {
                if (val) {
                    this.status = 'play'
                }
            }
        },
        methods: {
            playpause () {
                switch (this.status) {
                    case 'play':
                        this.status = 'pause'
                        this.$emit('play')
                        break
                    case 'pause':
                        this.status = 'play'
                        this.$emit('pause')
                        break
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @mainGrey: #666;

    button.playpause {
        width: 20px;
        height: 20px;
        float: left;
        margin: 5px;
        padding: 6px 0;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 1px @mainGrey;
        box-sizing: border-box;

        &:before, &:after {
            content: "";
            float: left;
        }
        &.play:after {
            width: 0;
            height: 0;
            margin-left: 7px;
            border: 4px solid transparent;
            border-left-color: @mainGrey;
            border-left-width: 7px;
        }
        &.pause:before, &.pause:after {
            width: 2px;
            height: 100%;
            background-color: @mainGrey;
        }
        &.pause:before {
            margin-left: 7px;
        }
        &.pause:after {
            margin-left: 2px;
        }
    }
</style>
