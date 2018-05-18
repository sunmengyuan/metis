import echarts from 'echarts'

export default {
    container: document.getElementById('barLine'),
    opts: {
        tooltip: {
            show: true,
            formatter: '{c}'
        },
        legend: {
            data: []
        },
        calculable: true,
        dataZoom: {
            show: true,
            realtime: true,
            start: 40,
            end: 60
        },
        xAxis: [
            {
                type: 'category',
                name: '月份（2015/X）',
                boundaryGap: true,
                data: [],
                nameTextStyle: {
                    color: '#e05656',
                    fontSize: 14
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '指数',
                nameTextStyle: {
                    color: '#e05656',
                    fontSize: 14
                }
            }
        ],
        series: []
    },
    sketch (data) {
        for (let i = 1; i < 13; i++) {
            this.opts.xAxis[0].data.push(i.toString());
        }
        for (let figure in data.data) {
            var obj = {};
            var loop = data.data[figure];
            obj.type = loop.type;
            obj.name = loop.name;
            obj.data = loop.value;
            this.opts.legend.data.push(obj.name);
            this.opts.series.push(obj);
        }
        echarts.init(this.container).setOption(this.opts);
    }
}
