<template>
    <span>
        <el-tag type="success" v-if="val && !inputVisible" > 
            {{val}} 
        </el-tag>
        <el-input v-if="inputVisible" v-model="val" :type="type" @blur="save" @keyup.enter.native="save" size="small" style="width:200px"></el-input>
        <el-button v-else size="small" @click="inputVisible=true" type="text">
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