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
    <el-menu default-active="1" class="sidebar">
        <el-menu-item index="1">
            <icon name="map-o"></icon>概览
        </el-menu-item>
        <el-menu-item index="2">
            <icon name="edit"></icon>测评
        </el-menu-item>
        <el-menu-item index="3">
            <icon name="bookmark-o"></icon>优惠
        </el-menu-item>
        <el-menu-item index="4">
            <icon name="calendar-plus-o"></icon>动态
        </el-menu-item>
        <el-menu-item index="5">
            <icon name="briefcase"></icon>商务
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        data () {
            return {
                active: this.getActive
            }
        },
        computed: {
            getActive(){
                let path =  this.$route.path
                if (path==='/home') {
                    return 1
                }
                return 0
            }
        }
    }
</script>