/**
 * Create by CC on 2018/12/7
 */
'use strict'
import RightsCode from '../utils/rightsCode'
const frontdeskRouter = {
  path: 'frontdesk',
  // name: 'Frontdesk',
  to: 'frontdesk',
  meta: {
    title: 'menu.frontdesk',
    icon: 'iconfont icon-frontdesk'
  },
  redirect: {
    // name: 'FrontDeskSubMenu'
    path: '/frontdesk/'
  },
  component: () => import('@/views/frontdesk'),
  children: [
    {
      path: '/', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      // name: 'FrontDeskSubMenu',
      meta: {
        title: 'menu.frontdesk',
        right: RightsCode.FrontdeskManager.code,
        hidden: true
      },
      component: () => import('@/views/common/MenuView')
    },
    {
      path: 'shopInfo',
      // name: 'ShopInfo',
      meta: {
        title: 'menu.shopInfo',
        icon: 'iconfont icon-c-shopinfo',
        right: RightsCode.ShopInfo.code
      },
      component: () => import('@/views/frontdesk/shopInfo')
    },
    {
      path: 'category',
      // name: 'ShopCategory',
      meta: {
        title: 'menu.shopCategory',
        icon: 'iconfont icon-c-category',
        right: RightsCode.CategoryManager.code
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'clothing',
      // name: 'Clothing',
      meta: {
        title: 'menu.clothing',
        icon: 'iconfont icon-c-clothing',
        right: RightsCode.ClothesManager.code
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'order',
      // name: 'ShopOrder',
      meta: {
        title: 'menu.shopOrder',
        icon: 'iconfont icon-c-order-setup',
        right: RightsCode.OrderManager.code
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default frontdeskRouter
