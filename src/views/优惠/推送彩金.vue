<template>
    <div>
        <el-form label-width="100px" class="ui-form">
            <el-form-item label="彩金名称">
                <el-select placeholder="从已有的彩金选择一个" v-model="form.couponName">
                </el-select>
            </el-form-item>
            <el-form-item label="彩金数量">
                <span>50000</span>
            </el-form-item>
            <el-form-item label="推送数量">
                <el-input type="number"></el-input>
            </el-form-item>
            <el-form-item label="目标群体">
                <el-select v-model="form.target"></el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">申请推送</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                form:{
                    couponName:'',
                    pushNum:0,
                    target:''
                }
            }
        }
    }
</script>