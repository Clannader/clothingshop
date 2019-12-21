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
        icon: 'iconfont icon-shopinfo',
        right: ''
      },
      component: () => import('@/views/frontdesk/shopInfo')
    }
  ]
}

export default frontdeskRouter
