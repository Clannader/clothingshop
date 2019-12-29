/**
 * Create by CC on 2019/12/16
 */
'use strict'

const statisticsRouter = {
  path: 'statistics',
  name: 'Statistics',
  meta: {
    title: 'menu.statistics',
    icon: 'iconfont icon-c-statistics',
    right: 'ALL'
  },
  component: () => import('@/views/statistics'),
  children: [
    {
      path: 'order',
      name: 'StaShopOrder',
      meta: {
        title: 'menu.staShopOrder',
        icon: 'iconfont icon-c-shop-order',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'income',
      name: 'StaIncome',
      meta: {
        title: 'menu.staIncome',
        icon: 'iconfont icon-c-income',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'userAccess',
      name: 'StaUserAccess',
      meta: {
        title: 'menu.staUserAccess',
        icon: 'iconfont icon-c-user-access',
        right: ''
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default statisticsRouter
