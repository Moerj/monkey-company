<template>
    <div>
        <el-tabs v-model="tab" @tab-click="tabClick">
          <el-tab-pane label="基本资料" name="1">
              <pane1></pane1>
          </el-tab-pane>
          <el-tab-pane label="密码安全" name="2">
              <pane2></pane2>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import pane1 from './基本资料.vue'
    import pane2 from './密码安全.vue'
    export default {
        components: {
            pane1,
            pane2
        },
        data () {
            return {
                tab: '1'
            }
        },
        mounted () {
            this.tabClick()
        },
        methods: {
            tabClick(){
                this.$router.push({
                    query:{
                        tab:this.tab
                    }
                })
            }
        }
    }
</script>