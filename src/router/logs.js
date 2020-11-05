/**
 * Create by CC on 2019/12/16
 */

'use strict'
import RightsCode from '../utils/rightsCode'
const logsRouter = {
  path: 'logs',
  // name: 'Logs',
  to: 'logs',
  meta: {
    title: 'menu.logs',
    icon: 'iconfont icon-c-logs'
  },
  redirect: {
    // name: 'LogsSubMenu'
    path: '/logs/'
  },
  component: () => import('@/views/logs'),
  children: [
    {
      path: '/', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      // name: 'LogsSubMenu',
      meta: {
        title: 'menu.logs',
        hidden: true,
        right: '3001'
      },
      component: () => import('@/views/common/MenuView')
    },
    {
      path: 'user',
      // name: 'UserLogs',
      meta: {
        title: 'menu.userLogs',
        icon: 'iconfont icon-c-opera-logs',
        right: '3002'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'server',
      // name: 'ServerLogs',
      meta: {
        title: 'menu.serverLogs',
        icon: 'iconfont icon-c-server-logs',
        right: RightsCode.ServerLogs.code
      },
      component: () => import('@/views/logs/server')
    },
    {
      path: 'mail',
      // name: 'MailLogs',
      meta: {
        title: 'menu.mailLogs',
        icon: 'iconfont icon-c-mail-logs',
        right: '3004'
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default logsRouter
