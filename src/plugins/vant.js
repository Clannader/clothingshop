/**
 * Create by CC on 2020/11/27
 */
'use strict'

import Vant from 'vant'
import 'vant/lib/index.css'
// import '@vant/touch-emulator' // PC端不能加入这个,否则导致有问题

export function useVant(app) {
  app.use(Vant)
}
