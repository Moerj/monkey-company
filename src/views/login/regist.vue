<template>
    <div class="h-100 p15 flex column">
        <login-header></login-header>
    
        <el-steps :space="200" :active="step" :center="true">
            <el-step title="账号设置"></el-step>
            <el-step title="基本资料"></el-step>
            <el-step title="联系方式"></el-step>
        </el-steps>
    
        <div class="flex-1 flex row-center ui-border-top scroll-y pt20">
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
            <div v-else>
                <el-form :model="form" ref="step1" label-width="80px" v-show="step===1">
                    <el-form-item label="公司账号" prop="user_name" 
                    :rules="[{validator:rulesUserName, trigger: 'blur'},{ min: 3, max: 16, message: '长度在 3 到 16 个字符',trigger:'blur' }]">
                        <el-input v-model="form.user_name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password"
                    :rules="[required,{ min: 6, max: 16, message: '长度在 6 到 16 个字符',trigger:'blur' }]">
                        <el-input v-model="form.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="repass"
                    :rules="[required,{ validator: resPassVaild,trigger:'blur'}]">
                        <el-input v-model="form.repass" type="password"></el-input>
                    </el-form-item>
                    <el-form-item class="flex row-between">
                        <el-button @click="$router.go(-1)">返回登陆</el-button>
                        <el-button type="primary" @click="nextStep(1)">下一步</el-button>
                    </el-form-item>
                </el-form>

                <el-form :model="form" ref="step2" label-width="80px" v-show="step===2">
                    <el-form-item label="公司名称" prop="company_name" :rules="required">
                        <el-input v-model="form.company_name"></el-input>
                    </el-form-item>
                    <el-form-item label="成立时间">
                        <el-date-picker v-model="form.setup_time" type="month" placeholder="选择成立时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="运营游戏">
                        <el-select v-model="form.game_factorys" placeholder="游戏厂商">
                            <el-option v-for="item in gameOption" :key="item.id" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="持有牌照">
                        <el-select v-model="form.game_licenses" placeholder="游戏牌照">
                            <el-option v-for="item in gameLicenseOption" :key="item.id" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传牌照">
                        <el-upload drag :action="uploadUrl" multiple :on-success="onUploadChange" :with-credentials="true">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="官网网址" prop="url" :rules="required">
                        <el-input v-model="form.url" style="width:200px"></el-input>
                        <el-button type="text" class="pl15" @click="checkURL" tabindex="-1">验证网址</el-button>
                    </el-form-item>
                    <el-form-item label="公司介绍" prop="desc" :rules="required">
                        <el-input type="textarea" v-model="form.desc" placeholder="请输入公司介绍"></el-input>
                    </el-form-item>
                    <el-form-item class="flex row-between">
                        <el-button type="default" @click="preStep">上一步</el-button>
                        <el-button type="primary" @click="nextStep(2)">下一步</el-button>
                    </el-form-item>
                </el-form>

                <el-form :model="form" ref="step3" label-width="80px" v-show="step===3">
                    <el-form-item label="SKYPE" prop="skype" :rules="required">
                        <el-input type="text" v-model="form.skype"></el-input>
                    </el-form-item>
                    <el-form-item label="Email" prop="email" 
                    :rules="[required,{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]" >
                        <el-input type="email" v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="微信/QQ" prop="qq_weixin" :rules="required">
                        <el-input type="text" v-model="form.qq_weixin"></el-input>
                    </el-form-item>
                    <el-form-item label="代理合作" prop="is_proxy">
                        <el-switch  on-text="" off-text="" v-model="form.is_proxy" :on-value="1" :off-value="0">
                        </el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="default" @click="preStep">上一步</el-button>
                        <el-button type="primary" @click="nextStep(3)">提交入驻申请</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <login-footer></login-footer>


        <el-dialog title="官网网址验证" :visible.sync="txt.dialogVisible" >
            <span class="block">文件验证</span>
            <span class="block mb15">请将以下txt验证文件上传到网站根目录</span>
            <a :href="txt.url" :download="txt.fileName" class="f-color-blue">
                <icon name="file"></icon>
                {{txt.fileName}}
            </a>
            <span slot="footer">
                <el-button type="primary" @click="txt.dialogVisible=false;nextStep()">完成校验</el-button>
            </span>
        </el-dialog>
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
                user_name: '',//账号
                company_name: '',
                password: '',
                repass: '',
                setup_time: '',
                game_factorys: '',
                game_licenses: '',
                imgs: '',
                url: '',
                desc: '',
                is_proxy: 0,
                skype:'',
                email:'',
                qq_weixin:'',
            },
            gameOption: [{ name: '游戏厂商1', id: 1 }, { name: '游戏厂商2', id: 2 },],
            gameLicenseOption: [{ name: '游戏牌照1', id: 1 }, { name: '游戏牌照2', id: 2 },],
            step: 1,
            submitSuccess:false,
            uploadUrl: this.$http.config.baseURL + '/index.php?g=asset&m=asset&a=plupload',

            // 表单验证规则
            required:{required:true,message:'必填'},
            
            //用户下载txt去校验网站
            txt:{
                url:'',
                fileName:'',
                dialogVisible: false
            }
        }
    },
    methods: {
        nextStep(n) {
            if (n) {
                this.$refs['step'+n].validate((valid) => {
                    if (valid) {
                        if(n===3){
                            this.submit()
                        }
                        else if (n===2) {
                            this.getTxt()
                        }else{
                            this.step++
                        }
                    }
                });
            }else{
                this.step ++
            }
        },
        preStep() {
            if (this.step > 0) {
                this.step--
            }
        },
        getTxt(){//生txt文件,让用户下载
            // 生成网站检测文件
            this.$http.get('index.php?g=home&m=CompanyUser&a=create_check_file')
            .then(({data})=>{
                console.log('生成网站检测文件',data)
                if (data.code===1) {
                    this.txt.url = data.data.url
                    this.txt.fileName = data.data.name
                    this.txt.dialogVisible = true
                }
            })
        },
        submit(){
            // 校验公司网站
            this.$http.post('index.php?g=home&m=CompanyUser&a=check_website',{
                url: this.form.url //用户输入的url
            })
            .then(({data})=>{
                console.log('校验公司网站', data)
                this.$message('公司网站' + data.msg)
                if (data.code===1) {
                    // 校验用户手动上传到公司域名下的txt文件,成功后提交注册
                    this.$http.post('index.php?g=home&m=CompanyUser&a=apply_user',this.form)
                    .then(({data})=>{
                        console.log('注册已提交:',data)
                        data.msg && this.$message(data.msg)
                        if (data.code===1) {
                            this.submitSuccess = true
                        }
                    })
                }
            })
        },
        onUploadChange(file, fileList){
            console.log('file:', file);
            if (file) {
                this.form.imgs += file.filepath + ','
            }
        },
        resPassVaild(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        },
        checkURL(){
            // 验证公司url
            this.$http.post('index.php?g=home&m=CompanyUser&a=check_url', {
                company_id: this.form.company_id,
                url:this.form.url
            })
            .then(({data})=>{
                console.log('验证公司url ', data)
                data.msg && this.$message(data.msg)
            })
        },
        rulesUserName(rule, value, callback){
            if (value==='') {
                callback(new Error('账号必填'));
            }else{
                this.$http.get('index.php?g=home&m=CompanyUser&a=check_user_name', {
                    params:{
                        user_name: this.form.user_name
                    }
                })
                .then(({data})=>{
                    console.log('检测账号:',data)
                    if (data.code!==1) {
                        callback(new Error('账号已存在'));
                    }else{
                        callback();
                    }
                })
            }
        }
    },
}
</script>