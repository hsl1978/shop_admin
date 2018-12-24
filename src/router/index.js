import Vue from 'vue'
import Router from 'vue-router'


// @表示的是src下面的绝对路径
import Home from '@/components/Home'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      component:Login
    },
    {
      path: '/home',
      component:Home
    },
  ]
})
