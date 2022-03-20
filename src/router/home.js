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
    icon: 'mdi-home-outline'
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
  component: () => import('components/phoneHomePage')
}

export {
  homeRouter,
  phoneHomeRouter
}
