'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import HomePage from 'components/homePage'
import Frontdesk from './frontdesk'
import Home from './home'
import Logs from './logs'
import Settings from './settings'
import Statistics from './statistics'
import Monitor from './monitor'
import Miscellaneous from './miscellaneous'

Vue.use(VueRouter)

const menuRoutes = [
  Home, Frontdesk, Logs, Settings,
  Statistics, Monitor, Miscellaneous
]

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: HomePage,
    children: [
      ...menuRoutes
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  // 如果服务器没有设置重定向,那么下面2句必须注掉
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  base: process.env.VUE_APP_BASE_ROUTER,
  routes: routes
})

router.beforeEach((to, from, next) => {
  // 这个app就是vue对象
  const app = router.app
  if (to.path === '/login') {
    // 退出登录操作
    app.publicMethods.removeUserSession()
  }
  const isLogin = app.publicMethods.getUserSession()
  if (!isLogin && to.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

router.afterEach(to => {
})

// 这里处理多次点击当前路由报错,其实就是屏蔽错误,vue那边的坑
// 解决重复点击导航路由报错 vue-router 3.1.3版本还有问题,等升级后再说吧,暂时屏蔽错误，不影响功能
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push() {
  return originalPush.apply(this, Array.prototype.slice.apply(arguments)).catch(err => err)
}

export const menuRouter = menuRoutes

export default router
