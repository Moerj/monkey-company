<template>
    <div>
        <searchbar :on-search="onSearch">
        </searchbar>
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
            couponList:[]
        }
    },
    methods: {
        onSearch(params) {
            console.log('搜索参数:', params);
        }
    },
    created () {
        this.$http.get('index.php?g=home&m=GameCoupon&a=coupon_list', {
            params:{
                page_no:this.currentPage,
                page_size:this.pageSize
            }
        })
        .then(({data})=>{
            console.log('彩金列表',data)
            if (data.code===1) {
                this.couponList = data.data
                this.total = data.total
            }
        })
    }
}
</script>