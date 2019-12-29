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
  redirect: {
    name: 'LogsSubMenu'
  },
  component: () => import('@/views/logs'),
  children: [
    {
      path: ' ', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      name: 'LogsSubMenu',
      meta: {
        title: 'menu.logs',
        hidden: true
      },
      component: () => import('@/views/common/SubItem')
    },
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
