<template>
    <div>
        <ui-title class="ui-border-bottom mb0">趋势
            <div slot="right">
                <el-button type="text" class="p5" :class="{'f-color-grey': tab!=='day'}" @click="tab='day'" >日趋势</el-button>
                <i class="f-color-grey">|</i>
                <el-button type="text" class="p5" :class="{'f-color-grey': tab!=='mon'}" @click="tab='mon'" >月趋势</el-button>
            </div>
        </ui-title>
        <div class="flex row-between col-center">
            
        </div>
        <ui-echarts :option="echartOpt" width="100%" height="250px"></ui-echarts>
    </div>
</template>
<script>
import 'echarts/lib/chart/line'; // 折线图
import 'echarts/lib/component/tooltip'; // 提示框
export default {
    data() {
        return {
            // 趋势
            tab: 'day',

            xData:{
                day:['周一','周二','周三','周四','周五','周六','周日'],
                mon:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            },
            seriesData:{
                day:[1, 250, 390, 127, 381, 547, 700, 900, 1288],
                mon:[100, 333, 678, 894, 1359, 1500, 1764, 1800, 2131],
            },


            echartOpt: {
                title: {
                    text: '对数轴示例',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}'
                },
                xAxis: {
                    type: 'category',
                    name: '时间',
                    data: null
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,//grid 区域是否包含坐标轴的刻度标签。
                },
                yAxis: {
                    type: 'value',
                    name: '彩金',
                    axisTick: { show: false },
                },
                series: [{
                    name: '趋势',
                    type: 'line',
                    data: null,
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgb(62,171,255)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgb(45,127,224)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                }]
            },

            echart: null
        }
    },
    mounted () {
        // 获取最近七天日期作为参数
        let today = new Date()
        let sevenDayAgo = new Date(today.getTime() - (6 * 24 * 60 * 60 * 1000));
        let todayFormat = this.$date('yyyy-MM-dd',today)
        let sevenFormat = this.$date('yyyy-MM-dd',sevenDayAgo)

        // 日趋势
        this.$http.get('index.php?g=home&m=CompanyUser&a=trend', {
            params:{
                group_by:'day',
                begin_date: sevenFormat,
                end_date: todayFormat,
            }
        })
        .then(({data})=>{
            // console.log('日趋势数据', data)
            if (data.code===1) {
                let d = data.data

                let xData = []
                let seeriesData = []

                for (let key in d) {
                    seeriesData.push(d[key].amount)
                    xData.push(key)
                }

                this.xData.day = xData
                this.seriesData.day = seeriesData

                this.refshEchart()
            }
        })

        // 获取今年所有月份作为参数
        let year = today.getFullYear()
        let endMonth = today.getMonth()+2
        if (endMonth<10) {
            endMonth = '0' + endMonth
        }

        // 月趋势
        this.$http.get('index.php?g=home&m=CompanyUser&a=trend', {
            params:{
                group_by:'month',
                begin_date: `${year}-01-01`,
                end_date: `${year}-${endMonth}-01`
            }
        })
        .then(({data})=>{
            // console.log('月趋势数据', data)
            if (data.code===1) {
                let d = data.data

                let xData = []
                let seeriesData = []

                for (let key in d) {
                    seeriesData.push(d[key].amount)
                    xData.push(key)
                }

                this.xData.mon = xData
                this.seriesData.mon = seeriesData
            }
        })
    },
    watch: {
        tab(){
            this.refshEchart()
        }
    },
    methods: {
        refshEchart(){
            // 跟新配置
            this.echartOpt.xAxis.data = this.xData[this.tab]
            this.echartOpt.series[0].data = this.seriesData[this.tab]
        },
    }
}
</script>