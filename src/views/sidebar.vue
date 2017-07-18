<style lang="scss" scoped>
.sidebar {
    width: 150px;
}
.is-active{
    background-color: #fff;
}
.el-menu-item{
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    .fa-icon{
        margin-right: 5px;
        width: 20px;
        height: 20px;
    }
}
</style>
<template>
    <el-menu :default-active="active" class="sidebar" :router="true">
        <el-menu-item index="/home">
            <icon name="map-o"></icon>概览
        </el-menu-item>
        <el-menu-item index="/cepin">
            <icon name="edit"></icon>测评
        </el-menu-item>
        <el-menu-item index="/youhui">
            <icon name="bookmark-o"></icon>优惠
        </el-menu-item>
        <el-menu-item index="/dongtai">
            <icon name="calendar-plus-o"></icon>动态
        </el-menu-item>
        <el-menu-item index="/shangwu">
            <icon name="briefcase"></icon>商务
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        data () {
            return {
                active: this.$route.path
            }
        },
    }
</script>