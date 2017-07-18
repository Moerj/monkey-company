import index from '@/views/index.vue'
import routerIndex from './router-index/router-index'

export default [
    {
        path: '/',
        redirect: '/home', //重定向: '/' to '/home'
    },
    {
        path: '/index',
        component: index,
        children: routerIndex
    },
]