<template>
    <div v-loading="loading" class="flex column">
        <div class="mb15 ui-form">
            <el-input v-model="search.keyword" placeholder="关键词" class="ui-input"></el-input>
            <el-select v-model="search.post_status">
                <el-option label="全部" value="0"></el-option>
                <el-option label="已审核" value="1"></el-option>
                <el-option label="待审核" value="2"></el-option>
            </el-select>
            <el-date-picker v-model="search.timeRange" type="datetimerange" placeholder="选择时间范围" @change="timeDataChange">
            </el-date-picker>
            <el-button type="primary" @click="doSearch">查询</el-button>
            <el-button icon="edit" type="primary" class="mb10" @click="$router.push({name:'发文章'})">发布新文章</el-button>
        </div>

        <!--文章列表  -->
        <list-item v-for="item in listData" :data="item" :key="item.id"></list-item>

        <!--分页  -->
        <div v-if="total>0" class="text-center mt15">
            <el-pagination
            @size-change=""
            @current-change="doSearch"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <div v-else class="flex row-center col-center flex-1 f20 f-color-grey">
            没有找到任何文章
        </div>

        <ui-router></ui-router>
    </div>
</template>
<script>
import listItem from '@/views/动态/list-item'
export default {
    components: {
        listItem,
    },
    data() {
        return {
            search:{
                keyword:'',
                timeRange:[],
                begin_date:'',
                end_date:'',
                post_status:''
            },
            currentPage:1,
            listData:null,
            total:0,
            pageSize:8,//设置每页显示条数
            loading: false
        }
    },
    methods: {
        doSearch(){
            console.log('搜索参数:', this.search);

            this.loading = true

            this.$http.get('index.php?g=home&m=content&a=post_list', {
                params: this.search
            })
            .then(({data})=>{
                console.log('查询文章列表',data)
                this.loading = false
                if (data.code===1) {
                    this.listData = data.data
                    this.total = Number(data.total)
                }
            }).catch(() => {
                this.loading = false
            })
        },
        timeDataChange(v){
            if (v) {
                let strArry = v.split(' - ')
                this.search.begin_date = strArry[0]
                this.search.end_data = strArry[1]
            }
        }
    },
    mounted () {
        // 设置查询的初始参数
        // 合并必须参数
        this.search = Object.assign({},this.search,{
            // 分页
            page_size:this.pageSize,
            page_no:this.currentPage,

            // 文章作者id
            author_id: this.$store.state.user_id
        })

        // 初始查询所有文章
        this.doSearch()
    },
}
</script>   