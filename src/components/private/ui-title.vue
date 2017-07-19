<style lang="scss" scoped>
    @import '~@/scss/public.scss';
    .ui-title{
        padding-bottom:15px;
        border-bottom: $ui-border;
        margin-bottom: 15px;
    }
    .ui-title-span{
        padding-left:15px;
        border-left:3px solid $ui-color-orange;
        font-size: 16px;
    }
</style>
<template>
    <div class="ui-title">
        <span class="ui-title-span">
            <slot></slot>
        </span>
    </div>
</template>
<script>
    export default {
        name:'ui-title',
    }
</script>