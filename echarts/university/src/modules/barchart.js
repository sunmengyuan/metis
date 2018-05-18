import echarts from 'echarts'

export default {
    barchart: echarts.init(document.getElementById('barchart')),
    opts: {
        title: {
            x: 'right',
            text: ''
        },
        tooltip: {
            trigger: 'item',
            formatter: '{c}'
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n\n{c}'
                        }
                    }
                },
                data: []
            }
        ]
    },
    sketch (opts) {
        this.opts.title.text = opts.title;
        this.opts.xAxis[0].data = opts.university;
        this.opts.series[0].data = opts.score;
        this.barchart.setOption(this.opts);
    }
}
