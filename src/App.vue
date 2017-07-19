<style lang="scss" scoped>
    @import '~@/scss/public.scss';
    #app{
        height: 100%;
        overflow: hidden;
        &::before {
            content: '';
            background: rgb(28,27,32);
            height:200px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 0;
        }
    }
    .main-router{
        width: 1280px;
        background-color: #fff;
        z-index: 1;
        position: absolute;
        left: 50%;
        top: 10px;
        bottom: 0;
        transform: translateX(-50%);
        @include box-shadow;
    }
</style>
<template>
    <div id="app">
        <router-view class="main-router scrollbar-global"></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
}
</script>

