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
                    <div class="f-color-grey f12">菠菜指数</div>
                    <div class="f-color-orange f24">{{pieValue}}</div>
                </div>
                <ui-echarts v-if="pieValue" :option="echartPie"  style="width:200px;height:200px"></ui-echarts>
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
            <ui-echarts v-if="redarValue.length>0" :option="echartRadar" class="mt20" style="width:300px;height:220px"></ui-echarts>
        </el-col>

        <el-col :span="8" class="h-100 flex column column-row-center column-col-center">
            <el-button style="width:150px">完整测评报告</el-button>
            <el-button style="width:150px" class="mt15 ml0">更新测评</el-button>
        </el-col>

    </el-row>
</template>

<script>
import 'echarts/lib/chart/pie'; // 饼图
import 'echarts/lib/chart/radar'; // 雷达图
let orangeColor = '#ff8932'

export default {
    data() {
        return {
            redarIndicator:[],
            redarValue:[],

            pieValue:null
        }
    },
    computed: {
        echartRadar(){
            return {
                title: {
                    text: '雷达图'
                },
                tooltip: {},
                radar: {
                    startAngle: 45,
                    shape: 'circle',
                    indicator: this.redarIndicator,
                    // indicator: [
                    //     { name: '运营', max: 100 },
                    //     { name: '产品', max: 100 },
                    //     { name: '硬件', max: 100 },
                    //     { name: '客服', max: 100 },
                    // ],
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
                            // value: [80, 50, 40.12, 76],
                            value: this.redarValue,
                            name: '预算分配（Allocated Budget）'
                        }
                    ]
                }]
            }
        },
        echartPie(){
            return {
                series: [
                    {
                        data: [
                            { value: this.pieValue, name: '' },
                            { value: 100-this.pieValue, name: '' },
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
            }
        }
    },
    created () {
        this.$http.get('index.php?g=home&m=CompanyUser&a=company_info')
        .then(({data})=>{
            console.log('概览信息:',data)
            if (data.code===1) {

                // 获取雷达图数据
                let redarData = data.data.paper.node_info
                for (let key in redarData) {
                    let d = redarData[key]
                    if (d && d.node_name!=='概述') {
                        this.redarIndicator.push({name:d.node_name, max:100})
                        this.redarValue.push(d.totalScore)
                    }
                }

                // 获取饼图数据
                this.pieValue = data.data.paper.score
            }
        })
    }
}
</script>