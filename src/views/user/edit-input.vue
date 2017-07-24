<template>
    <div>
        <span v-if="!inputVisible" class="mr15">{{val}}</span>
        <el-input v-if="inputVisible" v-model="val" @blur="save" @keyup.enter.native="save" size="small" style="width:200px"></el-input>
        <el-button v-else size="small" @click="inputVisible=true" type="text">
            <span v-if="val">修改</span>
            <span v-else>新增</span>
        </el-button>
    </div>
</template>
<script>
    export default {
        props: {
            value:{
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