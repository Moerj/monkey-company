<template>
    <div class="h-100 p15 flex column">

        <login-header></login-header>
    
        <div class="flex-1 flex column column-row-center ui-border-top">
            <p class="f-color-orange f20 mb30 mt100">Monkey tell</p>
            <el-form ref="form" :model="form" label-width="80px" style="width:300px">
                <el-form-item label="公司账号" prop="username" :rules="required">
                    <el-input v-model="form.username" size="large"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="required">
                    <el-input v-model="form.password" size="large"></el-input>
                </el-form-item>
                <el-form-item label="验证码" v-if="codeSrc">
                    <el-input v-model="form.verify" size="large" class="flex-1">
                        <template slot="append">
                            <img :src="codeSrc" @click="getCodeUrl" alt="验证码" style="width:90px;height:35px;border:none">
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item class="flex row-end">
                    <el-button type="primary" size="large" @click="login" :loading="isLoading">登 陆</el-button>
                    <router-link to="/regist" class="ml15">
                        <el-button type="default" size="large">注 册</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>


        <login-footer></login-footer>
    
    </div>
</template>

<script>
import loginHeader from './login-header'
import loginFooter from './login-footer'
export default {
    components: {
        loginHeader,
        loginFooter
    },
    data() {
        return {
            form: {
                username: '',
                password: '',
                verify:''
            },
            isLoading: false,
            codeSrc:'',
            required:{required:true,message:'必填'}
        }
    },
    methods: {
        login(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.submit()
                }
            });
        },
        submit(){
            this.isLoading = true
            this.$http.post('index.php?g=home&m=login&a=doCompanyUserLogin', this.form)
            .then(({data})=>{
                console.log(data)
                this.isLoading = false
                let msgType = data.code===1?'success':'error'

                data.msg && this.$message({
                    message:data.msg,
                    type:msgType
                })

                // 错误5次出验证码
                if (data.data.error_num>=5) {
                    this.getCodeUrl()
                }

                if (data.code===1) {
                    this.$router.push('/home')
                }
            })
        },
        getCodeUrl(){
            this.codeSrc = '#'
            this.$nextTick(() => {
                this.codeSrc = this.$http.config.baseURL + '/index.php?g=api&m=checkcode&a=index'
            })
        }  
    },
}
</script>