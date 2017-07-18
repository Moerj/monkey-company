<style lang="scss" scoped>
@import '~@/scss/public.scss';
.center-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tabBtn {
    width: 50px;
    height: 25px;
}
</style>

<template>
    <div>
        <ui-title>测评</ui-title>
        <el-row style="height:250px;">
            <el-col :span="8" class="h-100">
                <!--环形饼图  -->
                <div class="relative flex row-center">
                    <div class="center-label">
                        <span class="f-color-grey f12">菠菜指数</span>
                        <span class="f-color-orange f24">80.13</span>
                    </div>
                    <div style="width:200px;height:200px" v-echarts="echart_1">
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
                <div style="width:300px;height:250px" class="mt20" v-echarts="echart_2">
                </div>
            </el-col>
            <el-col :span="8" class="h-100 flex column column-row-center column-col-center">
                <el-button style="width:150px">完整测评报告</el-button>
                <el-button style="width:150px" class="mt15 ml0">更新测评</el-button>
            </el-col>
        </el-row>
    

        <ui-title class="mt50">优惠</ui-title>
        <div class="flex">
            <el-button type="text" :class="{'f-color-grey': youhuiTab!==1}" @click="youhuiTab=1">今天</el-button>
            <i class="p15 f-color-grey">|</i>
            <el-button type="text" :class="{'f-color-grey': youhuiTab!==2}" @click="youhuiTab=2">全部</el-button>
        </div>
        <div class="flex" style="width:800px">
            <el-card class="flex-1 mr15">
                <div class="flex row-between">
                    <span>发出彩金
                        <i class="f14 f-color-orange">1000个</i>
                    </span>
                    <span>共
                        <i class="f14 f-color-orange">1000个</i>
                    </span>
                    <i class="el-icon-arrow-right f-color-grey"></i>
                </div>
            </el-card>
            <el-card class="flex-1">
                <div class="flex row-between">
                    <span>发出彩金
                        <i class="f14 f-color-orange">1000个</i>
                    </span>
                    <span>共
                        <i class="f14 f-color-orange">1000个</i>
                    </span>
                    <i class="el-icon-arrow-right f-color-grey"></i>
                </div>
            </el-card>
        </div>
    

        <ui-title class="mt50">趋势</ui-title>
        <div class="flex row-between col-center">
            <div>
                <el-button type="text" :class="{'f-color-grey': qushiTab!==1}" @click="qushiTab=1">日趋势</el-button>
                <i class="p15 f-color-grey">|</i>
                <el-button type="text" :class="{'f-color-grey': qushiTab!==2}" @click="qushiTab=2">月趋势</el-button>
            </div>
        </div>
        <div style="width:100%;height:300px;" v-echarts="echart_qushi"></div>


        <ui-title class="mt50">动态</ui-title>
        <div class="ui-border-bottom pb15" v-for="item in 4">
            <span class="ui-clamp-2 pt15 pb15">这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,</span>
            <div class="flex row-between f10 f-color-grey">
                <div>
                    2017-05-20 12:39:30
                    <span class="pl10 f-color-text">公司信息</span>
                </div>
                <div class="flex col-center">
                    <div class="mr15">
                        <icon name="commenting-o"></icon>
                        <span>评论: <i class="f-color-blue">156</i></span>
                    </div>
                    <div class="flex col-center">
                        <icon name="star-o"></icon>
                        <span class="pl5">收藏: <i class="f-color-blue">156</i></span>
                    </div>
                    <span class="pl10 pr10">|</span>
                    <el-button size="mini" type="text">编辑</el-button>
                    <el-button size="mini" type="text">删除</el-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import 'echarts/lib/chart/pie'; // 饼图
import 'echarts/lib/chart/radar'; // 雷达图
import 'echarts/lib/chart/line'; // 折线图

import 'echarts/lib/component/tooltip'; // 提示框

export default {
    data() {
        let orangeColor = '#ff8932'
        return {
            // 菠菜指数
            echart_1: {
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

            // 雷达图
            echart_2: {
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
            youhuiTab: 1,

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
                    axisTick: {show:false},
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
    },
    methods: {
    }
}
</script>