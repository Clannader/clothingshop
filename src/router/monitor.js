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
  redirect: {
    name: 'MonitorSubMenu'
  },
  component: () => import('@/views/monitor'),
  children: [
    {
      path: '/', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      name: 'MonitorSubMenu',
      meta: {
        title: 'menu.monitor',
        hidden: true
      },
      component: () => import('@/views/common/MenuView')
    },
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
