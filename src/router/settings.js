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
  redirect: {
    name: 'SettingsSubMenu'
  },
  component: () => import('@/views/settings'),
  children: [
    {
      path: ' ', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      name: 'SettingsSubMenu',
      meta: {
        title: 'menu.settings',
        hidden: true
      },
      component: () => import('@/views/common/SubItem')
    },
    {
      path: 'supplier',
      name: 'SupplierList',
      meta: {
        title: 'menu.supplierList',
        icon: 'iconfont icon-c-supplier',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'shop',
      name: 'ShopList',
      meta: {
        title: 'menu.shopList',
        icon: 'iconfont icon-c-shop-add',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'user',
      name: 'UserList',
      meta: {
        title: 'menu.userList',
        icon: 'iconfont icon-c-user-setup',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'right',
      name: 'RightList',
      meta: {
        title: 'menu.rightList',
        icon: 'iconfont icon-c-right',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'system',
      name: 'SystemList',
      meta: {
        title: 'menu.systemList',
        icon: 'iconfont icon-c-system-setup',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'mail',
      name: 'MailList',
      meta: {
        title: 'menu.mailList',
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
