export default [
    {
        path: '*',
        component: resolve => require(['@/views/404.vue'], resolve)
    }
]