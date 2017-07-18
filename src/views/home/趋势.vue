<template>
    <div>
        <div class="flex row-between col-center">
            <div>
                <el-button type="text" :class="{'f-color-grey': qushiTab!==1}" @click="qushiTab=1">日趋势</el-button>
                <i class="p15 f-color-grey">|</i>
                <el-button type="text" :class="{'f-color-grey': qushiTab!==2}" @click="qushiTab=2">月趋势</el-button>
            </div>
        </div>
        <div style="width:100%;height:300px;" v-echarts="echart_qushi"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 趋势
            qushiTab: 1,
            echart_qushi: {
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
                    data: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
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
                    data: [1, 3, 9, 27, 81, 247, 741, 1000, 1600],
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
            }
        }
    }
}
</script>