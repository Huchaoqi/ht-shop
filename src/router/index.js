import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '../components/login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)
//   设置路由导航守卫判断用户是否登录  导出分开到下面了
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
// 挂载路由导航守卫  to将要访问的数据  form 从那个路径调过来 next() 方行
router.beforeEach((to, from, next) => {
  //  r如果本来就是登录页面就放行
  if (to.path === '/login') return next()
  //  获取token
  const strToken = window.sessionStorage.getItem('token')
  //  没有token 将强制跳转login 登录页面
  if (!strToken) return next('/login')
  // 有token 放行   token还在 所有要去清除
  next()
})

export default router
