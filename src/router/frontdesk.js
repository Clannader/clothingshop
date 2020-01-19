/**
 * Create by CC on 2018/12/7
 */
'use strict'

const frontdeskRouter = {
  path: 'frontdesk',
  name: 'Frontdesk',
  to: 'frontdesk',
  meta: {
    title: 'menu.frontdesk',
    icon: 'iconfont icon-frontdesk'
  },
  redirect: {
    name: 'FrontDeskSubMenu'
  },
  component: () => import('@/views/frontdesk'),
  children: [
    {
      path: '/', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      name: 'FrontDeskSubMenu',
      meta: {
        title: 'menu.frontdesk',
        right: '2001',
        hidden: true
      },
      component: () => import('@/views/common/MenuView')
    },
    {
      path: 'shopInfo',
      name: 'ShopInfo',
      meta: {
        title: 'menu.shopInfo',
        icon: 'iconfont icon-c-shopinfo',
        right: '2002'
      },
      component: () => import('@/views/frontdesk/shopInfo')
    },
    {
      path: 'category',
      name: 'ShopCategory',
      meta: {
        title: 'menu.shopCategory',
        icon: 'iconfont icon-c-category',
        right: '2003'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'clothing',
      name: 'Clothing',
      meta: {
        title: 'menu.clothing',
        icon: 'iconfont icon-c-clothing',
        right: '2004'
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'order',
      name: 'ShopOrder',
      meta: {
        title: 'menu.shopOrder',
        icon: 'iconfont icon-c-order-setup',
        right: '2005'
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default frontdeskRouter
