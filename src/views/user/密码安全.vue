<style lang="scss" scoped>
.input {
    width: 200px;
}
</style>
<template>
    <div class="ui-form">

        <div v-if="type=='mobile'">
            <ui-title>
                验证手机
                <el-button type="text" class="ml30" @click="type='email'">切换到邮箱</el-button>
            </ui-title>
            <el-form class="ml20">
                <el-form-item label="当前绑定的手机号:">
                    137****3333
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入验证码"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="ui-button-large" @click="type='next'">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-else-if="type=='email'">
            <ui-title>
                验证邮箱
                <el-button type="text" class="ml30" @click="type='mobile'">切换到手机</el-button>
            </ui-title>

            <el-form class="ml20">
                <el-form-item label="当前绑定的邮箱号:">
                    afe**1234@163.com
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入验证码"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="ui-button-large" @click="type='next'">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-else>
            <ui-title>修改密码</ui-title>
            <el-form label-width="70px" label-position="left" class="ml20">
                <el-form-item label="原密码">
                    <el-input placeholder="请输入验证码"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="重复输入">
                    <el-input placeholder="请重复输入新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="ui-button-large">修改密码</el-button>
                </el-form-item>
            </el-form>
        </div>
    
    </div>
</template>
<script>
    export default {
        data () {
            return {
                type:'mobile'
            }
        }
    }
</script>