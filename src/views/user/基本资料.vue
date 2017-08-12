<template>
    <div>
        <el-form v-if="companyData" label-width="100px">
            <el-form-item label="公司名称">
                {{companyData.name}}
            </el-form-item>
            <el-form-item label="公司账号">
                {{companyData.user_login}}
            </el-form-item>
            <el-form-item label="入驻时间">
                {{companyData.setup_time}}
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
                <el-tag type="primary" v-for="item in companyData.factory" :key="item.id" class="mr10">{{item.short_name || item.name}}</el-tag>
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
            <el-form-item label="官网网址">
                <el-tag type="primary">{{companyData.url}}</el-tag>
            </el-form-item>
            <el-form-item label="备用网址">
                <div v-for="(item,i) in 5">
                    <span class="f-color-grey f06">站点{{i+1}} </span>
                    <edit-input v-model="bakUrl[i]"></edit-input>
                </div>
            </el-form-item>
            <el-form-item label="SKYPE">
                <edit-input v-model="companyData.bus_skype" :change="edit" ></edit-input>
            </el-form-item>
            <el-form-item label="qq">
                <edit-input v-model="companyData.bus_qq" :change="edit"  ></edit-input>
            </el-form-item>
            <el-form-item label="weixin">
                <edit-input v-model="companyData.bus_weixin" :change="edit"  ></edit-input>
            </el-form-item>
            <el-form-item label="email">
                <edit-input v-model="companyData.bus_email" :change="edit"  ></edit-input>
            </el-form-item>
            <el-form-item label="mobile">
                <edit-input v-model="companyData.mobile" :change="edit"  ></edit-input>
            </el-form-item>
            <el-form-item label="公司简介">
                <edit-input v-model="companyData.desc" type="textarea" :change="edit"></edit-input>
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
            dialogImageUrl: '',
            dialogVisible: false,
            fileListLogo: [],//公司logo
            fileListPaizhao:[],//牌照
            bakUrl:[],
            companyData:{}//公司数据
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

        // 修改一项信息
        edit(newVal){
            this.$http.post('index.php?g=home&m=CompanyUser&a=update_company_detail',
                this.companyData
            )
        }
    },
    created () {
        // 牌照列表
        this.$http.get('index.php?g=home&m=GameLicense&a=license_list', {
                params:{
                    company_id: this.$store.state.common.company_id
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


        // 获取公司数据
        this.$http.get('index.php?g=home&m=companyUser&a=company_detail')
        .then(({data})=>{
            console.log('获取公司数据:', data)
            if (data.code===1) {
                this.companyData = data.data

                // logo
                this.fileListLogo.push({
                    name: 'logo',
                    url:data.data.logo
                })

                // 备用网址
                data.data.backup_urls.forEach((item,i)=>{
                    if (item.url) {
                        this.bakUrl[i] = item.url
                    }else{
                        this.bakUrl[i] = ''
                    }
                })
            }
        })
    },
    watch:{
        bakUrl:{
            handler(v){
                if (!v) return;
                let str = ''
                v.forEach((item)=>{
                    str += item +','
                })
                str = str.replace(/,$/,'')
                this.companyData.backup_urls = str

                this.edit()
            },
            deep:true
        }
    },
}
</script>