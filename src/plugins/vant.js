/**
 * Create by CC on 2020/11/27
 */
'use strict'

import { NoticeBar, PullRefresh, SwipeCell, Divider } from 'vant'
// import 'vant/lib/index.css'
// import '@vant/touch-emulator' // PC端不能加入这个,否则导致有问题

export function useVant(app) {
  app.component(NoticeBar.name, NoticeBar)
  app.component(PullRefresh.name, PullRefresh)
  app.component(SwipeCell.name, SwipeCell)
  app.component(Divider.name, Divider)
  // app.component(Tabbar.name, Tabbar)
  // app.component(TabbarItem.name, TabbarItem)
  // app.component(Icon.name, Icon)
}
