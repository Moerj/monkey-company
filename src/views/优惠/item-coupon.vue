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
    <el-card class="coupon" @click.native="showDetails">
        <div class="flex">
            <div class="flex-3 flex column column-col-around divide pr20">
                <span class="f16 clamp-1 mb5">优惠券标题</span>
                <div class="flex row-between f10 f-color-grey">
                    <span>100个</span>
                    <span>详情
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </div>
            </div>
            <div class="flex-1 flex column column-col-around column-row-center pl20">
                <span class="f16 mb5 f-color-green">已发布</span>
                <!-- <span class="f16 mb5 f-color-orange">待审核</span> -->
                <!-- <span class="f16 mb5 f-color-grey">已失效</span> -->
                <span class="f10 f-color-grey">2017-05-12</span>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        methods: {
            showDetails(){
                let id = 'test'
                this.$router.push({name:'彩金详情',query:{id:id}})
            }
        }
    }
</script>