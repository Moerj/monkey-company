<template>
    <div>
        <el-form v-if="user_info" label-width="100px">
            <el-form-item label="公司名称">
                {{$store.state.common.company_name}}
            </el-form-item>
            <el-form-item label="公司账号">
                {{$store.state.common.account}}
            </el-form-item>
            <el-form-item label="入驻时间">
                {{companyDetails.setup_time}}
            </el-form-item>
            <el-form-item label="持有牌照">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="picturePreview"
                  :on-remove="pictureRemove"
                  :multiple="true"
                  :file-list="fileListPaizhao"
                  :disabled="true"
                  class="ui-no-upload"
                  >
                  <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="运营游戏">
                <el-tag type="primary" v-for="item in gamesOpt" :key="item.id" class="mr10">{{item.short_name || item.name}}</el-tag>
            </el-form-item>
            <el-form-item label="公司LOGO">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="picturePreview"
                  :on-change="logoChange"
                  :multiple="false"
                  :file-list="fileListLogo"
                  :disabled="true"
                  class="ui-no-upload"
                  >
                  <i class="el-icon-upload2"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="备用网址">
                <edit-input :val.sync="companyDetails.bus_url"></edit-input>
            </el-form-item>
            <el-form-item label="官网网址">
                <edit-input :val.sync="companyDetails.url"></edit-input>
            </el-form-item>
            <el-form-item label="SKYPE">
                <edit-input :val.sync="companyDetails.bus_skype"></edit-input>
            </el-form-item>
            <el-form-item label="qq">
                <edit-input :val.sync="user_info.qq" :change="edit" field="qq" post-url="change_user_ext"></edit-input>
            </el-form-item>
            <el-form-item label="weixin">
                <edit-input :val.sync="user_info.weixin" :change="edit" field="weixin" post-url="change_user_ext"></edit-input>
            </el-form-item>
            <el-form-item label="email">
                <edit-input :val.sync="user_info.user_email" :change="edit" field="assist_email" post-url="change_user_info"></edit-input>
            </el-form-item>
            <el-form-item label="mobile">
                <edit-input :val.sync="user_info.mobile" :change="edit" field="assist_mobile" post-url="change_user_info"></edit-input>
            </el-form-item>
            <el-form-item label="公司简介">
                <edit-input :val.sync="companyDetails.desc" type="textarea"></edit-input>
            </el-form-item>
        </el-form>

        <!--图片阅览  -->
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import editInput from './edit-input.vue'
export default {
    components: {
        editInput
    },
    data() {
        return {
            company_id: this.$store.state.common.company_id,
            dialogImageUrl: '',
            dialogVisible: false,
            fileListLogo: [],
            fileListPaizhao:[],
            companyDetails:{},
            gamesOpt:[],

            // 备用网址
            altUrl:['www.aaa.com','www.bbb.com'],
            altInputVisible:false,
            altInputVal:'',

            user_info: null,
        }
    },
    methods: {
        // 图片上传
        pictureRemove(file, fileList) {
            console.log(file, fileList);
        },
        picturePreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        logoChange(file, fileList) {
            this.fileListLogo = fileList.slice(-1);
        },

        // 修改标签
        showInput() {
            this.altInputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        addUrlTag() {
            let altInputVal = this.altInputVal;
            if (altInputVal) {
                this.altUrl.push(altInputVal);
            }
            this.altInputVisible = false;
            this.altInputVal = '';
        },

        // 修改一项信息
        edit({value,field,postUrl}){
            this.$http.post(`index.php?g=home&m=Users&a=${postUrl}`,{
                field: field,
                value: value,
                user_type: 3
            })
            .then(({data})=>{
                console.log(`修改 ${field} `,data)
            })
        }
    },
    created () {
        // 牌照列表
        this.$http.get('index.php?g=home&m=GameLicense&a=license_list', {
                params:{
                    company_id: this.company_id
                }
            })
            .then(({data})=>{
                // console.log('牌照列表',data)
                if (data.code===1) {
                    data.data.forEach((item)=>{
                        this.fileListPaizhao.push({
                            name:item.name,
                            url:item.logo,
                            id:item.id
                        })
                    })
                }
            })

        // 厂商列表
        this.$http.get('index.php?g=home&m=GameFactory&a=factory_list',{
                params:{
                    company_id: this.company_id
                }
            })
            .then(({data})=>{
                // console.log('厂商列表:', data);
                if (data.code===1) {
                    this.gamesOpt = data.data
                }
            })

        // 游戏公司列表
        this.$http.get('index.php?g=home&m=GameCompany&a=company_list', {
                params:{
                    id: this.company_id
                }
            })
            .then(({data})=>{
                console.log('游戏公司列表',data)
                if (data.code===1) {
                    let d = data.data[0]
                    this.fileListLogo.push({
                        name: d.company_name,
                        url:d.logo
                    })
                    this.companyDetails = d
                }
            })

        // 用户信息
        this.$http.get('index.php?g=home&m=Users&a=user_info',{
            params:{
                user_type:3
            }
        })
        .then(({data})=>{
            console.log('获取用户数据',data)
            if (data.code===1) {
                this.user_info = data.data
            }
        })
    },
}
</script>