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
        },
        mounted () {
            this.$http.get('index.php?g=home&m=PaperRecord&a=company_detail', {
                params:{
                    company_id: this.$store.state.user.company_id
                }
            })
            .then(({data})=>{
                console.log('公司评测详情',data)
            })

            this.$http.get('index.php?g=home&m=PaperRecord&a=first_node_detail', {
                params:{
                    company_id: this.$store.state.user.company_id
                }
            })
            .then(({data})=>{
                console.log('一级节点评测详情',data)
            })
        }
    }
</script>