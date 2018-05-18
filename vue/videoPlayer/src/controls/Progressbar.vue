<template>
    <div class="progressbar" @click="alterProgress($event)">
        <div class="bar-outer"></div>
        <div ref="inner" class="bar-inner"></div>
    </div>
</template>

<script>
    export default {
        name: 'progressbar',
        props: {
            percent: Number
        },
        watch: {
            percent: function (val) {
                this.$refs.inner.style.width = val + '%'
            }
        },
        methods: {
            alterProgress (event) {
                var x = event.offsetX
                var width = event.target.offsetWidth
                var percent = (x / width) * 100
                this.$emit('alterProgress', percent)
            }
        }
    }
</script>

<style lang="less" scoped>
    .progressbar {
        height: 5px;
        position: relative;

        .bar-outer, .bar-inner {
            height: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        .bar-outer {
            width: 100%;
            background-color: rgba(255, 255, 255, 0);
            box-shadow: 0 0 1px #ccc;
            z-index: 2;
        }
        .bar-inner {
            width: 0%;
            background-color: gold;
            z-index: 1;

            &:after {
                content: "";
                float: right;
                width: 5px;
                height: 7px;
                margin-top: -1px;
                background-color: rgba(255, 255, 255, 0.5);
                box-shadow: inset 0 0 1px gold;
            }
        }
    }
</style>
