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
                    :rules="[required,{validator:rulesUserName, trigger: 'blur'},{ min: 3, max: 16, message: '长度在 3 到 16 个字符',trigger:'blur' }]">
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
                        <el-input v-model="form.company_name" @blur="searchCompany"></el-input>
                    </el-form-item>
                    <el-form-item label="成立时间" prop="setup_timestamp" :rules="required">
                        <el-date-picker v-model="form.setup_timestamp" format="yyyyMM" type="month" placeholder="选择成立时间" @change="setupTimeChange"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="运营游戏" prop="game_factorys" :rules="required">
                        <el-select filterable v-model="form.game_factorys" placeholder="游戏厂商">
                            <el-option v-for="item in gameOption" :key="item.id" :value="item.id" :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="持有牌照" prop="game_licenses" :rules="required">
                        <el-select filterable v-model="form.game_licenses" placeholder="游戏牌照">
                            <el-option v-for="item in gameLicenseOption" :key="item.id" :value="item.id" :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传牌照" prop="imgs" :rules="required">
                         <el-upload drag :action="uploadUrl" 
                         :show-file-list="false"
                         :before-upload="beforeUpload"
                         :on-success="uploadSuccess" 
                         :with-credentials="true"
                         :data="{app:'companyApply'}"
                         v-loading.body="uploading"
                         :on-change="uploadChange"
                         >
                            <ui-img v-if="preViewURL" :url="preViewURL" style="width:100%;height:100%"></ui-img>
                            <div v-else>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或
                                    <em>点击上传</em>
                                </div>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
                            </div>
                        </el-upload> 
                    </el-form-item>
                    <el-form-item label="官网网址" prop="url" :rules="[required,{validator:isWebVaild,trigger:'submit'}]">
                        <el-input v-model="form.url" style="width:200px"></el-input>
                        <el-button v-if="webVaild" type="text" class="pl15 f-color-green" tabindex="-1" >验证通过</el-button>
                        <el-button v-else type="text" class="pl15" @click="openDialog" tabindex="-1">验证网址</el-button>
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
            <a :href="txt.url" download class="f-color-blue">
                <icon name="file"></icon>
                {{txt.fileName}}
            </a>
            <div v-if="webVaild" class="flex col-center mt15 pt10 ui-border-top">
                <img src="~@/icons/check-circle-o.png" style="height:50px">
                <div class="pl15">
                    <p class="f14">恭喜，官网网址已经成功验证通过。</p>
                    <span class="f10 f-color-grey">为了安全起见，请尽快删除您上次的txt文件。</span>
                </div>
            </div>
            <div v-if="webVaild===false" class="flex col-center mt15 pt10 ui-border-top">
                <icon name="warning" scale="2.8" class="f-color-orange"></icon>
                <div class="pl15">
                    <p class="f14">官网网址功验证失败。</p>
                    <span class="f10 f-color-grey">请确保您已经将txt上传到网站根目录。</span>
                </div>
            </div>
            <span slot="footer">
                <el-button type="primary" @click="dialogCheckWeb">完成校验</el-button>
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
                company_id: '',//已存在的公司,获取id
                password: '',
                repass: '',
                setup_time: '',
                setup_timestamp:'',
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
            companyCreatedTime:'',
            gameOption: [],
            gameLicenseOption: [],
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
            },

            // 网址校验通过
            webVaild:null,

            //上传图片
            imgPostData:{},//额外参数
            preViewURL:'',//本地预览
            uploading:false
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
                        else{
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
        submit(){
            this.$http.post('index.php?g=home&m=CompanyUser&a=apply_user',this.form)
            .then(({data})=>{
                console.log('注册已提交:',data)
                data.msg && this.$message(data.msg)
                if (data.code===1) {
                    this.submitSuccess = true
                }
            })
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
        rulesUserName(rule, value, callback){
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
        },
        searchCompany(){
            this.$http.get('index.php?g=home&m=GameCompany&a=company_list', {
                params:{
                    name: this.form.company_name
                }
            })
            .then(({data})=>{
                console.log('查询公司:',data)
                if (data.code===1 && data.data[0]) {
                    this.form.company_id = data.data[0].id
                }
                this.loadSelectList()
            })
        },
        loadSelectList(){//读取厂商列表和牌照列表
            // 厂商列表
            this.$http.get('index.php?g=home&m=GameFactory&a=factory_list')
            .then(({data})=>{
                if (data.code===1) {
                    this.gameOption = data.data
                }
            })

            // 牌照列表
            this.$http.get('index.php?g=home&m=GameLicense&a=license_list',{
                params:{
                    company_id:this.form.company_id
                }
            })
            .then(({data})=>{
                if (data.code===1) {
                    this.gameLicenseOption = data.data
                }
            })
        },
        setupTimeChange(time){//日期选择
            this.form.setup_time = time
        },

        // 校验网站
        openDialog(){
            // 验证url 是否可用
            this.$http.post('index.php?g=home&m=CompanyUser&a=check_url', {
                company_id: this.form.company_id,
                url:this.form.url
            })
            .then(({data})=>{
                console.log('验证公司url ', data)
                if (data.code===1) {
                    this.getTxt()
                }else{
                    this.$message(data.msg)
                }
            })
        },
        dialogCheckWeb(){//弹出层按钮
            this.$http.post('index.php?g=home&m=CompanyUser&a=check_website',{
                url: this.form.url //用户输入的url
            })
            .then(({data})=>{
                console.log('校验公司网站', data)
                if (data.code===1) {
                    this.txt.dialogVisible = false
                    this.webVaild = true
                }else{
                    this.webVaild = false
                }
            })
        },
        getTxt(){//生txt文件,让用户下载
            if (this.txt.url) {
                // 已经获取过
                this.txt.dialogVisible = true
            }else{
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
            }

        },
        isWebVaild(rule, value, callback){
            if (this.webVaild) {
                callback();
            }else{
                callback(new Error('还未验证网址'));
                this.openDialog()
            }
        },

        // 图片上传
        beforeUpload(file) {
            this.uploading = true//开启上传冷却

            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }

            return isJPG && isLt2M;
        },
        uploadSuccess(res, file, fileList){
            console.log('图片上传完成:', res);
            if (res.code===1) {
                this.form.imgs += res.data.filepath + ','

                // 生成本地预览
                this.preViewURL = URL.createObjectURL(file.raw)
            }
        },
        uploadChange(file, fileList){
            this.uploading = false//关闭上传冷却
        }
    },
}
</script>