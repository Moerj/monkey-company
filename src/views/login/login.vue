<template>
    <div class="vh-100 p15 flex column">

        <login-header></login-header>
    
        <div class="flex-1 flex row-center col-center ui-border-top">
            <el-form ref="form" :model="form" label-width="80px" >
                <el-form-item label="公司账号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.pass"></el-input>
                </el-form-item>
                <el-form-item class="flex row-between">
                    <el-button type="primary">登 陆</el-button>
                    <router-link to="/regist" class="ml15">
                        <el-button type="default">注 册</el-button>
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
                pass: ''
            }
        }
    }
}
</script>