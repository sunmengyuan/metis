<template>
    <div class="volume">
        <span class="decrease" @click="deVolume"></span>
        <span class="increase" @click="inVolume"></span>
    </div>
</template>

<script>
    export default {
        name: 'volume',
        methods: {
            deVolume () {
                this.$emit('deVolume')
            },
            inVolume () {
                this.$emit('inVolume')
            }
        }
    }
</script>

<style lang="less" scoped>
    @mainGrey: #666;

    .center () {
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
    }

    div.volume {
        float: right;
        margin: 5px;

        .decrease, .increase {
            width: 20px;
            height: 20px;
            float: left;
            position: relative;
            margin: 0 2px;
            border-radius: 3px;
            background-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 0 1px @mainGrey;
        }
        .decrease:after, .increase:before, .increase:after {
            content: "";
            display: block;
            position: absolute;
            background-color: @mainGrey;

            .center();
        }
        .decrease:after, .increase:before {
            width: 8px;
            height: 2px;
        }
        .increase:after {
            width: 2px;
            height: 8px;
        }
    }
</style>
