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
    icon: 'mdi-cog'
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
        right: RightsCode.OtherSetup.code,
        hidden: true
      },
      component: () => import('@/views/common/MenuView')
    },
    // {
    //   path: 'supplier',
    //   // name: 'SupplierList',
    //   meta: {
    //     title: 'menu.supplierList',
    //     icon: 'iconfont icon-c-supplier',
    //     right: RightsCode.SupplierSetup.code
    //   },
    //   component: () => import('@/views/blank')
    // },
    // {
    //   path: 'shop',
    //   // name: 'ShopList',
    //   meta: {
    //     title: 'menu.shopList',
    //     icon: 'iconfont icon-c-shop-add',
    //     right: RightsCode.ShopSetup.code
    //   },
    //   component: () => import('@/views/blank')
    // },
    // {
    //   path: 'user',
    //   // name: 'UserList',
    //   meta: {
    //     title: 'menu.userList',
    //     icon: 'iconfont icon-c-user-setup',
    //     right: RightsCode.UserSetup.code
    //   },
    //   component: () => import('@/views/settings/users')
    // },
    {
      path: 'rights',
      // name: 'RightList',
      meta: {
        title: 'menu.rightList',
        // icon: 'iconfont icon-c-right',
        right: RightsCode.RightsSetup.code
      },
      component: () => import('@/views/settings/rights'),
      children: [
        {
          path: 'group',
          meta: {
            title: 'menu.rightGroupList',
            icon: 'mdi-account-lock',
            right: RightsCode.RightsGroupSetup.code
          },
          component: () => import('@/views/settings/rights/rightsGroup')
        },
        {
          path: 'code',
          meta: {
            title: 'menu.rightCodeList',
            icon: 'mdi-shield-lock',
            right: RightsCode.RightsCodeSetup.code
          },
          component: () => import('@/views/settings/rights/rightsCode')
        }
      ]
    }
    // {
    //   path: 'system',
    //   // name: 'SystemList',
    //   meta: {
    //     title: 'menu.systemList',
    //     icon: 'iconfont icon-c-system-setup',
    //     right: RightsCode.SystemSetup.code
    //   },
    //   component: () => import('@/views/settings/systemConfig')
    // },
    // {
    //   path: 'mail',
    //   // name: 'MailList',
    //   meta: {
    //     title: 'menu.mailList',
    //     icon: 'iconfont icon-c-mail-setup',
    //     right: RightsCode.MailSetup.code
    //   },
    //   component: () => import('@/views/blank')
    // },
    // {
    //   path: 'repair',
    //   // name: 'Repair',
    //   meta: {
    //     title: 'menu.repair',
    //     icon: 'iconfont icon-c-repair',
    //     right: RightsCode.RepairData.code
    //   },
    //   component: () => import('@/views/test/components/TestXlsx')
    // }
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
