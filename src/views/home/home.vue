<style lang="scss" scoped>
.tabBtn {
    width: 50px;
    height: 25px;
}
</style>

<template>
    <div>
        <ui-title class="ui-border-bottom">测评</ui-title>
        <page-cepin></page-cepin>
    

        <ui-title class="mt50 ui-border-bottom">优惠</ui-title>
        <div class="flex">
            <el-button type="text" :class="{'f-color-grey': youhuiTab!==1}" @click="youhuiTab=1">今天</el-button>
            <i class="p15 f-color-grey">|</i>
            <el-button type="text" :class="{'f-color-grey': youhuiTab!==2}" @click="youhuiTab=2">全部</el-button>
        </div>
        <div class="flex" style="width:800px">
            <el-card class="flex-1 mr15 cursor-pointer">
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
            <el-card class="flex-1 cursor-pointer">
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
    

        <ui-title class="mt50 ui-border-bottom">趋势</ui-title>
        <page-qushi></page-qushi>


        <ui-title class="mt50 ui-border-bottom">动态</ui-title>
        <list-item v-for="(item,index) in 4" :key="'list-item'+index"></list-item>

    </div>
</template>

<script>
// 子页面
import pageQushi from './趋势'
import pageCepin from './测评'
import listItem from '@/views/动态/list-item'

export default {
    components: {
        pageQushi,
        pageCepin,
        listItem
    },
    data() {
        return {
            youhuiTab: 1,
            data:null
        }
    },
    created () {
        
    }
}
</script>