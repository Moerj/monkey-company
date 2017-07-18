<template>
    <div>
        <div class="flex row-between col-center">
            <div>
                <el-button type="text" :class="{'f-color-grey': tab!=='day'}" @click="tab='day'" >日趋势</el-button>
                <i class="p15 f-color-grey">|</i>
                <el-button type="text" :class="{'f-color-grey': tab!=='mon'}" @click="tab='mon'" >月趋势</el-button>
            </div>
        </div>
        <ui-echarts :option="echartOpt" width="100%" height="300px"></ui-echarts>
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
                day:[1, 3, 9, 27, 81, 247, 400, 600, 888],
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
        this.refshEchart()
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
        }
    }
}
</script>