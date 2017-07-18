<style lang="scss" scoped>
.tabBtn {
    width: 50px;
    height: 25px;
}
</style>

<template>
    <div>
        <ui-title>测评</ui-title>
        <page-cepin></page-cepin>
    

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
        <page-qushi></page-qushi>


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

// 子页面
import pageQushi from './趋势'
import pageCepin from './测评'

export default {
    components: {
        pageQushi,
        pageCepin
    },
    data() {
        return {
            youhuiTab: 1,
        }
    },
    methods: {
    }
}
</script>