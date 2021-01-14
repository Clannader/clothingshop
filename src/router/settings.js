/**
 * Create by CC on 2019/12/16
 */
'use strict'
import RightsCode from '../utils/rightsCode'
const settingsRouter = {
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
        right: '3000',
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
        right: '3001'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'shop',
      // name: 'ShopList',
      meta: {
        title: 'menu.shopList',
        icon: 'iconfont icon-c-shop-add',
        right: '3002'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'user',
      // name: 'UserList',
      meta: {
        title: 'menu.userList',
        icon: 'iconfont icon-c-user-setup',
        right: RightsCode.UserSetup.code
      },
      component: () => import('@/views/settings/users')
    },
    {
      path: 'right',
      // name: 'RightList',
      meta: {
        title: 'menu.rightList',
        icon: 'iconfont icon-c-right',
        right: RightsCode.RightsSetup.code
      },
      component: () => import('@/views/settings/rights')
    },
    {
      path: 'system',
      // name: 'SystemList',
      meta: {
        title: 'menu.systemList',
        icon: 'iconfont icon-c-system-setup',
        right: RightsCode.SystemSetup.code
      },
      component: () => import('@/views/settings/systemConfig')
    },
    {
      path: 'mail',
      // name: 'MailList',
      meta: {
        title: 'menu.mailList',
        icon: 'iconfont icon-c-mail-setup',
        right: '3006'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'repair',
      // name: 'Repair',
      meta: {
        title: 'menu.repair',
        icon: 'iconfont icon-c-repair',
        right: '3007'
      },
      component: () => import('@/views/test/components/TestXlsx')
    }
  ]
}

const phoneSettingsRouter = {
  path: 'settings',
  meta: {
    title: 'menu.pSettings'
  },
  redirect: {
    path: '/settings/'
  },
  component: () => import('@/phone/blank/ChildrenBlank'),
  children: [
    {
      path: '/',
      meta: {
        title: 'menu.pSettings',
        hidden: true
      },
      component: () => import('@/phone/settings')
    },
    {
      path: 'user',
      meta: {
        title: 'menu.pSettingsUser'
      },
      component: () => import('@/phone/settings/user')
    }
  ]
}

export {
  settingsRouter,
  phoneSettingsRouter
}
