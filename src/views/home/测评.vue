<style lang="scss" scoped>
.pie{
    $size:100px;
    width: $size;
    height: $size;
}
</style>
<template>
    <div v-if="data">

        <!--环形饼图  -->
        <div class="relative flex row-center">
            <ui-echarts v-if="pieValue" :option="echartPie" class="pie mr20"></ui-echarts>
            <div v-if="good_percent" class="flex column column-col-around">
                <div class="flex col-center row-center">
                    <span class="f16 mr5">菠菜指数</span>
                    <span class="f-color-orange f24">{{pieValue}}</span>
                </div>
                <div class="flex f14">
                    <div class="flex column column-row-center mr25">
                        <span class="f-color-grey">行业排名</span>
                        <span>第{{score_rank}}位</span>
                    </div>
                    <div class="flex column column-row-center">
                        <span class="f-color-grey">高于同行</span>
                        <span class="f16">{{good_percent}}%</span>
                    </div>
                </div>
            </div>
            <div v-else class="f18 f-color-grey">暂无数据</div>
        </div>

        <hr>

        <div class="flex row-center col-center">
            <!--雷达图  -->
            <ui-echarts v-if="redarValue.length>0" :option="echartRadar" style="width:300px;height:220px"></ui-echarts>
        </div>

        <div class="flex row-around">
            <el-button style="width:150px" @click="$router.push({name:'测评'})">完整测评报告</el-button>
            <el-button style="width:150px" @click="$alert('敬请期待')">更新测评</el-button>
        </div>

    </div>
</template>

<script>
import 'echarts/lib/chart/pie'; // 饼图
import 'echarts/lib/chart/radar'; // 雷达图
let orangeColor = '#ff8932'

export default {
    props: ['data'],
    data() {
        return {
            redarIndicator:[],
            redarValue:[],

            pieValue:null,

            good_percent:'',//高于同行
            score_rank:'',//行业排名
        }
    },
    computed: {
        echartRadar(){
            return {
                title: {
                    text: '雷达图'
                },
                tooltip: {
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {top: pos[1]-130};
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj;
                    }
                },
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
                        radius: ['30%', '70%'],
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
        // 读取行业排名
        this.$http.get('index.php?g=home&m=PaperRecord&a=company_detail', {
            params:{
                company_id: this.$store.state.common.company_id,
                paper_id: 13
            }
        })
        .then(({data})=>{
            console.log('公司测评详情',data)
            if (data.code==1) {
                this.good_percent = parseFloat(data.data.good_percent).toFixed(2)
                this.score_rank = data.data.score_rank
            }
        })
    },
    watch: {
        data(v){
            // 获取雷达图数据
            let redarData = v.paper.node_info
            for (let key in redarData) {
                let d = redarData[key]
                if (d && d.node_name!=='概述') {
                    this.redarIndicator.push({name:d.node_name, max:100})
                    this.redarValue.push(d.totalScore)
                }
            }

            // 获取饼图数据
            this.pieValue = v.paper.score
        }
    }
}
</script>