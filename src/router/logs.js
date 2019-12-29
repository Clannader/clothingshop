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
  component: () => import('@/views/logs'),
  children: [
    {
      path: 'user',
      name: 'UserLogs',
      meta: {
        title: 'menu.userLogs',
        icon: 'iconfont icon-c-opera-logs',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'server',
      name: 'ServerLogs',
      meta: {
        title: 'menu.serverLogs',
        icon: 'iconfont icon-c-server-logs',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'mail',
      name: 'MailLogs',
      meta: {
        title: 'menu.mailLogs',
        icon: 'iconfont icon-c-mail-logs',
        right: ''
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default logsRouter
