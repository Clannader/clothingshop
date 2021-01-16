/**
 * Create by CC on 2021/1/16
 */
'use strict'

export default {
  name: 'table-init',
  created() {
    // 定义表格属性加上ref,为了获取封装后的表格的页码,和条数
    this.$nextTick(() => {
      this.doSearch()
    })
  },
  methods: {
    onResize() {
      this.tableY = window.innerHeight - 427
    },
    closeDialog() {
      this.children = ''
      this.doSearch()
    },
    // 选中行Class
    rowClass(record/*, index*/) {
      if (record._id === this.isSelect._id) {
        return 'rowSelected'
      }
    },
    goBack() {
      this.$router.back(-1)
    },
    selectedRow(record) {
      this.isSelect = record
    },
    rowClick(record/*, index 表格的下标,可以点击时获取点击的是第几行*/) {
      return {
        on: {
          click: () => {
            // 行单击事件
            this.selectedRow(record)
          },
          dblclick: () => {
            // 行双击事件
            this.openModify(record)
          }
        }
      }
    },
    openModify() {},
    doSearch() {}
  },
  data() {
    return {
      tableData: [],
      tableY: 230,
      loading: false,
      tableTotal: 0,
      children: '',
      recordScheam: undefined,
      offset: 1,
      pageSize: 10,
      isSelect: {} // 点击选中时,获取当前记录的json
    }
  }
}
