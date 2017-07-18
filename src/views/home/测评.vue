<style lang="scss" scoped>
.center-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
<template>
    <el-row style="height:250px;">

        <el-col :span="8" class="h-100">
            <!--环形饼图  -->
            <div class="relative flex row-center">
                <div class="center-label">
                    <span class="f-color-grey f12">菠菜指数</span>
                    <span class="f-color-orange f24">80.13</span>
                </div>
                <div style="width:200px;height:200px" v-echarts="echartPie">
                </div>
            </div>
            <!--标签  -->
            <div class="flex row-around">
                <div class="flex column column-row-center">
                    <span class="f-color-grey f10">行业排名</span>
                    <span class="f14">第7位</span>
                </div>
                <div class="flex column column-row-center">
                    <span class="f-color-grey f10">高于同行</span>
                    <span class="f14">89.33%</span>
                </div>
            </div>
        </el-col>

        <el-col :span="8" class="h-100 flex row-center col-center">
            <!--雷达图  -->
            <div style="width:300px;height:250px" class="mt20" v-echarts="echartRadar">
            </div>
        </el-col>

        <el-col :span="8" class="h-100 flex column column-row-center column-col-center">
            <el-button style="width:150px">完整测评报告</el-button>
            <el-button style="width:150px" class="mt15 ml0">更新测评</el-button>
        </el-col>

    </el-row>
</template>

<script>
export default {
    data() {
        let orangeColor = '#ff8932'
        return {
            echartPie: {
                series: [
                    {
                        data: [
                            { value: 80, name: '' },
                            { value: 20, name: '' },
                        ],
                        // name: '菠菜指数',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [orangeColor, '#eee'];
                                    return colorList[params.dataIndex];
                                },
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                    }
                ]
            },

            echartRadar: {
                title: {
                    text: '雷达图'
                },
                tooltip: {},
                radar: {
                    shape: 'circle',
                    indicator: [
                        { name: '运营', max: 100 },
                        { name: '产品', max: 100 },
                        { name: '硬件', max: 100 },
                        { name: '客服', max: 100 },
                    ],
                    name: {
                        textStyle: {
                            color: '#777'
                        }
                    },
                },
                series: [{
                    type: 'radar',
                    areaStyle: {
                        normal: {
                            color: orangeColor
                        }
                    },
                    data: [
                        {
                            value: [80, 50, 40.12, 76],
                            name: '预算分配（Allocated Budget）'
                        }
                    ]
                }]
            },
        }
    }
}
</script>