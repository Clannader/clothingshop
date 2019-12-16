/**
 * Create by CC on 2019/12/16
 */
'use strict'

const monitorRouter = {
  path: 'monitor',
  name: 'Monitor',
  meta: {
    title: 'menu.monitor',
    icon: 'c-sys-monitor',
    right: 'ALL'
  },
  component: () => import('@/views/home')
}

export default monitorRouter
