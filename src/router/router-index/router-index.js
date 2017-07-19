export default [
    {
        path: '/home',
        name: '首页',
        component: r => require(['@/views/home/home'], r),
    },
    {
        path: '/cepin',
        name: '测评',
        component: r => require(['@/views/测评/测评'], r),
    },
    {
        path: '/dongtai',
        name: '动态',
        component: r => require(['@/views/动态/动态'], r),
    },
]