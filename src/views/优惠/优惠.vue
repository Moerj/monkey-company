<template>
    <div>
        <el-tabs v-model="tab">
            <el-tab-pane label="彩金列表" name="1">
                <tab1></tab1>
            </el-tab-pane>
            <el-tab-pane label="领取记录" name="2">
                <tab2></tab2>
            </el-tab-pane>
            <el-tab-pane label="发布彩金" name="3">
                <tab3></tab3>
            </el-tab-pane>
            <el-tab-pane label="推送彩金" name="4">
                <tab4></tab4>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import tab1 from './彩金列表'
import tab2 from './领取记录'
import tab3 from './发布彩金'
import tab4 from './推送彩金'
export default {
    components: {
        tab1,
        tab2,
        tab3,
        tab4
    },
    data() {
        return {
            tab: this.$route.query.tab || '1',
        }
    },
    watch: {
        tab(v){
            this.$router.push({
                path: this.$route.path,
                query: {
                    tab: v
                }
            })
        }
    },
}
</script>