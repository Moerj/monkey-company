import index from '@/views/index.vue'
import indexChild from './router-index/router'

export default [
    {
        path: '/',
        redirect: '/home', //重定向: '/' to '/home'
    },
    {
        path: '/index',
        component: index,
        children: indexChild
    },
]