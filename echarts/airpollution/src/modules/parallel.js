import echarts from 'echarts'

export default {
    container: document.getElementById('parallel'),
    opts: {
        backgroundColor: '#333',
        legend: {
            bottom: 30,
            data: [],
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        parallelAxis: [],
        visualMap: {
            show: true,
            min: 0,
            max: 150,
            dimension: 2,
            inRange: {
                color: ['#d94e5d', '#eac736', '#50a3ba'].reverse(),
            },
            textStyle: {
                color: '#fff'
            }
        },
        parallel: {
            left: '5%',
            right: '10%',
            bottom: 100,
            parallelAxisDefault: {
                type: 'value',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        },
        series: []
    },
    sketch (data) {
        for (let city in data.data) {
            var result = [];
            for (let i in data.data[city]) {
                var vals = [];
                for (let key in data.data[city][i]) {
                    vals.push(data.data[city][i][key]);
                }
                result.push(vals);
            }
            var obj = {
                name: city,
                type: 'parallel',
                lineStyle: {
                    normal: {
                        width: 1,
                        opacity: 0.5
                    }
                },
                data: result
            };
            this.opts.legend.data.push(city);
            this.opts.series.push(obj);
        }
        this.opts.parallelAxis = [
            {dim: 0, name: data.schema[0].text, inverse: true, max: 31, nameLocation: 'start'},
            {dim: 1, name: data.schema[1].text},
            {dim: 2, name: data.schema[2].text},
            {dim: 3, name: data.schema[3].text},
            {dim: 4, name: data.schema[4].text},
            {dim: 5, name: data.schema[5].text},
            {dim: 6, name: data.schema[6].text},
            {dim: 7, name: data.schema[7].text},
            {
                dim: 8,
                name: data.schema[8].text,
                type: 'category',
                data: ['NO2', 'CO', 'O3', 'SO2', 'PM2.5', 'PM10']
            },
            {
                dim: 9,
                name: data.schema[9].text,
                type: 'category',
                data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
            }
        ];
        echarts.init(this.container).setOption(this.opts);
    }
}
