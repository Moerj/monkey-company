<template>
    <div v-loading="loading">
        <searchbar :on-search="doSearch" username></searchbar>
    
        <div v-for="item in listData" class="flex row-between ui-border-bottom pb10 pt10 ml20 mr20" >
            <div class="flex col-center">
                <ui-img :url="item.avatar" class="ui-circle mr10 bg-grey" size="30px"></ui-img>
                <span>
                    <b>{{item.user_nicename||item.user_login}}</b>，
                    领取了 <i class="f-color-orange">{{item.name}}</i> 优惠券，
                    优惠码: <i class="f-color-green">{{item.code}}</i> 
                </span>
            </div>
            <div>
                <span class="f10 f-color-grey mr10">{{item.create_time}}</span>
                <el-tag v-if="item.status==1" type="success">已领取</el-tag>
                <el-tag v-if="item.status==2" type="warning">待审核</el-tag>
                <el-tag v-if="item.status==3" type="default">新建</el-tag>
                <el-tag v-if="item.status==4" type="error">审核驳回</el-tag>
            </div>
        </div>

        <div v-if="total>0" class="text-center mt15">
            <el-pagination 
             @current-change="doSearch" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import searchbar from '@/views/searchbar'
export default {
    components: {
        searchbar,
        params:{}
    },
    data () {
        return {
            loading:false,
            currentPage:1,
            pageSize:10,
            total:0,
            listData:[]
        }
    },
    methods: {
        doSearch(params) {
            if (params) {
                console.log('搜索参数:', params);
            }

            this.loading = true
            this.$http.get('index.php?g=home&m=CompanyUser&a=company_exchanges', {
                params:params
            })
            .then(({data})=>{
                console.log('查询领取记录:',data)
                this.loading = false
                if (data.code===1) {
                    this.listData = data.data.exchange
                    this.total = Number(data.total)
                }
            })
        }
    },
    mounted () {
        this.doSearch()
    }
}
</script>