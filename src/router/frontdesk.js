/**
 * Create by CC on 2018/12/7
 */
'use strict'

const frontdeskRouter = {
  path: 'frontdesk',
  name: 'Frontdesk',
  meta: {
    title: 'menu.frontdesk',
    icon: 'iconfont icon-frontdesk',
    right: ''
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
        right: ''
      },
      component: () => import('@/views/frontdesk/shopInfo')
    },
    {
      path: 'category',
      name: 'ShopCategory',
      meta: {
        title: 'menu.shopCategory',
        icon: 'iconfont icon-c-category',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'clothing',
      name: 'clothing',
      meta: {
        title: 'menu.clothing',
        icon: 'iconfont icon-c-clothing',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'order',
      name: 'ShopOrder',
      meta: {
        title: 'menu.shopOrder',
        icon: 'iconfont icon-c-order-setup',
        right: ''
      },
      component: () => import('@/views/blank')
    }
  ]
}

export default frontdeskRouter
