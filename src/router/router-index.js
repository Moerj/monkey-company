export default [
  {
    path: '/',
    redirect: '/home', //重定向: '/' to '/home'
  },
  {
    path: '/home',
    name: '首页',
    component: r => require(['@/views/home'], r),
  },
]