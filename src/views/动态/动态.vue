<template>
    <div>
        <searchbar :on-search="onSearch"></searchbar>

        <el-button icon="edit" type="primary" class="mb20 mt20" @click="$router.push({name:'发文章'})">发布新文章</el-button>

        <list-item v-for="(item,index) in 6" :key="'list-item'+index"></list-item>
        <div class="text-center mt15">
            <el-pagination
            @size-change=""
            @current-change=""
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import listItem from '@/views/动态/list-item'
import searchbar from '@/views/searchbar'
export default {
    components: {
        listItem,
        searchbar
    },
    data() {
        return {
            currentPage:1,
        }
    },
    methods: {
        onSearch(params){
            console.log('搜索参数:', params);
        }
    }
}
</script>   