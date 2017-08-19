<style lang="scss" scoped>
.input {
    width: 200px;
}
</style>
<template>
    <div class="ui-form">
        <div v-if="style=='mobile'">
            <ui-title>
                验证手机
                <el-button type="text" class="ml30" @click="style='email'">切换到邮箱</el-button>
            </ui-title>
            <el-form class="ml20">
                <el-form-item label="当前绑定的手机号:">
                    {{userInfo.mobile}}
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入验证码"></el-input>
                    <el-button @click="getCodeByMobile">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="ui-button-large" @click="checkCode">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-else-if="style=='email'">
            <ui-title>
                验证邮箱
                <el-button type="text" class="ml30" @click="style='mobile'">切换到手机</el-button>
            </ui-title>

            <el-form class="ml20">
                <el-form-item label="当前绑定的邮箱号:">
                    {{userInfo.user_email}}
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入验证码"></el-input>
                    <el-button @click="getCodeByEmail">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="ui-button-large" @click="checkCode">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-else>
            <ui-title>修改密码</ui-title>
            <el-form label-width="70px" label-position="left" class="ml20">
                <el-form-item label="原密码">
                    <el-input type="password" placeholder="请输入验证码" v-model="changePwd.old"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" placeholder="请输入新密码" v-model="changePwd.new"></el-input>
                </el-form-item>
                <el-form-item label="重复输入">
                    <el-input type="password" placeholder="请重复输入新密码" v-model="changePwd.recheckNew"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="ui-button-large" @click="changePassword">修改密码</el-button>
                </el-form-item>
            </el-form>
        </div>
    
    </div>
</template>
<script>
    export default {
        data () {
            return {
                userInfo:{},
                style:'mobile',
                mobile:'',
                email:'',
                code:'',
                changePwd:{
                    old:'',
                    new:'',
                    recheckNew:''
                }
            }
        },
        methods:{
            getCodeByMobile(){
                this.$http.post('index.php?g=home&m=Users&a=get_check_code',{
                    mobile:this.userInfo.mobile,
                    type:2
                })
                .then(({data})=>{
                    console.log('getCodeByMobile',data)
                })
            },
            getCodeByEmail(){
                this.$http.post('index.php?g=home&m=users&a=get_email_check_code',{
                    email:this.userInfo.user_email,
                    type:3
                })
                .then(({data})=>{
                    console.log('getCodeByEmail',data)
                })
            },
            checkCode(){//校验验证码
                this.$http.get('index.php?g=home&m=Users&a=check_code', {
                    params:{
                        code:this.code,
                        style: this.style==='mobile'?1:2,
                        type: this.style==='mobile'?2:3
                    }
                })
                .then(({data})=>{
                    console.log(data)
                    data.msg && this.$message(data.msg)
                    if (data.code===1) {
                        this.style = 'next'
                    }
                })
            },
            changePassword(){
                this.$http.post('index.php?g=home&m=Users&a=change_password',this.changePwd)
                .then(({data})=>{
                    console.log('修改密码',data)
                    data.msg && this.$message(data.msg)
                    if (data.code===1) {
                        this.$router.replace('/home')
                    }
                })
            }
        },
        created(){
            this.$http.get('index.php?g=home&m=Users&a=user_info',{
                params:{
                    user_type:3
                }
            })
            .then(({data})=>{
                console.log('获取用户数据',data)
                if (data.code===1) {
                    this.userInfo = data.data
                }
            })
        },
    }
</script>