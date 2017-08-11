<template>
    <ui-main title="动态 - 发布文章">
        <el-form ref="form" :model="form" label-width="80px" style="max-width:900px">
            <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目">
                <el-select v-model="form.group" placeholder="请选择活动区域">
                    <el-option v-for="item in groupOpt" :key="item.term_id" :label="item.name" :value="item.term_id"></el-option>
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
                group: '',
                content: ''
            },
            groupOpt:[]
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
        this.$http.get('index.php?g=home&m=content&a=post_term_list')
        .then(({data})=>{
            console.log('所属栏目',data)
            if (data.code===1) {
                this.groupOpt = data.data
            }
        })
    }
}
</script>