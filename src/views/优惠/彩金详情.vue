<style lang="scss" scoped>
    .el-form-item{
        margin-bottom: 10px;
    }
</style>
<template>
    <ui-main title="彩金详情">
        <el-form v-if="data" label-width="120px" style="width:500px">
            <el-form-item label="彩金类型">
                <i v-if="data.type==1">白菜</i>
                <i v-if="data.type==2">固定存送</i>
                <i v-if="data.type==3">比例存送</i>
            </el-form-item>
            <el-form-item label="金额" v-if="data.type==1">
                {{data.amount}}
            </el-form-item>
            <el-form-item label="存款金额" v-if="data.type==2">
                {{data.min}}
            </el-form-item>
            <el-form-item label="最低存款" v-if="data.type==3">
                {{data.min}}
            </el-form-item>
            <el-form-item label="赠送金额" v-if="data.type!=1 && data.type!=3">
                <span>{{data.max}}</span>
            </el-form-item>
            <el-form-item label="最高赠送" v-if="data.type!=1 && data.type!=2">
                <span>{{data.max}}</span>
            </el-form-item>
            <el-form-item label="存送比例" v-if="data.type!=1 && data.type!=2">
                <span>{{data.scale}}%</span>
            </el-form-item>
            <el-form-item label="提款上限">
                <span>{{data.r_limit}}</span>
            </el-form-item>
            <el-form-item label="流水要求">
                <span>{{data.multiple}}</span>
            </el-form-item>
            <el-form-item label="会员日限量">
                <span>{{data.user_day_num}}</span>
            </el-form-item>
            <el-form-item label="每日总限量">
                <span>{{data.day_num}}</span>
            </el-form-item>
            <el-form-item label="领取要求">
                 <el-tag v-for="item in data.couponRequest" :key="item.id" type="primary" class="f-color-blue mr5">{{item.name}}</el-tag> 
            </el-form-item>
            <el-form-item label="领取方式">
                  <el-tag v-if="data.drawType" type="primary" class="f-color-blue mr5">{{data.drawType.name}}</el-tag>  
                  <span v-else>无</span>
            </el-form-item>
            <el-form-item label="详细列表">
                <el-button type="text" @click="$router.push({path:'/youhui',query:{tab:'2'}})">查看</el-button>
            </el-form-item>
            <el-form-item label="活动规则">
                <div v-html="data.desc"></div>
            </el-form-item>
        </el-form>
    </ui-main>
</template>
<script>
    export default {
        data () {
            return {
                isEdit:false,
                data:null,//查看的数据
                couponRequestOpt:[],
                drawTypeOpt:[]
            }
        },
        created () {
            this.$http.get('index.php?g=home&m=GameCoupon&a=coupon_detail', {
                params:{
                    id:this.$route.query.id
                }
            })
            .then(({data})=>{
                console.log('优惠券详情',data)
                if (data.code===1) {
                    this.data  = data.data
                }else{
                    this.$alert(data.msg).then(() => {
                        this.$router.go(-1)
                    })
                }
            })

            // 领取要求
            this.$http.get('index.php?g=home&m=DictItem&a=get_items', {
                params:{
                    nid:'coupon_request'
                }
            })
            .then(({data})=>{
                // console.log('领取要求',data)
                if (data.code==1) {
                    this.couponRequestOpt = data.data
                }
            })

            // 领取方式
            this.$http.get('index.php?g=home&m=DictItem&a=get_items', {
                params:{
                    nid:'draw_type'
                }
            })
            .then(({data})=>{
                console.log('领取方式',data)
                if (data.code==1) {
                    this.drawTypeOpt = data.data
                }
            })
        },
    }
</script>