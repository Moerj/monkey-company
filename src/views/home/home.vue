<style lang="scss" scoped>
.tabBtn {
    width: 50px;
    height: 25px;
}
</style>

<template>
    <div>
        <ui-title class="ui-border-bottom">测评</ui-title>
        <page-cepin :data="data"></page-cepin>
    

        <ui-title class="mt50 ui-border-bottom">优惠</ui-title>
        <div class="flex">
            <el-button type="text" :class="{'f-color-grey': youhuiTab!==1}" @click="youhuiTab=1">今天</el-button>
            <i class="p15 f-color-grey">|</i>
            <el-button type="text" :class="{'f-color-grey': youhuiTab!==2}" @click="youhuiTab=2">全部</el-button>
        </div>
        <div class="flex" style="width:800px">
            <el-card class="flex-1 mr15 cursor-pointer">
                <div class="flex row-between">
                    <span>兑换金额
                        <i class="f14 f-color-orange" v-if="youhuiTab==1">{{coupon.today_exchange_amount}}</i>
                        <i class="f14 f-color-orange" v-else>{{coupon.total_exchange_amount}}</i>
                    </span>
                    <span>兑换数量
                        <i class="f14 f-color-orange" v-if="youhuiTab==1">{{coupon.today_exchange_count}}</i>
                        <i class="f14 f-color-orange" v-else>{{coupon.total_exchange_count}}</i>
                    </span>
                    <i class="el-icon-arrow-right f-color-grey"></i>
                </div>
            </el-card>
            <el-card class="flex-1 mr15 cursor-pointer">
               <div class="flex row-between">
                   <span>发布金额
                       <i class="f14 f-color-orange" v-if="youhuiTab==1">{{coupon.today_publish_amount}}</i>
                       <i class="f14 f-color-orange" v-else>{{coupon.total_publish_amount}}</i>
                   </span>
                   <span>发布数量
                       <i class="f14 f-color-orange" v-if="youhuiTab==1">{{coupon.today_publish_count}}</i>
                       <i class="f14 f-color-orange" v-else>{{coupon.total_publish_count}}</i>
                   </span>
                   <i class="el-icon-arrow-right f-color-grey"></i>
               </div>
            </el-card>
        </div>


        <ui-title class="mt50 ui-border-bottom">趋势</ui-title>
        <page-qushi></page-qushi>


        <ui-title class="mt50 ui-border-bottom">动态</ui-title>
        <list-item v-for="item in articleData" :key="item.id" v-if="item" :data="item"></list-item>

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
            data:null,
            coupon: {},
            articleData:[]
        }
    },
    created () {
        // 概览信息
        this.$http.get('index.php?g=home&m=CompanyUser&a=company_info')
        .then(({data})=>{
            console.log('概览信息', data);
            if (data.code==1) {
                this.data = data.data
                this.coupon = data.data.coupon
            }
        })

        // 5条文章动态
        this.$http.get('index.php?g=home&m=content&a=post_list', {
            params: {
                page_size:5,
                author_id: this.$store.state.user.user_id
            }
        })
        .then(({data})=>{
            console.log('5条文章动态',data)
            if (data.code==1) {
                this.articleData = data.data
            }
        })
    }
}
</script>