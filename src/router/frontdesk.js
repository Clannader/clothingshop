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
  component: () => import('@/views/frontdesk'),
  children: [
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
