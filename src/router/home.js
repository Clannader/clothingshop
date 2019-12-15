/**
 * Create by CC on 2018/12/19
 */
'use strict'

const homeRouter = {
  path: 'home',
  name: 'Home',
  meta: {
    title: 'menu.home',
    icon: 'shouye',
    right: 'ALL'
  },
  component: () => import('@/views/home')
}

export default homeRouter
