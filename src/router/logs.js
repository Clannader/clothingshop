/**
 * Create by CC on 2019/12/16
 */
'use strict'

const logsRouter = {
  path: 'logs',
  name: 'Logs',
  meta: {
    title: 'menu.logs',
    icon: 'iconfont icon-c-logs',
    right: 'ALL'
  },
  component: () => import('@/views/home'),
  children: [
    {
      path: 'userLogs',
      name: 'UserLogs',
      meta: {
        title: 'menu.userLogs',
        icon: 'iconfont icon-c-opera-logs',
        right: ''
      },
      component: () => import('@/views/frontdesk/shopInfo')
    }
  ]
}

export default logsRouter
