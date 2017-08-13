<style lang="scss" scoped>
    .img-item{
        height: 40px;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: 5px;
        margin-right: 10px;
        cursor: pointer;
    }
</style>
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
                <img @click="picturePreview" v-for="img in companyData.license" :src="img.logo" class="img-item">
            </el-form-item>
            <el-form-item label="运营游戏">
                <el-tag type="primary" v-for="item in companyData.factory" :key="item.id" class="mr10">{{item.short_name || item.name}}</el-tag>
            </el-form-item>
            <el-form-item label="公司LOGO">
                <img @click="picturePreview" :src="companyData.logo" class="img-item">
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
        picturePreview(e) {
            let url =  e.target.src
            this.dialogImageUrl = url;
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
        // 获取公司数据
        this.$http.get('index.php?g=home&m=companyUser&a=company_detail')
        .then(({data})=>{
            console.log('获取公司数据:', data)
            if (data.code===1) {
                this.companyData = data.data

                // 牌照图片列表
                data.data.license &&
                data.data.license.forEach((item)=>{
                    this.fileListPaizhao.push({
                        id:item.id,
                        name:item.name,
                        url:item.logo
                    })
                })

                // 备用网址列表
                data.data.backup_urls &&
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