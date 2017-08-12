<template>
    <div>
        <div class="mb15 ui-form">
            <el-input v-model="search.keyword" placeholder="关键词" class="ui-input"></el-input>
            <el-select v-model="search.coupon_status" placeholder="查询状态">
                <el-option :value="-1" label="全部">
                </el-option>
                <el-option :value="1" label="正常">
                </el-option>
                <el-option :value="2" label="待审核">
                </el-option>
                <el-option :value="3" label="新建">
                </el-option>
                <el-option :value="4" label="审核驳回">
                </el-option>
            </el-select>
            <el-date-picker v-model="timeRange" type="datetimerange" placeholder="选择时间范围" @change="onSearchTime">
            </el-date-picker>
            <el-button type="primary" @click="doSearch">查询</el-button>
        </div>

        <!--优惠券列表  -->
        <div class="flex flex-wrap">
            <item-coupon v-for="item in couponList" :key="item.id" :data="item"></item-coupon>
        </div>
        <div class="text-center mt15">
            <el-pagination 
             @current-change="" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

    </div>
</template>
<script>
import searchbar from '@/views/searchbar'
import itemCoupon from '@/views/优惠/item-coupon.vue'
export default {
    components: {
        searchbar,
        itemCoupon,
    },
    data () {
        return {
            currentPage:1,
            total:0,
            pageSize:18,
            couponList:[],
            timeRange:[],
            search:{
                keyword:'',
                coupon_status:-1,
                coupon_begin_time:'',
                coupon_end_time:'',
            },
        }
    },
    methods: {
        doSearch() {
            let params = 

            params = Object.assign({},{
                page_no:this.currentPage,
                page_size:this.pageSize,
                search_field:'name|company',
                search_value:`${this.search.keyword}|${this.$store.state.common.company_id}`
            },this.search)

            this.$http.get('index.php?g=home&m=GameCoupon&a=coupon_list', {
                params:params
            })
            .then(({data})=>{
                console.log('彩金列表',data)
                if (data.code===1) {
                    this.couponList = data.data
                    this.total = data.total
                }
            })
        },
        onSearchTime(v){
            let timeRangeString = v.split(' - ')
            this.search.coupon_begin_time = timeRangeString[0]
            this.search.coupon_end_time = timeRangeString[1]
        }
    },
    mounted () {
        this.doSearch()
    },
}
</script>