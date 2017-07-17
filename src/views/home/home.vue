<style lang="scss" scoped>
.cepin {
    height: 200px;
    flex: 1;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .center-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>

<template>
    <div>
        <ui-title>测评</ui-title>
        <div class="flex row-center col-center">
            <div class="cepin">
                <div style="height:200px;width:200px;" v-echarts="echart_1">
                </div>
                <div class="center-label">
                    <span class="f-color-grey f12">菠菜指数</span>
                    <span class="f-color-orange f24">80.13</span>
                </div>
            </div>
            <div class="cepin">
                echar2
            </div>
            <div class="cepin">
                buttons
            </div>
        </div>
    
    </div>
</template>

<script>
export default {
    data() {
        return {
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
                                    var colorList = ['#ff8932', '#eee'];
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
    }
}
</script>