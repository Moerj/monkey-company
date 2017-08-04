<template>
    <div>
        <searchbar :on-search="onSearch">
        </searchbar>
        <!--优惠券列表  -->
        <div class="flex flex-wrap">
            <item-coupon v-for="(item,i) in 10" :key="i"></item-coupon>
        </div>
        <div class="text-center mt15">
            <el-pagination @size-change="" @current-change="" :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
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
            currentPage:1
        }
    },
    methods: {
        onSearch(params) {
            console.log('搜索参数:', params);
        }
    }
}
</script>