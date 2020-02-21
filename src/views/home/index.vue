<template>
  <div>
    <v-card class="card-title">
      <v-card-title class="headline">Vuetify Table</v-card-title>
      <v-data-table
        :headers="vueHeaders"
        :items="desserts"
        disable-sort
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      ></v-data-table>
      <v-layout row class="pt-2">
        <v-flex class="flexCenter">
          <span class="amount">总数: {{count}}</span>
        </v-flex>
        <v-layout row>
          <v-flex class="flexCenter flexEnd">
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
            ></v-pagination>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card>
    <v-card class="card-title">
      <v-card-title class="headline">Handson Table</v-card-title>
      <hot-table>
        ref="hotTable"
        :settings="hotTableSettings"
      </hot-table>
    </v-card>
    <v-card class="card-title">
      <v-card-title class="headline">Ant Design Table</v-card-title>
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
      const vueHeaders = []
      headers.forEach(h => {
        vueHeaders.push({
          text: h,
          width: '120',
          value: 'name'
        })
      })
      const desserts = []
      for (let i = 0; i < count; i++) {
        desserts.push({
          name: 'ASSS(' + i + ')'
        })
      }
      return {
        vueHeaders: vueHeaders,
        desserts: desserts,
        page: 1,
        pageCount: 5,
        itemsPerPage: 2,
        count: count,
        showNumber: ['2', '4', '6', '10'],
        hotTableSettings: {
          headers: ['1', '2', '3'],
          rowHeaders: ['A', 'B', 'C'],
          colHeaders: ['D', 'F', 'W'],
          data: [[2, 3, 4], [4, 6, 7], [12, 32, 43]]
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

  .flexCenter {
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
    width: 60px;
  }
</style>
