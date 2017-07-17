import login from '@/views/login/login'
export default [
  {
    path: '/login',
    name: '登录',
    component: login
  },
  {
    path: '/regist',
    name: '注册',
    component: r => require(['@/views/login/regist'], r),
  },
]