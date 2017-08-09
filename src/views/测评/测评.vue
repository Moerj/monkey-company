<template>
    <div>
        <el-tabs v-model="tab">
            <el-tab-pane v-for="item in tabData" :key="item.id" :label="item.name" :name="item.name">
                <list :node-id="item.id"></list>
            </el-tab-pane>  
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
                tab:'产品',
                tabData:[],
            }
        },
        mounted () {
             // 获取一级节点id
            this.$http.get('index.php?g=home&m=PaperRecord&a=company_detail', {
                params:{
                    company_id: this.$store.state.user.company_id,
                    paper_id: 13
                }
            })
            .then(({data})=>{
                console.log('公司评测详情',data)
                if (data.code===1) {
                    this.tabData = data.data.first_nodes

                    console.log(this.tabData);
                }
            }) 

        }
    }
</script>