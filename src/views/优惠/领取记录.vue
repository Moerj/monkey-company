<template>
    <div v-loading="loading">
        <div class="mb15 ui-form">
            <el-input v-model="search.user_name" placeholder="用户名" class="ui-input"></el-input>
            <el-input v-model="search.keyword" placeholder="关键词" class="ui-input"></el-input>
            <el-select v-model="search.status" placeholder="状态">
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
            <el-date-picker v-model="dateRange" type="datetimerange" placeholder="选择时间范围" @change="syncDate">
            </el-date-picker>
            <el-button type="primary" @click="doSearch">查询</el-button>
        </div>
    
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
            listData:[],
            dateRange:[],
            search:{
                user_name:'',
                keyword:'',
                status:-1,
                begin_date:'',
                end_date:''
            }
        }
    },
    methods: {
        doSearch() {
            this.loading = true
            this.$http.get('index.php?g=home&m=CompanyUser&a=company_exchanges', {
                params:this.search
            })
            .then(({data})=>{
                console.log('查询领取记录:',data)
                this.loading = false
                if (data.code===1) {
                    this.listData = data.data.exchange
                    this.total = Number(data.total)
                }
            })
        },
        syncDate(v){
            let arry = v.split(' - ')
            this.search.begin_date = arry[0]
            this.search.end_date = arry[1]
        }
    },
    mounted () {
        this.doSearch()
    },
}
</script>