// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 路由集合
import router from './config/router';

// http 模块
import axios from './config/axios';
Vue.use(axios,{
    // baseURL: "http://api.cjb789.com",
    // baseURL: "http://test.cjb789.com",
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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
