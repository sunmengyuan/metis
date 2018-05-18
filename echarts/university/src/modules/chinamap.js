import echarts from 'echarts'
import '../libs/china'

export default {
    chinamap: echarts.init(document.getElementById('chinamap')),
    opts: {
        series: [
            {
                name: '中国',
                type: 'map',
                mapType: 'china',
                selectedMode: 'single',
                label: {
                    emphasis: {
                        show: true
                    }
                }
            }
        ]
    },
    sketch () {
        this.chinamap.setOption(this.opts);
    }
}
