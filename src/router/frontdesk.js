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
      path: 'shop',
      name: 'Shop',
      meta: {
        title: 'menu.shopInfo',
        icon: 'iconfont icon-c-shopinfo',
        right: ''
      },
      component: () => import('@/views/frontdesk/shopInfo')
    },
    {
      path: 'shopchildren',
      name: 'Shopchildren',
      meta: {
        title: 'menu.shopInfo',
        icon: 'iconfont icon-c-shopinfo',
        right: ''
      },
      component: () => import('@/views/frontdesk/shopInfo'),
      children: [
        {
          path: 'shop2',
          name: 'Shop2',
          meta: {
            title: 'menu.shopInfo',
            icon: 'iconfont icon-c-shopinfo',
            right: ''
          },
          component: () => import('@/views/frontdesk/shopInfo')
        },
        {
          path: 'shop3',
          name: 'Shop3',
          meta: {
            title: 'menu.shopInfo',
            icon: 'iconfont icon-c-shopinfo',
            right: ''
          },
          component: () => import('@/views/frontdesk/shopInfo')
        }
      ]
    },
    {
      path: 'shopchildren1',
      name: 'Shopchildren1',
      meta: {
        title: 'menu.shopInfo',
        icon: 'iconfont icon-c-shopinfo',
        right: ''
      },
      component: () => import('@/views/frontdesk/shopInfo'),
      children: [
        {
          path: 'shop21',
          name: 'Shop21',
          meta: {
            title: 'menu.shopInfo',
            icon: 'iconfont icon-c-shopinfo',
            right: ''
          },
          component: () => import('@/views/frontdesk/shopInfo')
        },
        {
          path: 'shop31',
          name: 'Shop31',
          meta: {
            title: 'menu.shopInfo',
            icon: 'iconfont icon-c-shopinfo',
            right: ''
          },
          component: () => import('@/views/frontdesk/shopInfo')
        }
      ]
    }
  ]
}

export default frontdeskRouter
