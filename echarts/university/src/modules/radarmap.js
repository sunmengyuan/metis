import echarts from 'echarts'

export default {
    radarmap: echarts.init(document.getElementById('radarmap')),
    opts: {
        title: {
            x: 'right',
            text: ''
        },
        tooltip: {
            formatter: '{c}'.split(',')
        },
        legend: {
            x: 'left',
            data: []
        },
        calculable: true,
        polar: [
            {
                indicator: [],
                radius: 130
            }
        ],
        series: [
            {
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: []
            }
        ]
    },
    sketch (opts) {
        this.opts.title.text = opts.title;
        this.opts.legend.data = opts.university;
        this.opts.polar[0].indicator = opts.subject;
        this.opts.series[0].data = opts.data;
        this.radarmap.setOption(this.opts);
    }
}
