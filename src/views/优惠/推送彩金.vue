<template>
    <div>
        <el-form label-width="100px" class="ui-form">
            <el-form-item label="彩金名称">
                <el-select filterable placeholder="从已有的彩金选择一个" v-model="selectedItem" value-key="id">
                    <el-option v-for="item in couponIdOpt" :key="item.id" :value="item" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="彩金数量">
                <span class="pl5 f-color-orange">{{selectedItem.num}}</span>
            </el-form-item>
            <el-form-item label="推送数量">
                <el-input-number v-model="form.num" :min="1" :max="parseInt(selectedItem.num)"></el-input-number>
            </el-form-item>
            <el-form-item label="目标群体">
                <el-select v-model="form.user_group_id">
                    <el-option v-for="item in userGroupIdOpt" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">申请推送</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                form:{
                    coupon_id:'',
                    num:0,
                    user_group_id:''
                },
                couponIdOpt:[],
                userGroupIdOpt:[],
                selectedItem:{},
            }
        },
        created () {
            // 目标群体
            this.$http.get('index.php?g=home&m=DictItem&a=get_items', {
                params:{
                    nid: 'normal_user_group'
                }
            })
            .then(({data})=>{
                // console.log('目标群体',data)
                if (data.code==1) {
                    this.userGroupIdOpt = data.data
                }
            })


            // 彩金名称
            this.$http.get('index.php?g=home&m=GameCoupon&a=coupon_list',{
                params:{
                    search_field: 'company',
                    search_value: this.$store.state.common.company_id
                }
            })
            .then(({data})=>{
                // console.log('推送彩金-彩金名称',data)
                if (data.code===1) {
                    this.couponIdOpt = data.data
                }
            })
        },
        methods: {
            submit(){
                this.$http.post('index.php?g=home&m=CompanyUser&a=push_coupon', 
                    this.form
                )
                .then(({data})=>{
                    console.log('公司用户_推送优惠券',data)
                    this.$message(data.msg)
                })
            },
        },
        watch: {
            selectedItem(item){
                this.form.coupon_id = item.id
            }
        }
    }
</script>