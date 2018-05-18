<template>
    <button
        class="fullscreen"
        :class="status"
        @click="fullscreen">
    </button>
</template>

<script>
    export default {
        name: 'fullscreen',
        data () {
            return {
                status: 'request'
            }
        },
        methods: {
            fullscreen () {
                switch (this.status) {
                    case 'request':
                        this.status = 'cancel'
                        this.$emit('requestFull')
                        break
                    case 'cancel':
                        this.status = 'request'
                        this.$emit('cancelFull')
                        break
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @mainGrey: #666;

    .rotate (@deg) {
        -webkit-transform: rotate(@deg);
                transform: rotate(@deg);
    }

    button.fullscreen {
        width: 20px;
        height: 20px;
        margin: 5px;
        float: right;
        position: relative;
        border-radius: 3px;
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 1px @mainGrey;

        &:before, &:after {
            content: "";
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            border: 2px solid transparent;

            .rotate(-45deg);
        }
        &:before {
            border-left-color: @mainGrey;
            border-left-width: 8px;
        }
        &:after {
            border-right-color: @mainGrey;
            border-right-width: 8px;
        }
        &.request:before { right: 1px; top: 4px; }
        &.request:after { left: 1px; bottom: 4px; }
        &.cancel:before { left: 3px; bottom: 6px; }
        &.cancel:after { right: 3px; top: 6px; }
    }
</style>
