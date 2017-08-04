<style lang="scss" scoped>
    .el-form-item{
        margin-bottom: 10px;
    }
    // .el-form-item__label,.el-form-item__content{
    //     border:1px solid #eee;
    // }
</style>
<template>
    <ui-main title="彩金详情">
        <el-form label-width="120px" style="width:500px">
            <el-form-item label="彩金类型">
                <el-input v-if="isEdit"></el-input>
                <span v-else>存送</span>
            </el-form-item>
            <el-form-item label="存款金额">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100</span>
            </el-form-item>
            <el-form-item label="赠送金额">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100</span>
            </el-form-item>
            <el-form-item label="存送比例">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100%</span>
            </el-form-item>
            <el-form-item label="最高赠送">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100</span>
            </el-form-item>
            <el-form-item label="提款上限">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100</span>
            </el-form-item>
            <el-form-item label="流水要求">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100</span>
            </el-form-item>
            <el-form-item label="会员日限量">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100</span>
            </el-form-item>
            <el-form-item label="每日总限量">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100</span>
            </el-form-item>
            <el-form-item label="领取要求">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100</span>
            </el-form-item>
            <el-form-item label="领取方式">
                <el-input v-if="isEdit"></el-input>
                <span v-else>100</span>
            </el-form-item>
            <el-form-item label="详细列表">
                <el-button type="text">查看</el-button>
            </el-form-item>
            <el-form-item label="活动规则">
                <el-input type="textarea" v-if="isEdit"></el-input>
                <div v-else>
                    1. 活动规则xxxxxx<br>
                    1. 活动规则xxxxxx<br>
                    1. 活动规则xxxxxx<br>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="ml50">
                    <div v-if="isEdit">
                        <el-button @click="isEdit=false">取消</el-button>
                        <el-button type="primary">保存</el-button>
                    </div>
                    <el-button v-else type="primary" @click="isEdit=true">编辑</el-button>
                </div>
            </el-form-item>
        </el-form>
    </ui-main>
</template>
<script>
    export default {
        data () {
            return {
                isEdit:false
            }
        }
    }
</script>