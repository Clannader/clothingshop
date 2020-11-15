<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <v-text-field
              v-model="queryParams.cond"
              :label="$t('users.searchCond')"
              @keyup.enter="doSearch">
            </v-text-field>
          </div>
          <div class="group-item">
            <app-date-picker
              :label="$t('logs.startDate')"
              :max="queryParams.endDate"
              :update-value.sync="queryParams.startDate"
              :close-on-content-click="false"
              readonly
              clearable
            ></app-date-picker>
          </div>
          <div class="group-item">
            <app-date-picker
              :label="$t('logs.endDate')"
              :min="queryParams.startDate"
              :update-value.sync="queryParams.endDate"
              :close-on-content-click="false"
              readonly
              clearable
            ></app-date-picker>
          </div>
          <v-spacer></v-spacer>
          <div class="card-search-btn">
            <v-btn rounded dark @click="doSearch()">
              {{$t('homePage.search')}}
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-card>

    <v-card
      class="card-body"
      v-resize="onResize"
    >
      <app-table
        :columns="tableColumns"
        :dataSource="tableData"
        :rowKey="record => record._id"
        :loading="loading"
        :total="tableTotal"
        :scroll="{ x:1000,y: tableY }"
        :rowClassName="rowClass"
        :customRow="rowClick"
        @change="doSearch"
        :offset.sync="offset"
        :pageSize.sync="pageSize"
      >
        <template slot="logDate" slot-scope="{record}">
          <div class="text-ellipsis">
            {{record.format('YYYY-MM-DD HH:mm:ss')}}
          </div>
        </template>

        <template slot="action" slot-scope="{record}">
          <v-menu
            bottom
            left
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on: menu }">
              <v-btn
                v-on="menu"
                icon
                small
                @click="selectedRow(record)"
              >
                <v-icon
                  style="color: #0055b8"
                >
                  more_vert
                </v-icon>
              </v-btn>
            </template>
            <v-list class="option-menu-list">
              <!-- 查看按钮-->
              <v-list-item @click="viewLogs(record)">
                <i class="material-icons remove_red_eye"></i>
                <v-list-item-title>
                  {{$t('logs.view')}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </app-table>
    </v-card>

    <div class="card-bottom card-round-btn">
      <v-btn rounded @click="goBack()">{{$t('homePage.goback')}}</v-btn>
    </div>
  </div>
</template>

<script>
  import { queryUserLog } from './api'

  export default {
    name: 'UserLogs',
    data() {
      const query = {
        cond: undefined,
        startDate: undefined,
        endDate: undefined
      }
      return {
        tableData: [],
        tableY: 230,
        offset: 1,
        pageSize: 10,
        loading: false,
        queryParams: query,
        queryParamsCopy: query,
        tableTotal: 0,
        children: '',
        isSelect: {}
      }
    },
    created() {
      this.doSearch()
    },
    methods: {
      doSearch() {
        this.loading = true
        if (!this.publicMethods.compareObjects(this.queryParamsCopy, this.queryParams)) {
          this.offset = 1
        }
        queryUserLog({
          ...this.queryParams,
          offset: this.offset,
          pageSize: this.pageSize
        }).then(result => {
          this.tableData = result.logs
          this.tableTotal = result.total
        }).catch(() => {
          this.tableData = []
          this.tableTotal = 0
        }).finally(() => {
          this.loading = false
          if (!this.tableData.find(v => this.isSelect._id === v._id)) {
            this.isSelect = {}
          }
          this.queryParamsCopy = Object.assign({}, this.queryParams)
        })
      },
      initDoSearh() {
        // const userLogsTable = this.$refs.userLogsTable
        // if (userLogsTable) {
          // 这里的返回第一页还需要思考,因为数据不是很多,很多情况没办法测
          // 这里的要检测条件和上次有改变时返回第一页,否则出现有总数,但是没有数据返回的情况
          // userLogsTable.pageIndex = 1
        // }
        // this.offset = 1
        // this.doSearch()
      },
      goBack() {
        this.$router.back(-1)
      },
      onResize() {
        this.tableY = window.innerHeight - 427
      },
      rowClass(record) {
        if (record._id === this.isSelect._id) {
          return 'rowSelected'
        }
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
              this.viewLogs(record)
            }
          }
        }
      },
      selectedRow(record) {
        this.isSelect = record
      },
      viewLogs(record) {

      }
    },
    computed: {
      tableColumns: {
        // 因为表头要翻译,所以要放在computed中去计算值
        get() {
          return [
            {
              title: `${this.$t('users.shopId')}`,
              width: 100,
              dataIndex: 'shopId'
            },
            {
              title: `${this.$t('users.adminName')}`,
              width: 150,
              dataIndex: 'userName'
            },
            {
              title: `${this.$t('logs.contents')}`,
              ellipsis: true,
              // width: 300,
              dataIndex: 'content'
            },
            {
              title: `${this.$t('logs.date')}`,
              dataIndex: 'date',
              width: 180,
              scopedSlots: { customRender: 'logDate' }
            },
            {
              title: `${this.$t('logs.logType')}`,
              dataIndex: 'type',
              width: 120
            },
            {
              title: `${this.$t('logs.requestIP')}`,
              dataIndex: 'requestIP',
              width: 120
            },
            {
              title: `${this.$t('homePage.operation')}`,
              dataIndex: '',
              key: 'action',
              fixed: 'right',
              scopedSlots: { customRender: 'action' },
              width: 60,
              align: 'center'
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .group-item {
    padding-right: 24px;
    width: 25.0%;
  }

  .card-search-btn {
    padding-top: 16px;
  }
</style>
