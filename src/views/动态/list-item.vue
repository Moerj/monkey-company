<template>
    <div v-if="data && !deleted" v-loading="loading" class="ui-border-bottom pb15 ml20 mr20">
        <span class="clamp-2 pt15 pb15">{{data.post_title}}</span>
        <div class="flex row-between f10 f-color-grey">
            <div>
                {{data.post_date}}
                <span class="pl10 f-color-text">{{data.name}}</span>
            </div>
            <div class="flex col-center">
                <div class="mr15">
                    <icon name="commenting-o"></icon>
                    <span>评论: <i class="f-color-blue">{{data.comment_count}}</i></span>
                </div>
                <div class="flex col-center">
                    <icon name="star-o"></icon>
                    <span class="pl5">收藏: <i class="f-color-blue">{{data.favorite_num}}</i></span>
                </div>
                <span class="pl10 pr10">|</span>
                <el-button size="mini" type="text" @click="goEdit">编辑</el-button>
                <el-button size="mini" type="text" @click="deleteArticle">删除</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['data'],
        data () {
            return {
                loading:false,
                userId: this.$store.state.commonuser_id,
                deleted:false
            }
        },
        methods: {
            goEdit(){
                let id = this.data.id
                if (!id) {
                    console.warn('没有文章id,无法进行编辑');
                    return
                }

                this.$router.push({
                    name:'发文章',
                    query:{
                        id:id
                    }
                })
            },
            deleteArticle(){
                let id = this.data.id

                this.loading  = true
                this.$http.post('index.php?g=home&m=content&a=delete_post',{
                    id:id
                })
                .then(({data})=>{
                    console.log('删除文章', data)
                    data.msg && this.$message(data.msg)
                    this.loading = false

                    // 删除界面数据
                    this.deleted = true
                })
            }
        },
    }
</script>