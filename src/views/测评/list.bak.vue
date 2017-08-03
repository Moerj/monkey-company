<style lang="scss" scoped>
    @import '~@/scss/public.scss';
    .card{
        width:250px;
        margin-right: 25px;
        margin-bottom: 25px;
        .show-details{
            background: $ui-color-orange;
            opacity: 0;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .3s;
            .el-button{
                background: transparent;
                color: white;
                border-color: white;
            }
        }
        &:hover{
            .show-details{
                opacity: .7;
            }
        }
    }
    .hover-color{
        &:hover{
            background-color: rgba(orange,.06);
        }
    }
</style>
<template>
    <div class="p5 flex mb15">
        <ui-img url="http://s3a.pstatp.com/toutiao/resource/ntoutiao_web/static/image/other/report_logo_15cc24e.png" size="50px" class="mr25"></ui-img>
        <div class="flex-1 ui-border-bottom">
            <div class="flex row-between col-center p15 pl0 cursor-pointer hover-color" @click="fold = !fold">
                <span class="f16">视觉传达</span>
                <div class="f20 f-color-orange">
                    <transition name="fade" mode="out-in">
                        <i v-if="fold" class="el-icon-arrow-down" key="fold"></i>
                        <i v-if="!fold" class="el-icon-arrow-up" key="unfold"></i>
                    </transition>
                </div>
            </div>

            <!--list  -->
            <transition name="slide-row"> 
            <div v-show="!fold" class="flex flex-wrap pb15">
                <el-card class="card relative" v-for="(item,i) in 5" :key="i">
                    <ui-title class="f12">
                        <div class="flex row-between col-center">
                            <span class="mr20">色彩搭配</span>
                            <span class="f10">高于同行<i class="f-color-orange">93.1%</i></span>
                        </div>
                    </ui-title>
                    <div class="flex row-between col-center">
                        <el-progress :percentage="70" :show-text="false" class="flex-1 mr15"></el-progress>
                        一般
                    </div>
                    <div class="show-details">
                        <el-button @click="showDetails">查看详情</el-button>
                    </div>
                </el-card>
            </div>
            </transition> 

        </div>

        <el-dialog title="视觉传达" :visible.sync="dialogVisible">
            <div class="flex">
                <ui-img url="http://s3a.pstatp.com/toutiao/resource/ntoutiao_web/static/image/other/report_logo_15cc24e.png" size="50px" class="mr25"></ui-img>
                <div class="flex row-between col-center">
                    <span class="mr20">色彩搭配</span>
                    <div class="flex row-between col-center" style="width:200px">
                        <el-progress :percentage="70" :show-text="false" class="flex-1 mr15"></el-progress>
                        一般
                    </div>
                </div>
            </div>
            <div class="pt25 pb25">
                这里是主要内容介绍,巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉拉巴拉巴拉巴
            </div>
            <div class="flex row-between">
                <ui-img v-for="img in 2" :key="img" url="http://p9.pstatp.com/list/190x124/30f600000e4cbd77711c" style="width:48%;height:200px"></ui-img>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        data () {
            return {
                fold: true,
                dialogVisible:false
            }
        },
        methods: {
            showDetails(){
                this.dialogVisible=true
            }
        }
    }
</script>