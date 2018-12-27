import Vue from 'vue'
import Router from 'vue-router'

// @表示的是src下面的绝对路径
import Home from '@/components/Home'
import Login from '@/components/Login'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
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

// 给router注册导航守卫
// to: 要去哪儿
// from: 从哪儿来
// next: 是否放行  next(): 方向 next('/login') next('/home')

router.beforeEach((to, from, next) => {
  // 如果是去登录的，不用拦截
  console.log('to', to)
  console.log('from', from)

  if (to.path === '/login') {
    next()
    return
  }
  // 如果不是登录的，判断是否有tooken如果有，放行，如果有去登录
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
