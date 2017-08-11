<template>
    <ui-main title="动态 - 发布文章">
        <el-form ref="form" :model="form" label-width="80px" style="max-width:900px">
            <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目">
                <el-select v-model="form.termID" placeholder="请选择活动区域">
                    <el-option v-for="item in termIDOpt" :key="item.term_id" :label="item.name" :value="item.term_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item >
                <vue-editor v-model="form.content" style="line-height: normal;"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">发表文章</el-button>
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
                termID: '',
                content: ''
            },
            termIDOpt:[]
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
        this.$http.get('index.php?g=home&m=content&a=post_term_list',{
            params:{
                parent_id:8
            }
        })
        .then(({data})=>{
            console.log('所属栏目',data)
            if (data.code===1) {
                this.termIDOpt = data.data
            }
        })
    },
    methods: {
        submit(){
            this.$http.post('index.php?g=home&m=content&a=add_post',{
                post_content: this.form.content,	//文章的html文本	string	
                post_title: this.form.title,	//文章标题	string	
                term_id: this.form.termID,	//文章分类id	number	
                user_type: 3,	//用户类型	number	1普通 3公司 默认1
            })
            .then(({data})=>{
                console.log('发文章', data)
                this.$message(data.msg)
                if (data.code===1) {
                    this.$router.push('/dongtai')
                }
            })
        }
    }
}
</script>