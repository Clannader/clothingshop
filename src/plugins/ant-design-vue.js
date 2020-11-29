/**
 * Create by CC on 2020/11/29
 */
'use strict'

import 'ant-design-vue/dist/antd.min.css'
import { Spin, Table } from 'ant-design-vue'

export function useAntDesignVue(app) {
  app.component(Table.name, Table)
  app.component(Table.Column.name, Table.Column)
  app.component(Table.ColumnGroup.name, Table.ColumnGroup)
  // app.component(Upload.name, Upload)
  // app.component(Upload.Dragger.name, Upload.Dragger)
  app.component(Spin.name, Spin)
}
