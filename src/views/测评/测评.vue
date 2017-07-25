<template>
    <div>
        <el-tabs v-model="tab">
            <el-tab-pane label="产品" name="1">
                <list></list>
                <list></list>
                <list></list>
            </el-tab-pane>
            <el-tab-pane label="运营" name="2">配置管理</el-tab-pane>
            <el-tab-pane label="硬件" name="3">角色管理</el-tab-pane>
            <el-tab-pane label="客服" name="4">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div> 
</template>
<script>
    import list from './list'
    export default {
        components: {
            list
        },
        data () {
            return {
                tab:'1'
            }
        }
    }
</script>