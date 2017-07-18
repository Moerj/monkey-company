import echarts from 'echarts/lib/echarts'; //core

// 以下资源在对应页面按需引入

// import 'echarts/lib/chart/line' // 折线图
// import 'echarts/lib/chart/pie' // 饼图

// import 'echarts/lib/component/tooltip' // 提示框
// import 'echarts/lib/component/title' //标题组件
// import 'echarts/lib/component/legend' //图例组件

export default {
    name:'echarts',
    inserted (el, binding, vnode) {
        const echart = echarts.init(el);
        echart.setOption(binding.value)

        let timer
        vnode._echartResize = function () {
            if (timer) {
                return
            }
            timer = setTimeout(function () {
                echart.resize()
                timer = null
            }, 500);
        }

        window.addEventListener('resize', vnode._echartResize)
    },
    unbind(el, binding, vnode){
        window.removeEventListener('resize', vnode._echartResize)
    }
}
