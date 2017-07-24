<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="公司名称">
                孙小猴娱乐传媒
            </el-form-item>
            <el-form-item label="公司账号">
                SUnxiaohou
            </el-form-item>
            <el-form-item label="入职时间">
                2018-18-33
            </el-form-item>
            <el-form-item label="持有拍照">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="picturePreview"
                  :on-remove="pictureRemove"
                  :multiple="true"
                  >
                  <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="运营游戏">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="picturePreview"
                  :on-remove="pictureRemove"
                  :multiple="true"
                  >
                  <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="公司LOGO">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="picturePreview"
                  :on-change="logoChange"
                  :multiple="false"
                  :file-list="fileListLogo"
                  >
                  <i class="el-icon-upload2"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="备用网址">
                <el-tag :key="tag" v-for="tag in altUrl" :closable="true" :close-transition="false" @close="handleClose(tag)" type="success" class="mr5"> 
                    {{tag}} 
                </el-tag>
                <el-input
                  style="width:81px;"
                  v-if="altInputVisible"
                  v-model="altInputVal"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="addUrlTag"
                  @blur="addUrlTag"
                >
                </el-input>
                <el-button v-else-if="altUrl.length<3" size="small" @click="showInput">新增</el-button>
            </el-form-item>
            <el-form-item label="官网网址">
                <edit-input v-model="officialUrl"></edit-input>
            </el-form-item>
            <el-form-item label="SKYPE">
                <edit-input v-model="skype"></edit-input>
            </el-form-item>
            <el-form-item label="qq">
                <edit-input v-model="qq"></edit-input>
            </el-form-item>
            <el-form-item label="weixin">
                <edit-input v-model="weixin"></edit-input>
            </el-form-item>
            <el-form-item label="email">
                <edit-input v-model="email"></edit-input>
            </el-form-item>
            <el-form-item label="mobile">
                <edit-input v-model="mobile"></edit-input>
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
            fileListLogo: [{
              name: 'logo.png',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
              status: 'finished'
            }],

            // 备用网址
            altUrl:['www.aaa.com','www.bbb.com'],
            altInputVisible:false,
            altInputVal:'',

            // edit-input-data
            officialUrl:'',// 官网网址
            skype:'',
            qq:'',
            weixin:'',
            email:'',
            mobile:''

        };
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
        handleClose(tag) {
            this.altUrl.splice(this.altUrl.indexOf(tag), 1);
        },
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
    }
}
</script>