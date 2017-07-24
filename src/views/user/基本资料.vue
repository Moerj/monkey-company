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
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>