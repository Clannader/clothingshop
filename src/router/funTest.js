/**
 * Create by CC on 2019/12/29
 */
'use strict'

const TestRouter = {
  path: 'test', // 路径
  // name: 'FunctionTest', // 路由名
  to: 'test', // 使用path跳转,相当于fullPath
  meta: {
    title: 'menu.test', // 路由名 翻译
    i18nParams: { num: '' }, // 路由名翻译参数
    icon: 'crop' // 路由图标
  },
  redirect: {
    // name: 'FunctionTestSubMenu' // 路由重定向地址
    path: '/test/'
  },
  component: () => import('@/views/test'), // 路由组件
  children: [
    {
      path: '/', // 添加空格，用以防止路由不匹配导致路由导航重复的问题
      // name: 'FunctionTestSubMenu',
      meta: {
        title: 'menu.test',
        // right: '8001',
        i18nParams: { num: 1 },
        hidden: true // 路由是否显示在左侧栏
      },
      component: () => import('@/views/common/MenuView')
    },
    // {
    //   path: 'one',
    //   // name: 'TestOne',
    //   meta: {
    //     title: 'menu.test',
    //     i18nParams: { num: 2 },
    //     icon: 'crop'
    //   },
    //   component: () => import('@/views/blank')
    // },
    // {
    //   path: 'two',
    //   // name: 'TestTwo',
    //   meta: {
    //     title: 'menu.test',
    //     i18nParams: { num: 3 },
    //     icon: 'crop',
    //     chip: 'new'
    //   },
    //   component: () => import('@/views/blank')
    // },
    // {
    //   path: 'four',
    //   // name: 'TestSix',
    //   meta: {
    //     title: 'menu.test',
    //     i18nParams: { num: 4 },
    //     chip: 'hidden',
    //     hidden: true
    //   },
    //   component: () => import('@/views/blank')
    // },
    // {
    //   path: 'four11',
    //   // name: 'TestSix11',
    //   meta: {
    //     title: 'menu.test',
    //     i18nParams: { num: 5 },
    //     chip: 'hidden'
    //   },
    //   component: () => import('@/views/blank'),
    //   children: [
    //     {
    //       path: 'foureee',
    //       // name: 'TestSixeee',
    //       meta: {
    //         title: 'menu.test',
    //         i18nParams: { num: 6 },
    //         chip: 'hidden',
    //         hidden: true
    //       },
    //       component: () => import('@/views/blank')
    //     },
    //     {
    //       path: 'fourfff',
    //       // name: 'TestSixfff',
    //       meta: {
    //         title: 'menu.test',
    //         i18nParams: { num: 7 },
    //         chip: 'hidden',
    //         icon: 'crop'
    //         // hidden: true,
    //       },
    //       component: () => import('@/views/blank')
    //     }
    //   ]
    // },
    // {
    //   path: 'three',
    //   // name: 'TestThree',
    //   meta: {
    //     title: 'menu.test',
    //     i18nParams: { num: 8 },
    //     icon: 'crop'
    //   },
    //   component: () => import('@/views/blank'),
    //   children: [
    //     {
    //       path: 'one',
    //       // name: 'TestFour',
    //       meta: {
    //         title: 'menu.test',
    //         i18nParams: { num: 9 },
    //         icon: 'crop'
    //       },
    //       component: () => import('@/views/blank')
    //     },
    //     {
    //       path: 'two',
    //       // name: 'TestFive',
    //       meta: {
    //         title: 'menu.test',
    //         i18nParams: { num: 10 },
    //         icon: 'crop'
    //       },
    //       component: () => import('@/views/blank')
    //     }
    //   ]
    // }
    {
      path: 'date',
      meta: {
        title: 'menu.test',
        i18nParams: { num: '日期' },
        icon: 'crop'
      },
      props: {
        pageName: 'TestDate'
      },
      component: () => import('@/views/test/TestContainer')
    },
    {
      path: 'imgUpload',
      meta: {
        title: 'menu.test',
        i18nParams: { num: '图片上传' },
        icon: 'crop'
      },
      props: {
        pageName: 'TestImgUpload'
      },
      component: () => import('@/views/test/TestContainer')
    },
    {
      path: 'previewDoc',
      meta: {
        title: 'menu.test',
        i18nParams: { num: '文档查看' },
        icon: 'crop'
      },
      props: {
        pageName: 'TestPreviewDoc'
      },
      component: () => import('@/views/test/TestContainer')
    },
    {
      path: 'qrCode',
      meta: {
        title: 'menu.test',
        i18nParams: { num: '二维码' },
        icon: 'crop'
      },
      props: {
        pageName: 'TestQrCode'
      },
      component: () => import('@/views/test/TestContainer')
    },
    {
      path: 'scorll',
      meta: {
        title: 'menu.test',
        i18nParams: { num: '滚动条' },
        icon: 'crop'
      },
      props: {
        pageName: 'TestScorll'
      },
      component: () => import('@/views/test/TestContainer')
    },
    {
      path: 'selectAll',
      meta: {
        title: 'menu.test',
        i18nParams: { num: '选择全部' },
        icon: 'crop'
      },
      props: {
        pageName: 'TestSelectAll'
      },
      component: () => import('@/views/test/TestContainer')
    },
    {
      path: 'store',
      meta: {
        title: 'menu.test',
        i18nParams: { num: 'Store' },
        icon: 'crop'
      },
      props: {
        pageName: 'TestStore'
      },
      component: () => import('@/views/test/TestContainer')
    },
    {
      path: 'unit',
      meta: {
        title: 'menu.test',
        i18nParams: { num: '单元' },
        icon: 'crop'
      },
      props: {
        pageName: 'TestUnit'
      },
      component: () => import('@/views/test/TestContainer')
    },
    {
      path: 'xlsx',
      meta: {
        title: 'menu.test',
        i18nParams: { num: '表格' },
        icon: 'crop'
      },
      props: {
        pageName: 'TestXlsx'
      },
      component: () => import('@/views/test/TestContainer')
    }
  ]
}

export default TestRouter
