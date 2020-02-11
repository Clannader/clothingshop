/**
 * Create by CC on 2019/12/16
 */
'use strict'

const otherSettingsRouter = {
  path: 'settings',
  // name: 'Settings',
  to: 'settings',
  meta: {
    title: 'menu.settings',
    icon: 'iconfont icon-c-settings'
  },
  redirect: {
    // name: 'SettingsSubMenu'
    path: '/settings/'
  },
  component: () => import('@/views/settings'),
  children: [
    {
      path: '/', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      // name: 'SettingsSubMenu',
      meta: {
        title: 'menu.settings',
        right: '4001',
        hidden: true
      },
      component: () => import('@/views/common/MenuView')
    },
    {
      path: 'supplier',
      // name: 'SupplierList',
      meta: {
        title: 'menu.supplierList',
        icon: 'iconfont icon-c-supplier',
        right: '4002'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'shop',
      // name: 'ShopList',
      meta: {
        title: 'menu.shopList',
        icon: 'iconfont icon-c-shop-add',
        right: '4003'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'user',
      // name: 'UserList',
      meta: {
        title: 'menu.userList',
        icon: 'iconfont icon-c-user-setup',
        right: '4004'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'right',
      // name: 'RightList',
      meta: {
        title: 'menu.rightList',
        icon: 'iconfont icon-c-right',
        right: '4005'
      },
      component: () => import('@/views/settings/rights')
    },
    {
      path: 'system',
      // name: 'SystemList',
      meta: {
        title: 'menu.systemList',
        icon: 'iconfont icon-c-system-setup',
        right: '4006'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'mail',
      // name: 'MailList',
      meta: {
        title: 'menu.mailList',
        icon: 'iconfont icon-c-mail-setup',
        right: '4007'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'repair',
      // name: 'Repair',
      meta: {
        title: 'menu.repair',
        icon: 'iconfont icon-c-repair',
        right: '4008'
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default otherSettingsRouter
