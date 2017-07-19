<template>
    <div>
        <el-tabs v-model="tab">
            <el-tab-pane label="彩金列表" name="1">
                <searchbar :on-search="onSearch"></searchbar>
            </el-tab-pane>
            <el-tab-pane label="领取记录" name="2">
                <searchbar :on-search="onSearch"></searchbar>
            </el-tab-pane>
            <el-tab-pane label="发布彩金" name="3">角色管理</el-tab-pane>
            <el-tab-pane label="推送彩金" name="4">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import searchbar from '@/views/searchbar'
export default {
    components: {
        searchbar
    },
    data() {
        return {
            tab: '1',
            
        }
    },
    methods: {
        onSearch(params){
            console.log('搜索参数:', params);
        }
    }
}
</script>