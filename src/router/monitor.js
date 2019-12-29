/**
 * Create by CC on 2019/12/16
 */
'use strict'

const monitorRouter = {
  path: 'monitor',
  name: 'Monitor',
  meta: {
    title: 'menu.monitor',
    icon: 'iconfont icon-c-sys-monitor',
    right: 'ALL'
  },
  component: () => import('@/views/monitor'),
  children: [
    {
      path: 'user',
      name: 'UserMonitor',
      meta: {
        title: 'menu.userMonitor',
        icon: 'iconfont icon-c-user-monitor',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'api',
      name: 'ApiMonitor',
      meta: {
        title: 'menu.apiMonitor',
        icon: 'iconfont icon-c-api-monitor',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'database',
      name: 'DatabaseMonitor',
      meta: {
        title: 'menu.databaseMonitor',
        icon: 'iconfont icon-c-database',
        right: ''
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default monitorRouter
