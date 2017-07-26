<template>
    <div class="h-100 p15 flex column">

        <login-header></login-header>
    
        <div class="flex-1 flex column column-row-center ui-border-top">
            <p class="f-color-orange f20 mb30 mt100">Monkey tell</p>
            <el-form ref="form" :model="form" label-width="80px" style="width:300px">
                <el-form-item label="公司账号">
                    <el-input v-model="form.name" size="large"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.pass" size="large"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input v-model="form.verify" size="large" class="flex-1">
                        <template slot="append">
                            <img src="#" alt="验证码" style="width:100%;height:40%;border:none">
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item class="flex row-end">
                    <el-button type="primary" size="large" @click="submit" :loading="isLoading">登 陆</el-button>
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
                name: '',
                pass: '',
                verify:''
            },
            isLoading: false
        }
    },
    methods: {
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
            })
        }
    }
}
</script>