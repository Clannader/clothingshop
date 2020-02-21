'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import HomePage from 'components/homePage'
// import Frontdesk from './frontdesk'
import Home from './home'
// import Logs from './logs'
// import Settings from './settings'
// import Statistics from './statistics'
// import Monitor from './monitor'
// import Miscellaneous from './miscellaneous'
// import FunctionTest from './funTest'

import store from '@/store'

Vue.use(VueRouter)

// 有权限的路由列表
export const menuRoutes = [
  Home
  // , Frontdesk, Logs, Settings,
  // Statistics, Monitor, Miscellaneous, FunctionTest
]

// 无需权限的路由列表
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login',
    component: HomePage,
    children: [Home]
  },
  {
    path: '/login',
    // name: 'Login', // 定义动态路由时,初始路由不能有name,否则报警告
    component: Login
  },
  {
    path: '/404',
    // name: 'NotFound',
    component: () => import('@/views/NotFound')
  },
  {
    path: '*',
    component: () => import('@/views/NotFound'),
    // redirect: '/404', // 定义动态路由时,不能这样写,否则刷新会跳转404
    hidden: true
  }
]

const createRouter = () => new VueRouter({
  // 如果服务器没有设置重定向,那么下面2句必须注掉
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  base: process.env.VUE_APP_BASE_ROUTER,
  routes: constantRoutes
})

const router = createRouter()

router.beforeEach(async(to, from, next) => {
  // 这个app就是vue对象
  // 这里测试一下退出的操作和意外的删除session的逻辑是否退回登录页
  const app = router.app
  if (to.path === '/login') {
    // 退出登录操作
    await app.publicMethods.removeUserSession()
  }
  const isLogin = app.publicMethods.getUserSession()
  if (!isLogin) {
    // 如果没有登录,则跳回登录页
    if (to.path !== '/login') {
      await app.publicMethods.removeUserSession()
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    // 进到这里说明已经登录成功了,首先先判断是否取了用户权限,如果内存中没有取,那么就去取
    // 这里要注意的是,每次刷新页面时都会去获取一遍权限,如果不刷新页面,权限则使用内存值
    const userRoles = store.getters.roles
    if (userRoles) {
      // 内存中有权限,则放行
      next()
    } else {
      // 获取用户权限
      // let result
      // try {
      //   result = await store.dispatch('getRoles')
      // } catch (e) {
      //   result = e
      // }

      // 如果请求接口返回无效的凭证,则需要回到登录页
      // if (result.code === app.staticVal.Code.Invalid) {
      //   // 这里是无效的凭证判断,需要返回登录页面
      //   // 这里估计要清除面包屑
      //   await app.publicMethods.removeUserSession()
      //   next({
      //     path: '/login',
      //     replace: true
      //   })
      // } else {
      //   // generate accessible routes map based on roles
      //   const roles = result.roles
      //
      //   // 生成动态路由
      //   const accessRoutes = await store.dispatch('generateRoutes', roles)
      //
      //   // dynamically add accessible routes
      //   router.addRoutes(accessRoutes)
      //
      //   // hack method to ensure that addRoutes is complete
      //   // set the replace: true, so the navigation will not leave a history record
      //   next({ ...to, replace: true })
      // }
      next()
    }
  }
})

router.afterEach(to => {
  // 这里404要处理一下setAddViews才得
  // 这里的处理404是由于动态路由的原因,可能导致之前进入的路由变成404,但是还存在setAddViews
  // 估计可以不需要处理了
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

export default router
