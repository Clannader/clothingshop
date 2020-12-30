/**
 * Create by CC on 2020/11/22
 */

'use strict'
import { useUtils } from '../utils'
import { useMeta } from './vue-meta'
import { useVant } from './vant'
import { useVuetify } from './vuetify'
import { useAntDesignVue } from './ant-design-vue'
import { registerComponents } from './components'
import * as directives from '../directives'
import './core/overrideObject'

export function registerPlugins(app) {
  registerComponents(app)
  useUtils(app)
  useMeta(app)
  useVant(app)
  useVuetify(app)
  useAntDesignVue(app)

  for (const name in directives) {
    const directive = directives[name]
    app.directive(name, directive)
  }
}
