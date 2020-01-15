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
import FunctionTest from './funTest'

import store from '@/store'

Vue.use(VueRouter)

// 这些是有权限的路由
const menuRoutes = [
  Frontdesk, Logs, Settings,
  Statistics, Monitor, Miscellaneous, FunctionTest
]

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: HomePage,
    children: [
      Home
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

const createRouter = () => new VueRouter({
  // 如果服务器没有设置重定向,那么下面2句必须注掉
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  base: process.env.VUE_APP_BASE_ROUTER,
  routes: routes
})

const router = createRouter()

router.beforeEach(async(to, from, next) => {
  // 这个app就是vue对象
  const app = router.app
  if (to.path === '/login') {
    // 退出登录操作
    await app.publicMethods.removeUserSession()
  }
  const isLogin = app.publicMethods.getUserSession()
  if (!isLogin) {
    if (to.path !== '/login') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    // 进到这里说明已经登录成功了,首先先判断是否取了用户权限,如果内存中没有取,那么就去取
    const userRoles = store.getters.roles
    if (userRoles) {
      next()
    } else {
      // 获取用户权限
      let result
      try {
        result = await store.dispatch('getRoles')
      } catch (e) {
        result = e
      }

      if (result.code === app.staticVal.Code.Invalid) {
        // TODO 这里估计要清除面包屑
        next({
          path: '/login'
        })
      } else {
        next()
      }
    }
  }
})

router.afterEach(to => {
  if (to.fullPath && to.fullPath !== '/login' && to.fullPath !== '/404') {
    const app = router.app
    // 设置当前路由对象
    app.$store.dispatch('setCurrentRouter', to)
    // 设置面包屑视图
    app.$store.dispatch('setAddViews', to).then(() => {
      // 最后保存路由
      sessionStorage.setItem('addViews', JSON.stringify(app.$store.state.tagsView.addViews))
    })
  }
})

// 这里处理多次点击当前路由报错,其实就是屏蔽错误,vue那边的坑
// 解决重复点击导航路由报错 vue-router 3.1.3版本还有问题,等升级后再说吧,暂时屏蔽错误，不影响功能
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push() {
  return originalPush.apply(this, Array.prototype.slice.apply(arguments)).catch(err => err)
}

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重设路由
}

export const menuRouter = menuRoutes // 有权限的路由列表

export const constantRoutes = routes // 无需权限的路由列表

export default router
