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
  import moment from 'moment'

  export default {
    name: 'Home',
    components: {
      HotTable
    },
    data() {
      // 构造数据
      const headers = []
      const count = 20
      for (let i = 0; i < count; i++) {
        headers.push(moment().add(i, 'days').format('YYYY-MM-DD'))
      }
      const letter = ['A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J']
      const body = []
      let num = 1
      for (let i = 0; i < count; i++) {
        const data = []
        data.push(letter[i] + letter[i] + letter[i])
        for (let j = 0; j < count - 1; j++) {
          data.push(num++)
        }
        body.push(data)
      }

      return {
        vueHeaders: this.getVueHeaders(),
        vueDesserts: this.getVueDesserts(),
        page: 1,
        pageCount: 10,
        itemsPerPage: 10,
        showNumber: ['10', '20', '40', '100'],
        hotTableSettings: {
          headers: ['1', '2', '3'],
          rowHeaders: ['A', 'B', 'C'],
          colHeaders: ['D', 'F', 'W'],
          data: [[2, 3, 4], [4, 6, 7], [12, 32, 43]]
        }
      }
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
        const num = 300
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
</style>
