/**
 * Create by CC on 2019/12/29
 */
'use strict'

const TestRouter = {
  path: 'test', // 路径
  name: 'FunctionTest', // 路由名
  meta: {
    title: 'menu.test', // 路由名 翻译
    i18nParams: { num: 0 }, // 路由名翻译参数
    icon: 'crop', // 路由图标
    right: 'ALL' // 路由权限
  },
  redirect: {
    name: 'FunctionTestSubMenu' // 路由重定向地址
  },
  component: () => import('@/views/test'), // 路由组件
  children: [
    {
      path: '/', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      name: 'FunctionTestSubMenu',
      meta: {
        title: 'menu.test',
        i18nParams: { num: 1 },
        hidden: true // 路由是否显示在左侧栏
      },
      component: () => import('@/views/common/SubItem')
    },
    {
      path: 'one',
      name: 'TestOne',
      meta: {
        title: 'menu.test',
        i18nParams: { num: 2 },
        icon: 'crop',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'two',
      name: 'TestTwo',
      meta: {
        title: 'menu.test',
        i18nParams: { num: 3 },
        icon: 'crop',
        chip: 'new',
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'four',
      name: 'TestSix',
      meta: {
        title: 'menu.test',
        i18nParams: { num: 4 },
        chip: 'hidden',
        hidden: true,
        right: ''
      },
      component: () => import('@/views/blank')
    },
    {
      path: 'four11',
      name: 'TestSix11',
      meta: {
        title: 'menu.test',
        i18nParams: { num: 5 },
        chip: 'hidden',
        right: ''
      },
      component: () => import('@/views/blank'),
      children: [
        {
          path: 'foureee',
          name: 'TestSixeee',
          meta: {
            title: 'menu.test',
            i18nParams: { num: 6 },
            chip: 'hidden',
            // hidden: true,
            right: ''
          },
          component: () => import('@/views/blank')
        },
        {
          path: 'fourfff',
          name: 'TestSixfff',
          meta: {
            title: 'menu.test',
            i18nParams: { num: 7 },
            chip: 'hidden',
            // hidden: true,
            right: ''
          },
          component: () => import('@/views/blank')
        }
      ]
    },
    {
      path: 'three',
      name: 'TestThree',
      meta: {
        title: 'menu.test',
        i18nParams: { num: 8 },
        icon: 'crop',
        right: ''
      },
      component: () => import('@/views/blank'),
      children: [
        {
          path: 'one',
          name: 'TestFour',
          meta: {
            title: 'menu.test',
            i18nParams: { num: 9 },
            icon: 'crop',
            right: ''
          },
          component: () => import('@/views/blank')
        },
        {
          path: 'two',
          name: 'TestFive',
          meta: {
            title: 'menu.test',
            i18nParams: { num: 10 },
            icon: 'crop',
            right: ''
          },
          component: () => import('@/views/blank')
        }
      ]
    }
  ]
}

export default TestRouter
