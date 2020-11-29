'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import HomePage from 'components/homePage'
import Frontdesk from './frontdesk'
import { homeRouter, phoneHomeRouter } from './home'
import Logs from './logs'
import Settings from './settings'
import Statistics from './statistics'
import Monitor from './monitor'
import Miscellaneous from './miscellaneous'
// import FunctionTest from './funTest'

import store from '@/store'

Vue.use(VueRouter)

// 有权限的路由列表
export const menuRoutes = [
  homeRouter, Frontdesk, Logs, Settings,
  Statistics, Monitor, Miscellaneous
  // , FunctionTest
]

export const phoneRoutes = [
  phoneHomeRouter
]

// 无需权限的路由列表
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login',
    component: HomePage,
    children: []
  },
  {
    path: '/login',
    meta: {
      title: 'menu.loginPage'
    },
    // name: 'Login', // 定义动态路由时,初始路由不能有name,否则报警告
    component: Login
  },
  {
    path: '/404',
    meta: {
      title: 'menu.noFoundPage'
    },
    // name: 'NotFound',
    component: () => import('@/views/NotFound')
  },
  {
    path: '*',
    meta: {
      title: 'menu.noFoundPage'
    },
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
    // 如果要升级vue-router 3.3.x版本以上,需要注释掉这句代码,不然导致他会进入了
    // Login路径,然后就删除session了,我也不知道为什么会重复进入login,并且
    // to和from的path都是一致的,都是login
    await app.publicMethods.removeUserSession()
  }
  let isLogin = app.publicMethods.getUserSession()
  if (!isLogin) {
    // 如果没有登录,则跳回登录页
    const path = to.path // 获取当前路径
    const query = to.query // 获取当前路径的?后面的参数JSON
    // if (to.path !== '/login') {
    //   await app.publicMethods.removeUserSession()
    //   next({
    //     path: '/login'
    //   })
    // } else {
    //   next()
    // }
    if (path === '/login') {
      return next()
    } else if (path === '/home' && query.key) {
      const session = JSON.parse(app.publicMethods.tripleDESdecrypt(query.key))
      app.publicMethods.setUserSession(session)
      isLogin = true
    } else {
      await app.publicMethods.removeUserSession()
      return next({
        path: '/login'
      })
    }
  }
  // else {
  // 这里需要修改一下,如果home页面从别的地方进来需要刷新路由
  if (isLogin) {
    // 进到这里说明已经登录成功了,首先先判断是否取了用户权限,如果内存中没有取,那么就去取
    // 这里要注意的是,每次刷新页面时都会去获取一遍权限,如果不刷新页面,权限则使用内存值
    const userRoles = store.getters.roles
    if (userRoles) {
      // 内存中有权限,则放行
      next()
    } else {
      // 获取用户权限
      let result
      try {
        result = await store.dispatch('userInfo/getRoles')
      } catch (e) {
        result = e
      }

      // 如果请求接口返回无效的凭证,则需要回到登录页
      if (result.code === app.staticVal.Code.Invalid) {
        // 这里是无效的凭证判断,需要返回登录页面
        // 这里估计要清除面包屑
        await app.publicMethods.removeUserSession()
        next({
          path: '/login',
          replace: true
        })
      } else {
        // generate accessible routes map based on roles
        const roles = result.roles

        // 生成动态路由
        const accessRoutes = await store.dispatch('tagsView/generateRoutes', roles)

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
      }
    }
  }
})

router.afterEach(to => {
  // 这里404要处理一下setAddViews才得
  // 这里的处理404是由于动态路由的原因,可能导致之前进入的路由变成404,但是还存在setAddViews
  // 估计可以不需要处理了
  const app = router.app
  // 设置当前路由对象
  app.$store.dispatch('tagsView/setCurrentRouter', to)
  if (to.fullPath && to.fullPath !== '/login' && to.fullPath !== '/404') {
    // 设置面包屑视图
    app.$store.dispatch('tagsView/setAddViews', to).then(() => {
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
