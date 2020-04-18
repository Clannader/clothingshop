/**
 * Create by CC on 2018/12/19
 */
'use strict'

const homeRouter = {
  path: 'home',
  to: 'home',
  meta: {
    title: 'menu.home',
    icon: 'iconfont icon-c-home'
  },
  component: () => import('@/views/home')
}

export default homeRouter
