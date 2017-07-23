<template>
    <div class="ui-border-bottom pb15 ml20 mr20">
        <span class="clamp-2 pt15 pb15">这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,这里是文章内容,</span>
        <div class="flex row-between f10 f-color-grey">
            <div>
                2017-05-20 12:39:30
                <span class="pl10 f-color-text">公司信息</span>
            </div>
            <div class="flex col-center">
                <div class="mr15">
                    <icon name="commenting-o"></icon>
                    <span>评论: <i class="f-color-blue">156</i></span>
                </div>
                <div class="flex col-center">
                    <icon name="star-o"></icon>
                    <span class="pl5">收藏: <i class="f-color-blue">156</i></span>
                </div>
                <span class="pl10 pr10">|</span>
                <el-button size="mini" type="text" @click="goEdit('testId')">编辑</el-button>
                <el-button size="mini" type="text">删除</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['listData'],
        methods: {
            goEdit(id){
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
            }
        }
    }
</script>