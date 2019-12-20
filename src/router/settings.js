/**
 * Create by CC on 2019/12/16
 */
'use strict'

const otherSettingsRouter = {
  path: 'settings',
  name: 'Settings',
  meta: {
    title: 'menu.settings',
    icon: 'iconfont icon-c-settings',
    right: 'ALL'
  },
  component: () => import('@/views/home')
}

export default otherSettingsRouter
