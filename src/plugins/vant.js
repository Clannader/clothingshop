/**
 * Create by CC on 2020/11/27
 */
'use strict'

import Vant from 'vant'
import 'vant/lib/index.css'
import '@vant/touch-emulator'

export function useVant(app) {
  app.use(Vant)
}
