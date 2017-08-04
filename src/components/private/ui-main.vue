<style lang="scss" scoped>
    .ui-main{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: #fff;
        padding: 20px;
        overflow: hidden;
    }
    .ui-main-header{
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom:1px solid #eee;
        display: flex;
        align-items: center;
    }
</style>
<template>
    <div class="ui-main flex column">
        <div class="ui-main-header">
            <el-button @click="$router.go(-1)" size="small">
                <i class="el-icon-arrow-left"></i>
            </el-button>

            <span class="pl20 f16">{{title}}</span>
        </div>
        <div class="flex-1 scroll-y">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name:'ui-main',
        props: ['title']
    }
</script>