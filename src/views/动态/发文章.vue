<template>
    <div>
        <ui-title>动态 - 发布文章</ui-title>
        <el-form ref="form" :model="form" label-width="80px" style="max-width:900px">
            <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item >
                <vue-editor v-model="form.text" style="line-height: normal;"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button @click="$router.go(-1)">返回</el-button>
                <el-button type="primary">发表文章</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
    components: {
        VueEditor
    },
    data() {
        return {
            form: {
                title: '',
                region: '',
                text: ''
            }
        }
    }
}
</script>