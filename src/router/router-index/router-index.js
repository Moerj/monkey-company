export default [
    {
        path: '/home',
        name: '首页',
        component: r => require(['@/views/home/home'], r),
    },
    {
        path: '/cepin',
        name: '测评',
        component: r => require(['@/views/cepin/cepin'], r),
    },
]