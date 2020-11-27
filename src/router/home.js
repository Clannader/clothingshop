/**
 * Create by CC on 2018/12/19
 */
'use strict'

const homeRouter = {
  path: 'home',
  // name: 'Home',
  to: 'home',
  meta: {
    title: 'menu.home',
    icon: 'iconfont icon-c-home'
  },
  component: () => import('@/views/home')
}

const phoneHomeRouter = {
  path: 'home',
  to: 'home',
  meta: {
    title: 'menu.home',
    icon: 'iconfont icon-c-home'
  },
  component: () => import('@/phone/home')
}

export {
  homeRouter,
  phoneHomeRouter
}
