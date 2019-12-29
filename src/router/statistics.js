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
  redirect: {
    name: 'StatisticsSubMenu'
  },
  component: () => import('@/views/statistics'),
  children: [
    {
      path: ' ', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      name: 'StatisticsSubMenu',
      meta: {
        title: 'menu.statistics',
        hidden: true
      },
      component: () => import('@/views/common/SubItem')
    },
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
