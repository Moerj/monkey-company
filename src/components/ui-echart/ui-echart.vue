<template>
    <div :style="{width:width,height:height}"></div>
</template>
<script>
import echarts from 'echarts/lib/echarts'; //core
export default {
    name: 'ui-echarts',
    props: {
        // echarts的配置项
        option: {
            type: Object
        },
        width:{
            type: String
        },
        height:{
            type: String
        }
    },
    data() {
        return {
            chart: null,//chart实例
            resizeTimer: null,//resize触发间隔
        }
    },
    watch: {
        option: {
            handler(v) {
                if (v) {
                    // 更新echart
                    this.chart.setOption(v, {
                        notMerge: false, //可选，是否不跟之前设置的option进行合并，默认为false，即合并。
                        lazyUpdate: false, //可选，在设置完option后是否不立即更新图表，默认为false，即立即更新。
                        silent: false, //可选，阻止调用 setOption 时抛出事件，默认为false，即抛出事件。
                    })
                }
            },
            deep: true
        }
    },
    methods: {
        resize() {
            clearTimeout(this.resizeTimer)
            this.resizeTimer = setTimeout(() => {
                this.chart.resize()
                this.resizeTimer = null
            }, 500);
        }
    },
    mounted() {
        // 初始化实例
        this.chart = echarts.init(this.$el);

        // 绑定window resize
        window.addEventListener('resize', this.resize)

        // 如果有配置项,初始就渲染
        this.option && this.chart.setOption(this.option)
    },
    beforeDestroy() {
        // 解绑window resize
        window.removeEventListener('resize', this.resize)

        // 销毁chart实例
        this.chart.dispose()
    }
}
</script>