<template>
  <div>
    <a-table
      :columns="columns"
      :pagination="false"
      :locale="locale"
      :loading="loading"
      :dataSource="dataSource"
      :rowKey="rowKey"
    >
    </a-table>

    <v-row class="mr-24">
      <v-col class="flex-center">
        <span class="amount">{{$t('homePage.tableTotal')}}: {{total}}</span>
      </v-col>
      <v-row class="mr-24">
        <v-col class="flex-center flexEnd">
          <span class="everyPageShow">{{$t('homePage.tablePage')}}</span>
          <div class="showNumberBox">
            <v-select
              v-model="showPages"
              :items="showNumber"
              :label="showNumber[0]"
              single-line
            ></v-select>
          </div>
          <v-pagination
            v-model="pageIndex"
            :length="pageCount"
            :total-visible="5"
            style="padding-left: 20px"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'AppTable',
    data() {
      return {
        pageIndex: 1,
        pageCount: 10,
        showPages: 10,
        total: 0,
        showNumber: ['10', '30', '50', '100']
      }
    },
    created() {

    },
    props: {
      columns: {
        type: Array,
        default: () => ([])
      },
      loading: {
        type: Boolean,
        default: false
      },
      dataSource: {
        type: Array,
        default: () => ([])
      },
      rowKey: {
        type: String || Function,
        default: ''
      }
    },
    computed: {
      locale: {
        get() {
          return {
            emptyText: `${this.$t('homePage.emptyText')}`
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mr-24 {
    margin-left: 0px;
    margin-right: 0px;
  }

  .v-pagination {
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

  /deep/ .v-select__slot {
    max-width: none;
    width: auto;
  }

  /deep/ .v-select__selection--comma {
    overflow: visible;
  }

</style>
