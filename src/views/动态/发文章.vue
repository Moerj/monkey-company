<template>
    <ui-main title="动态 - 发布文章">
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
                <vue-editor v-model="form.content" style="line-height: normal;"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">发表文章</el-button>
            </el-form-item>
        </el-form>
    </ui-main>
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
                content: ''
            }
        }
    },
    created () {
        // 获取需要修改的文章
        this.$http.get('index.php?g=home&m=content&a=get_post', {
            params:{
                id: this.$route.query.id
            }
        })
        .then(({data})=>{
            console.log('修改的文章',data)
            if (data.code===1 && data.data) {
                let d = data.data
                this.form.title = d.post_title
                this.form.content = d.post_content
            }
        })

        // 所属栏目
        this.$http.get('index.php?g=home&m=content&a=get_breadcrumb', {
            params:{
                term_id: this.$route.query.id
            }
        })
        .then(({data})=>{
            console.log('所属栏目',data)
        })
    }
}
</script>