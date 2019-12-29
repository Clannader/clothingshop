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
  component: () => import('@/views/settings'),
  children: [
    {
      path: 'supplierList',
      name: 'SupplierList',
      meta: {
        title: 'menu.supplierList',
        icon: 'iconfont icon-c-supplier',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'shopList',
      name: 'ShopList',
      meta: {
        title: 'menu.shopList',
        icon: 'iconfont icon-c-shop-add',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'userList',
      name: 'UserList',
      meta: {
        title: 'menu.userList',
        icon: 'iconfont icon-c-user-setup',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'rightList',
      name: 'RightList',
      meta: {
        title: 'menu.rightList',
        icon: 'iconfont icon-c-right',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'systemList',
      name: 'SystemList',
      meta: {
        title: 'menu.SystemList',
        icon: 'iconfont icon-c-system-setup',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'mailList',
      name: 'MailList',
      meta: {
        title: 'menu.MailList',
        icon: 'iconfont icon-c-mail-setup',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'repair',
      name: 'Repair',
      meta: {
        title: 'menu.repair',
        icon: 'iconfont icon-c-repair',
        right: ''
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default otherSettingsRouter
