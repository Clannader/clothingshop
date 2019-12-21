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
  component: () => import('@/views/home')
}

export default logsRouter
