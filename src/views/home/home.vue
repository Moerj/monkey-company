<style lang="scss" scoped>
    @import '~@/scss/public.scss';
    .tabBtn {
        width: 50px;
        height: 25px;
    }
    .bg-blue{
        @include color-gradient(#0c72e0,#2c95f0,white,left);
    }
    .gap{
        position: relative;
        @mixin gap{
            content: '';
            position: absolute;
            top: 50%;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: white;
            z-index: 1;
        }
        &::after{
            @include gap;
            left: 0;
            transform: translate3d(-50%,-50%,0);
        }
        &::before{
            @include gap;
            right: 0;
            transform: translate3d(50%,-50%,0);
        }
    }
</style>
<template>
    <div class="flex">

        <div style="width:350px;" class="flex column">
            <!--测评图表  -->
            <div class="ui-border p15 mb15">
                <ui-title class="ui-border-bottom">测评</ui-title>
                <page-cepin :data="data" ></page-cepin>
            </div>

            <!--优惠  -->
            <div class="ui-border p15 flex-1 flex column" style="min-height:300px">
                <ui-title class="ui-border-bottom">优惠
                    <div slot="right">
                        <el-button type="text" class="p5" :class="{'f-color-grey': youhuiTab!==1}" @click="youhuiTab=1">今天</el-button>
                        <i class="f-color-grey">|</i>
                        <el-button type="text" class="p5" :class="{'f-color-grey': youhuiTab!==2}" @click="youhuiTab=2">全部</el-button>
                    </div>
                </ui-title>
                <div class="flex-1 flex column column-col-around column-row-stretch p15">
                    <div class="gap mr15 mb20 bg-blue flex row-around p20">
                        <span>兑换金额
                            <div class="f18 mt5 text-center" v-if="youhuiTab==1">{{coupon.today_exchange_amount}}元</div>
                            <div class="f18 mt5 text-center" v-else>{{coupon.total_exchange_amount}}元</div>
                        </span>
                        <span>兑换数量
                            <div class="f18 mt5 text-center" v-if="youhuiTab==1">{{coupon.today_exchange_count}}个</div>
                            <div class="f18 mt5 text-center" v-else>{{coupon.total_exchange_count}}个</div>
                        </span>
                    </div>
                    <div class="gap ui-bg-gradient flex row-around p20 mr15">
                        <span>发布金额
                            <div class="f18 mt5 text-center" v-if="youhuiTab==1">{{coupon.today_publish_amount}}元</div>
                            <div class="f18 mt5 text-center" v-else>{{coupon.total_publish_amount}}元</div>
                        </span>
                        <span>发布数量
                            <div class="f18 mt5 text-center" v-if="youhuiTab==1">{{coupon.today_publish_count}}个</div>
                            <div class="f18 mt5 text-center" v-else>{{coupon.total_publish_count}}个</div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 ml15 flex column">
            <!--趋势图  -->
            <div class="ui-border p15 mb15">
                <page-qushi></page-qushi>
            </div>
        
            <!--动态  -->
            <div class="ui-border p15 flex-1 flex column" style="min-height:440px">
                <div>
                    <ui-title class="ui-border-bottom">动态</ui-title>
                </div>
                <div class="flex-1 scroll">
                    <list-item v-for="(item,i) in $store.state.post_list" :key="item.id" v-if="item" :data="item" :style="{'border-bottom':isLastItem(i), 'padding-bottom':isLastItem(i)}"></list-item> 
                </div>
            </div>
        </div>


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
                author_id: this.$store.state.common.user_id
            }
        })
        .then(({data})=>{
            console.log('5条文章动态',data)
            if (data.code==1) {
                this.$store.commit({
                    type: 'update',
                    data: data.data,
                    modules: 'post_list' //文章列表
                })
            }
        })
    },
    methods: {
        isLastItem(index){//判断是否为最后一条动态,改变样式
            return index===this.$store.state.post_list.length-1 ? '0 !important' :''
        }
    }
}
</script>