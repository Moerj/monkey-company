<style lang="scss" scoped>
    .el-form-item{
        margin-bottom: 10px;
    }
</style>
<template>
    <ui-main title="彩金详情">
        <el-form v-if="data" label-width="120px" style="width:500px">
            <el-form-item label="彩金类型">
                <el-select v-if="isEdit" v-model="form.type">
                    <el-option :value="1" label="白菜">白菜</el-option>
                    <el-option :value="2" label="固定存送">固定存送</el-option>
                    <el-option :value="3" label="比例存送">比例存送</el-option>
                </el-select>
                <span v-else>
                    <i v-if="data.type==1">白菜</i>
                    <i v-if="data.type==2">固定存送</i>
                    <i v-if="data.type==3">比例存送</i>
                </span>
            </el-form-item>
            <el-form-item label="存款金额">
                <el-input v-if="isEdit" v-model="form.amount"></el-input>
                <span v-else>{{data.amount}}</span>
            </el-form-item>
            <el-form-item label="赠送金额">
                <el-input v-if="isEdit"></el-input>
                <span v-else>无字段</span>
            </el-form-item>
            <el-form-item label="存送比例">
                <el-input v-if="isEdit" v-model="form.scale"></el-input>
                <span v-else>{{data.scale}}%</span>
            </el-form-item>
            <el-form-item label="最高赠送">
                <el-input v-if="isEdit" v-model="form.max"></el-input>
                <span v-else>{{data.max}}</span>
            </el-form-item>
            <el-form-item label="提款上限">
                <el-input v-if="isEdit" v-model="form.r_limit"></el-input>
                <span v-else>{{data.r_limit}}</span>
            </el-form-item>
            <el-form-item label="流水要求">
                <el-input v-if="isEdit" v-model="form.multiple"></el-input>
                <span v-else>{{data.multiple}}</span>
            </el-form-item>
            <el-form-item label="会员日限量">
                <el-input v-if="isEdit" v-model="form.user_day_num"></el-input>
                <span v-else>{{data.user_day_num}}</span>
            </el-form-item>
            <el-form-item label="每日总限量">
                <el-input v-if="isEdit" v-model="form.day_num"></el-input>
                <span v-else>{{data.day_num}}</span>
            </el-form-item>
            <el-form-item label="领取要求">
                <el-select v-if="isEdit" v-model="form.coupon_request" multiple style="width:500px">
                    <el-option v-for="item in couponRequestOpt" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
                <div v-else>
                    <el-tag v-for="item in data.couponRequest" :key="item.id" type="primary">{{item.name}}</el-tag>
                </div>
            </el-form-item>
            <el-form-item label="领取方式">
                <el-input v-if="isEdit"></el-input>
                <span v-else>无字段</span>
            </el-form-item>
            <el-form-item label="详细列表">
                <el-button type="text" @click="$router.push({path:'/youhui',query:{tab:'2'}})">查看</el-button>
            </el-form-item>
            <el-form-item label="活动规则">
                <el-input type="textarea" v-if="isEdit"></el-input>
                <div v-else>
                    {{data.desc}}
                </div>
            </el-form-item>
            <el-form-item>
                <div class="ml50">
                    <div v-if="isEdit">
                        <el-button @click="isEdit=false">取消</el-button>
                        <el-button type="primary">保存</el-button>
                    </div>
                    <el-button v-else type="primary" @click="isEdit=true">编辑</el-button>
                </div>
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
                form:{
                    type:1,
                    amount:'',
                    scale:'',
                    max:'',
                    r_limit:'',
                    multiple:'',
                    user_day_num:'',
                    day_num:'',
                    coupon_request:[]
                },//编辑的数据
                couponRequestOpt:[],
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
                }
            })

            // 领取要求
            this.$http.get('index.php?g=home&m=DictItem&a=get_items', {
                params:{
                    nid:'coupon_request'
                }
            })
            .then(({data})=>{
                console.log('coupon_request',data)
                if (data.code==1) {
                    this.couponRequestOpt = data.data
                }
            })
        }
    }
</script>