<style lang="scss" scoped>
    @import '~@/scss/public.scss';
    .textarea{
        background: #f9f9f9;
        padding: 10px 20px;
        border-radius:8px;
        border: $ui-border;
    }
    .el-textarea{
        width: 100% !important;
        margin-bottom: 34px;
    }
</style>
<template>
    <span>
        <span v-if="val && !inputVisible">
            <div v-html="val" type="success" v-if="type==='textarea'" class="textarea"> 
            </div>
            <el-tag type="success" v-else > 
                {{val}} 
            </el-tag>
        </span>
        <el-input v-if="inputVisible" ref="input" :autosize="{ minRows: 4}" v-model="val" :type="type" @blur="save" @keyup.enter.native="save" size="small" style="width:200px"></el-input>
        <el-button v-else size="small" @click="openEdit" type="text">
            <span v-if="val">修改</span>
            <span v-else>新增</span>
        </el-button>
    </span>
</template>
<script>
    export default {
        props: {
            value:{
                type:String
            },
            type:{
                type:String
            }
        },
        data () {
            return {
                inputVisible: false,
                val:''
            }
        },
        methods: {
            save(){
                this.inputVisible = false
                this.$emit('input', this.val) 
            },
            openEdit(){
                this.inputVisible=true
                this.$nextTick(() => {
                    let input = this.$refs['input'].$el.children[0]
                    input.focus()
                    input.select()
                })
            }
        },
        watch: {
            value(v){
                if (v) {
                    this.val = v
                }
            }
        }
    }
</script>