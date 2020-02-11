/**
 * Create by CC on 2019/12/16
 */
'use strict'

const statisticsRouter = {
  path: 'statistics',
  // name: 'Statistics',
  to: 'statistics',
  meta: {
    title: 'menu.statistics',
    icon: 'iconfont icon-c-statistics'
  },
  redirect: {
    // name: 'StatisticsSubMenu'
    path: '/statistics/'
  },
  component: () => import('@/views/statistics'),
  children: [
    {
      path: '/', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      // name: 'StatisticsSubMenu',
      meta: {
        title: 'menu.statistics',
        right: '5001',
        hidden: true
      },
      component: () => import('@/views/common/MenuView')
    },
    {
      path: 'order',
      // name: 'StaShopOrder',
      meta: {
        title: 'menu.staShopOrder',
        icon: 'iconfont icon-c-shop-order',
        right: '5002'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'income',
      // name: 'StaIncome',
      meta: {
        title: 'menu.staIncome',
        icon: 'iconfont icon-c-income',
        right: '5003'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'userAccess',
      // name: 'StaUserAccess',
      meta: {
        title: 'menu.staUserAccess',
        icon: 'iconfont icon-c-user-access',
        right: '5004'
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default statisticsRouter
