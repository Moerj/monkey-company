<template>
    <div>
        <searchbar :on-search="onSearch"></searchbar>
    
        <div class="flex row-between ui-border-bottom pb10 pt10 ml20 mr20" v-for="item in 5">
            <div class="flex col-center">
                <ui-img url="http://tva3.sinaimg.cn/crop.536.63.373.373.180/8d65f675jw8f0c5pbbtg7j20u50k4jvi.jpg" class="ui-circle mr10" size="30px"></ui-img>
                <span>Moer, 领取了xxx优惠券, 优惠码:efhwwoife</span>
            </div>
            <div>
                <span class="f10 f-color-grey mr10">2015-13-55</span>
                <el-tag type="success">已领取</el-tag>
            </div>
        </div>

        <div class="text-center mt15">
            <el-pagination @size-change="" @current-change="" :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import searchbar from '@/views/searchbar'
export default {
    components: {
        searchbar
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