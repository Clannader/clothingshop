<template>
  <div>
    <v-card class="card-title">
      <v-card-title class="headline">Vuetify Table</v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="vueHeaders"
        :items="vueDesserts"
        disable-sort
        :page.sync="page"
        :items-per-page="Number(itemsPerPage)"
        hide-default-footer
        class="mr-24"
        show-select
        fixed-header
        item-key="register"
        :mobile-breakpoint="0"
        @page-count="pageCount = $event"
      ></v-data-table>
      <v-row class="mr-24">
        <v-col class="flex-center">
          <span class="amount">总数: {{vueDesserts.length}}</span>
        </v-col>
        <v-row class="mr-24">
          <v-col class="flex-center flexEnd">
            <span class="everyPageShow">每页总数</span>
            <div class="showNumberBox">
              <v-select
                v-model="itemsPerPage"
                :items="showNumber"
                :label="showNumber[0]"
                single-line
              ></v-select>
            </div>
            <v-pagination
              v-model="page"
              :length="pageCount"
              :total-visible="7"
              style="padding-left: 20px"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-row>
    </v-card>
    <v-card class="card-title">
      <v-card-title class="headline">Handson Table</v-card-title>
      <v-divider></v-divider>
      <hot-table
        ref="hotTable"
        :settings="hotTableSettings">
      </hot-table>
      <v-card-actions class="app-btn">
        <v-spacer></v-spacer>
        <v-btn @click="getData">测试获取选中数据</v-btn>
      </v-card-actions>
      <v-row>
        <v-col>
          <v-textarea
            v-model="tableResult"
            label="表格单元格数据"
          ></v-textarea>
        </v-col>
        <v-col>
          <v-textarea
            v-model="sourceResult"
            label="原始JSON数据"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="card-title">
      <v-card-title class="headline">Handson Table</v-card-title>
      <v-divider></v-divider>
      <hot-table
        ref="handsonTable">
      </hot-table>
    </v-card>
    <v-card class="card-title">
      <v-card-title class="headline">Ant Design Table</v-card-title>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
  import { HotTable } from '@handsontable/vue'
  import Handsontable from 'handsontable'
  import moment from 'moment'

  export default {
    name: 'Home',
    components: {
      HotTable
    },
    data() {
      return {
        vueHeaders: this.getVueHeaders(),
        vueDesserts: this.getVueDesserts(),
        page: 1,
        pageCount: 10,
        itemsPerPage: 10,
        showNumber: ['10', '20', '40', '100'],
        hotTableSettings: this.getHotTableSettings(),
        tableResult: '',
        sourceResult: ''
      }
    },
    created() {
      Handsontable.renderers.registerRenderer('cellsRenderer', this.cellsRenderer)
    },
    methods: {
      getVueHeaders() {
        const vueHeaders = []
        vueHeaders.push({
          text: '预订号',
          value: 'register'
        })
        vueHeaders.push({
          text: '房间号',
          width: 100,
          value: 'roomNumber'
        })
        vueHeaders.push({
          text: '房间数',
          width: 100,
          value: 'rooms'
        })
        vueHeaders.push({
          text: '客人名',
          value: 'guestName'
        })
        vueHeaders.push({
          text: '到店日期',
          width: 120,
          value: 'arrivalDate'
        })
        vueHeaders.push({
          text: '离店日期',
          width: 120,
          value: 'departureDate'
        })
        vueHeaders.push({
          text: '档案号',
          value: 'profileNumber'
        })
        vueHeaders.push({
          text: '预订状态',
          value: 'status'
        })
        vueHeaders.push({
          text: '房价',
          value: 'roomPrice'
        })
        vueHeaders.push({
          text: '房价码',
          width: 100,
          value: 'rateCode'
        })
        return vueHeaders
      },
      getVueDesserts() {
        const vueDesserts = []
        const num = 250
        for (let i = 0; i < num; i++) {
          vueDesserts.push(this.getVueTempData(i))
        }
        return vueDesserts
      },
      getVueTempData(num) {
        const arr = moment().add(num, 'days')
        return {
          register: '123456' + num,
          roomNumber: '00' + (num + 1),
          rooms: (num % 2 === 0 ? 1 : 2),
          guestName: 'Rabbit' + num,
          arrivalDate: arr.format('YYYY-MM-DD'),
          departureDate: arr.add(1, 'days').format('YYYY-MM-DD'),
          profileNumber: '325341' + num * 2,
          status: 'CheckIn',
          roomPrice: '780',
          rateCode: 'DFG'
        }
      },
      getHotDesserts() {
        const hotDesserts = []
        const num = 10
        for (let i = 0; i < num; i++) {
          const arr = []
          for (let j = 0; j < num; j++) {
            arr.push(this.getVueTempData(j))
          }
          hotDesserts.push(arr)
        }
        return hotDesserts
      },
      getHotTableSettings() {
        return {
          editor: false, // 禁用编辑表格
          fillHandle: false, // 禁用拖拽复制+复制替换表格
          copyable: false, // 不可复制
          // enterMoves: false,
          beforeKeyDown: this.beforeKeyDown, // 禁用按钮事件
          data: this.getHotDesserts(),
          // fixedRowsTop: 3, // 固定前3行
          // fixedColumnsLeft: 3, // 固定左侧3列
          outsideClickDeselects: false, // 设置false才能获取单元格
          cells: this.getCells,
          width: 1200,
          height: 300,
          // autoColumnSize: true,
          // rowHeaders: true,
          // colHeaders: true,
          // renderAllRows: true,
          colWidths: 150,
          // dataSchema: {
          //   register: null,
          //   roomNumber: null,
          //   rooms: null,
          //   guestName: null,
          //   arrivalDate: null,
          //   departureDate: null,
          //   profileNumber: null,
          //   status: null,
          //   roomPrice: null,
          //   rateCode: null
          // },
          colHeaders: this.getColHeaders(),
          // rowHeaderWidth: '150',
          // rowHeights: '48',
          // tableClassName: ['v-data-table__wrapper', 'v-data-table'],
          rowHeaders: this.getRowHeaders()
          // columns: [{
          //   data: 'register'
          // }]
        }
      },
      beforeKeyDown(e) {
        // 禁用delete和enter键的事件
        if (e.keyCode === 8 || e.keyCode === 46) {
          Handsontable.dom.stopImmediatePropagation(e)
        }
      },
      getData() {
        const hot = this.$refs.hotTable.hotInstance // 获取表格实例
        const selectedData = hot.getSelected()
        let tableResult = ''
        let sourceResult = ''
        if (selectedData) { // 判断用户是否选中,如果未选中,则返回undefined
          tableResult = JSON.stringify(hot.getData.apply(this, selectedData[0]))
          sourceResult = JSON.stringify(hot.getSourceData.apply(this, selectedData[0]))
        }
        // 格式化数据,通过getData获取区域的数据数组
        this.tableResult = tableResult
        this.sourceResult = sourceResult
      },
      getCells(/* row, col, prop */) {
        var cellProperties = {}
        // if (row === 0 && col === 0) {
        //   cellProperties.readOnly = true
        // }
        // console.log(row + '|' + col + '|' + prop)
        cellProperties.renderer = 'cellsRenderer'
        return cellProperties
      },
      getColHeaders() {
        const arr = []
        this.getVueHeaders().forEach(v => {
          arr.push(v.text)
        })
        return arr
      },
      cellsRenderer(instance, td, row, col, prop, value, cellProperties) {
        // console.log(JSON.stringify(value))
        // td.style = 'color: blue'
        // console.log(td)
        // td.style.width = '300px'
        // console.log(value)
        td.innerHTML = this.getTD(value)
        // td.innerHTML = '<slot />'
        // console.log(prop) // JSON是属性值
        // console.log(cellProperties)
        return td
      },
      getTD(data) {
        let s = ''
        for (const key in data) {
          s += data[key] + '<br>'
        }
        return s
      },
      getRowHeaders() {
        return [
          'AAA',
          'BBB',
          'CCC',
          'DDD',
          'EEE',
          'FFF',
          'GGG',
          'HHH',
          'JJJ',
          'KKK',
          'LLL'
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-title {
    margin: 16px;
  }

  .card-container {
    padding: 8px 24px;
  }

  .form-group {
    display: flex;
  }

  .mr-24{
    margin-left: 0px;
    margin-right: 0px;
  }

  .v-pagination{
    width: auto;
  }

  .flex-center {
    display: flex;
    align-items: center;
  }

  .amount {
    font-size: 12px;
    line-height: 12px;
    color: #555;
  }

  .flexEnd {
    justify-content: flex-end;
  }

  .everyPageShow {
    font-size: 12px;
    letter-spacing: 0.38px;
    line-height: 12px;
    color: #757575;
    padding-right: 20px;
  }

  .showNumberBox {
    display: inline-block;
    width: 40px;
  }

  /deep/ .v-select__slot{
    max-width: none;
    width: auto;
  }

  /deep/ .v-select__selection--comma{
    overflow: visible;
  }

  /deep/ .v-data-table__wrapper{
    max-height: 300px;
  }

  /deep/ .handsontable {
    tbody tr th{
      background-color: #fff;
      color: rgba(0,0,0,.6);
      font-weight: bold;
      /*display:flex;*/
      /*justify-content: center;*/
      &.ht__highlight{
        background-color: $bg-blue;
        color: #fff;
      }
      &.relative{
        /*text-align: center;*/
        /*span{*/
        /*  text-align: center;*/
        /*}*/
      }
    }

    thead th{
      color: rgba(0,0,0,.6);
      font-weight: bold;
      .relative{
        background: #fff;
      }
      &.ht__highlight{
        .relative{
          color: #fff;
          background: $bg-blue;
        }
      }
    }
  }
</style>
