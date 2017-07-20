<template>
    <div class="h-100 p15 flex column">
        <login-header></login-header>
    
        <el-steps :space="200" :active="step" :center="true">
            <el-step title="账号设置"></el-step>
            <el-step title="基本资料"></el-step>
            <el-step title="联系方式"></el-step>
        </el-steps>
    
        <div class="flex-1 flex row-center col-center ui-border-top scroll-y">
            <div class="flex column column-row-center" v-if="submitSuccess">
                <img src="~@/icons/check-circle-o.png" style="width:80px;">
                <p class="f20 mt15">提交成功</p>
                <span class="text-center f-color-grey">
                    您的申请将会在工作日的一个小时之内处理完毕
                    <br>
                    申请结果将邮件发送到您的注册邮箱
                </span>
                <el-button type="primary" class="pl50 pr50 m50" @click="$router.push('/home')">回到首页</el-button>

                <p>
                    工作时间: 周一到周五  商务10点~下午8点 (国家法定节假日统一休息)
                </p>
            </div>
            <el-form ref="form" label-width="80px" v-else>
                <div v-show="step===1">
                    <el-form-item label="公司账号">
                        <el-input v-model="form.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.pass"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="form.repass"></el-input>
                    </el-form-item>
                    <el-form-item class="flex row-between">
                        <el-button @click="$router.go(-1)">返回登陆</el-button>
                        <el-button type="primary" @click="nextStep">下一步</el-button>
                    </el-form-item>
                </div>
                <div v-show="step===2">
                    <el-form-item label="公司名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="成立时间">
                        <el-date-picker v-model="form.createTime" type="month" placeholder="选择成立时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="运营游戏">
                        <el-select v-model="form.game" placeholder="游戏厂商">
                            <el-option v-for="item in gameOption" :key="item.id" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="持有牌照">
                        <el-select v-model="form.license" placeholder="游戏牌照">
                            <el-option v-for="item in gameLicenseOption" :key="item.id" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传牌照">
                        <el-upload drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="官网网址">
                        <el-input v-model="form.url" style="width:200px"></el-input>
                        <el-button type="text" class="pl15">验证网址</el-button>
                    </el-form-item>
                    <el-form-item label="公司介绍">
                        <el-input type="textarea" v-model="form.desc" placeholder="请输入公司介绍"></el-input>
                    </el-form-item>
                    <el-form-item class="flex row-between">
                        <el-button type="default" @click="preStep">上一步</el-button>
                        <el-button type="primary" @click="nextStep">下一步</el-button>
                    </el-form-item>
                </div>
                <div v-show="step===3">
                    <el-form-item label="SKYPE">
                        <el-input type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="Email">
                        <el-input type="email"></el-input>
                    </el-form-item>
                    <el-form-item label="微信/QQ">
                        <el-input type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="代理合作">
                        <el-switch  on-text="" off-text="">
                        </el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default" @click="preStep">上一步</el-button>
                        <el-button type="primary" @click="submit">提交入驻申请</el-button>
                    </el-form-item>
                </div>
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
                account: '',//账号
                name: '',
                pass: '',
                repass: '',
                createTime: '',
                game: '',
                license: '',
                img: '',
                url: '',
                desc: ''
            },
            gameOption: [{ name: '游戏厂商1', id: 1 }, { name: '游戏厂商2', id: 2 },],
            gameLicenseOption: [{ name: '游戏牌照1', id: 1 }, { name: '游戏牌照2', id: 2 },],
            step: 1,
            maxStep: 3,
            submitSuccess:false
        }
    },
    methods: {
        nextStep() {
            if (this.step < this.maxStep) {
                this.step++
            }
        },
        preStep() {
            if (this.step > 0) {
                this.step--
            }
        },
        submit(){
            this.submitSuccess = true
        }
    }
}
</script>