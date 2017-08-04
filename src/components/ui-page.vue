// 用popup封装一个弹出层页面

<style lang="scss" scoped>
    .ui-page{
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2010 !important;
        transform: translate3d(0,0,0);
        display: flex;
        flex-direction: column;
    }
</style>
<template>
    <mt-popup v-model="active" popup-transition="popup-fade" :modal="false" class="ui-page">
        <mt-header :title="title" ref="header">
            <mt-button icon="back" slot="left" @click="active=false" class="ui-button"></mt-button>
        </mt-header>
        <div class="flex-1 scroll">
            <slot></slot>
        </div>
    </mt-popup>
</template>
<script>
    export default {
        name:'ui-page',
        props:{
            value:{
                type:Boolean,
            },
            title:{
                type:String,
            }
        },
        data () {
            return {
                active: false
            }
        },
        watch: {
            active(v){
                this.$emit('input', v)
            },
            value(v){
                this.active = v
            }
        },
    }
</script>