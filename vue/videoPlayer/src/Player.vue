<template>
    <section
        ref="player"
        :class="fullscreen"
        class="player">
        <video
            ref="video"
            width="100%" height="100%" class="c-block"
            src="http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4">
        </video>
        <div class="player-ctrls c-fix">
            <progressbar
                :percent="percent"
                @alterProgress="alterProgress">
            </progressbar>
            <playpause
                :ended="ended"
                @play="play"
                @pause="pause">
            </playpause>
            <fullscreen
                @requestFull="requestFull"
                @cancelFull="cancelFull">
            </fullscreen>
            <volume
                @deVolume="deVolume"
                @inVolume="inVolume">
            </volume>
        </div>
    </section>
</template>

<script>
    import Playpause from './controls/Playpause'
    import Progressbar from './controls/Progressbar'
    import Fullscreen from './controls/Fullscreen'
    import Volume from './controls/Volume'

    export default {
        name: 'player',
        components: {
            Playpause,
            Progressbar,
            Fullscreen,
            Volume
        },
        data () {
            return {
                player: null,
                video: null,
                interval: null,
                percent: 0,
                ended: false,
                fullscreen: ''
            }
        },
        mounted () {
            this.player = this.$refs.player
            this.video = this.$refs.video
        },
        methods: {
            play () {
                if (this.video.readyState === 4) {
                    this.ended && (this.percent = 0)
                    this.ended = false
                    this.video.play()
                    this.handleProgress()
                }
            },
            pause () {
                this.video.pause()
                clearInterval(this.interval)
            },
            deVolume () {
                if (this.video.volume < 0.1) {
                    this.video.volume = 0
                } else {
                    this.video.volume -= 0.1
                }
            },
            inVolume () {
                if (this.video.volume > 0.9) {
                    this.video.volume = 1
                } else {
                    this.video.volume += 0.1
                }
            },
            requestFull () {
                this.fullscreen = 'fullscreen'
            },
            cancelFull () {
                this.fullscreen = ''
            },
            handleProgress () {
                var _this = this
                var duration = _this.video.duration
                this.interval = setInterval(function () {
                    if (_this.video.ended) {
                        clearInterval(_this.interval)
                        _this.percent = 100
                        _this.ended = true
                        return
                    }
                    var currentTime = _this.video.currentTime
                    var percent = (currentTime / duration) * 100
                    _this.percent = percent
                }, 1000)
            },
            alterProgress (percent) {
                var duration = this.video.duration
                var currentTime = duration * percent / 100
                this.percent = percent
                this.video.currentTime = currentTime
            }
        }
    }
</script>

<style src="./assets/init.less" lang="less"></style>
<style src="./assets/public.less" lang="less"></style>
<style lang="less" scoped>
    .player {
        width: 60%;
        margin: 5% auto;
        box-shadow: 2px 2px 5px #ccc;
        position: relative;
        overflow: hidden;

        .player-ctrls {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.8);
        }
        &.fullscreen {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            background-color: #000;
        }
    }
</style>
