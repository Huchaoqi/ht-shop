import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/home',
      component: Home
    }
  ]
})
// 挂载路由导航守卫  router.beforeEach
router.beforeEach((to, from, next) => {
  // to 要访问的路径 from 代表从哪个路径跳转 next()放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
