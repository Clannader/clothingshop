/**
 * Create by CC on 2020/11/22
 */
'use strict'
import { useUtils } from '../utils'
import { useMeta } from './vue-meta'
import { useVuetify } from './vuetify'
import { registerComponents } from './components'
import './core/overrideObject'

export function registerPlugins(app) {
  registerComponents(app)
  useUtils(app)
  useMeta(app)
  useVuetify(app)
}
