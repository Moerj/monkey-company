// promise 低版本浏览器适配
import Promise from 'promise-polyfill'
if (!window.Promise) {
    window.Promise = Promise
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Vuex from 'vuex'
Vue.use(Vuex)

// 路由集合
import router from './config/router';

// http 模块
import axios from './config/axios';
Vue.use(axios,{
    // baseURL: "http://api.cjb789.com",
    baseURL: "http://back.7178861.com",
    timeout: 10000,
    withCredentials: true,
});


// 公共事件监听器
import eventHub from './config/eventHub';
Vue.use(eventHub);

// 公共数据
import globalMethods from './config/globalMethods';
Vue.use(globalMethods);

// el ui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import '@/assets/element/index.css'
Vue.use(ElementUI)

// 自定义全局指令
// import directive from './config/directive';
// Vue.use(directive);

// 自定义全局组件,请放到components/ 并以ui-开头命名
import components from './config/components';
Vue.use(components);


// vue-awesome
import 'vue-awesome/icons'; //css (总大小486kb)
import Icon from 'vue-awesome/components/Icon';//核心组件
Vue.component('icon', Icon);

// 自定义全局样式
import '@/scss/base.scss'; //基础布局样式
import '@/scss/ui.scss'; //ui样式,必须以 "ui-" 开头,例如: ui-block, ui-color
import '@/scss/rewrite.scss'; //重构的样式,对原本框架进行修改
import '@/scss/vue-transition.scss'; //vue的过渡动画
import '@/scss/scrollbar.scss';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
