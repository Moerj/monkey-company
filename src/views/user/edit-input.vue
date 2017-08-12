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
    }
</style>
<template>
    <span>
            <span v-if="val && !inputVisible">
                <div v-html="val" @click="edit" v-if="type==='textarea'" class="textarea"> 
                </div>
                <el-tag type="success" v-else @click.native="edit"> 
                    {{val}} 
                </el-tag>
            </span>
            <el-input v-if="inputVisible" ref="input" :autosize="{ minRows: 4}" v-model="val" :type="type" 
                @blur="save" @keyup.enter.native="save"
                size="small" style="width:200px"></el-input>
            <el-button v-else-if="!val" size="small" @click="edit" type="text">
                <span>新增</span>
            </el-button>

    </span>
</template>
<script>
    export default {
        props: {
            value:{},
            type:{
                type:String
            },
            change:{
                // 回调
                type:Function
            },
        },
        data () {
            return {
                inputVisible: false,
                val:this.value
            }
        },
        methods: {
            save(){
                this.inputVisible = false
                this.$emit('input', this.val) 

                this.change && this.change({
                    value: this.val,
                })
            },
            edit(){
                this.inputVisible=true
                this.$nextTick(() => {
                    let input = this.$refs['input'].$el.children[0]
                    input.focus()
                    input.select()
                })
            },
        },
        watch: {
            value(v){
                if (v) {
                    this.val = v
                }
            }
        },
    }
</script>