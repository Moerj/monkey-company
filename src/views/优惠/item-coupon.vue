<style lang="scss" scoped>
    .coupon{
        width: 340px;
        background-color: #fff;
        cursor: pointer;
        margin-right: 15px;
        margin-bottom: 15px;
    }
    .divide{
        border-right: 1px #eee dashed;
    }
</style>
<template>
    <el-card v-if="data" class="coupon" @click.native="showDetails(data.id)">
        <div class="flex">
            <div class="flex-3 flex column column-col-around divide pr20">
                <div class="mb10 flex col-center">
                    <ui-img :url="data.company_ico" size="30px" class="bg-grey ui-circle"></ui-img>
                    <span class="pl10 f16 clamp-1">{{data.name}}</span>   
                </div>
                <div class="flex row-between f10 f-color-grey">
                    <span>数量: {{data.num}}</span>
                    <span>详情
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </div>
            </div>
            <div class="flex-1 flex column column-col-around column-row-center pl20">
                <span class="f16 mb5 f-color-green" v-if="data.status==1">正常</span>
                 <span class="f16 mb5 f-color-orange" v-if="data.status==2">待审核</span> 
                 <span class="f16 mb5 f-color-grey" v-if="data.status==3">新建</span> 
                 <span class="f16 mb5 f-color-red" v-if="data.status==4">审核驳回</span> 
                <span class="f10 f-color-grey">{{data.publish_time_show}}</span>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        props: ['data'],
        methods: {
            showDetails(id){
                this.$router.push({name:'彩金详情',query:{id:id}})
            }
        }
    }
</script>