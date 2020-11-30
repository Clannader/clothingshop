/**
 * Create by CC on 2019/12/22
 */
'use strict'

// import vueQriously from 'vue-qriously'
// import vueHtmlToPaper from 'vue-html-to-paper'

// Vue.use(vueQriously)
// Vue.use(vueHtmlToPaper, {
//   name: '',
//   specs: [
//     'fullscreen=yes',
//     'titlebar=yes',
//     'scrollbars=yes'
//   ]
//   // styles: [
//   //   'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
//   //   'https://unpkg.com/kidlat-css/css/kidlat.css'
//   // ]
// })

// 自定义组件
// export function registerComponents(app) {
//   app.component('menu-group', () => import('@/components/core/MenuGroup'))
//   app.component('menu-item', () => import('@/components/core/MenuItem'))
//   app.component('menu-sub-group', () => import('@/components/core/MenuSubGroup'))
//   app.component('app-table', () => import('@/components/core/AppTable'))
//   app.component('app-date-picker', () => import('@/components/core/AppDatePicker'))
//   app.component('app-dialog', () => import('@/components/core/AppDialog'))
//   // app.use(vueQriously)
// }

export function registerComponents(app) {
  // Get all .vue files within `src/components/app`
  const requireComponent = require.context('@/components/core', true, /\.vue$/)

  for (const file of requireComponent.keys()) {
    const componentConfig = requireComponent(file)

    app.component(
      componentConfig.default.name,
      componentConfig.default || componentConfig
    )
  }
}
