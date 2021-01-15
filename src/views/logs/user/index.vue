<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
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
          <div class="group-item">
            <app-select
              :update-value.sync="queryParams.type"
              :items="logTypeItem"
              :label="$t('logs.logType')"
              @changeValue="doSearch"
            >
            </app-select>
          </div>
          <div class="group-item">
            <app-text-field
              :update-value.sync="queryParams.cond"
              :label="$t('users.searchCond')"
              @changeValue="doSearch">
            </app-text-field>
          </div>
        </div>
        <div class="form-group">
          <div class="group-item">
            <app-shop-text-field
              :shopId.sync="queryParams.shopId"
              @searchShopId="doSearch">
            </app-shop-text-field>
          </div>
          <div class="group-item">
            <app-text-field
              :update-value.sync="queryParams.adminId"
              :label="$t('logs.queryUserID')"
              @changeValue="doSearch">
            </app-text-field>
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
        <template #logDate="{record}">
          <div class="text-ellipsis">
            {{record.format('YYYY-MM-DD HH:mm:ss')}}
          </div>
        </template>

        <template #action="{record}">
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

    <component
      :is="children"
      :userLogObject="isSelect"
      @closeDialog="closeDialog"
    ></component>
  </div>
</template>

<script>
  import { queryUserLog } from './api'
  import UserLogView from './components/UserLogView'

  export default {
    name: 'UserLogs',
    data() {
      const query = {
        cond: undefined,
        startDate: undefined,
        endDate: undefined,
        type: 'ALL'
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
      this.$nextTick(() => {
        this.doSearch()
      })
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
      goBack() {
        this.$router.back(-1)
      },
      onResize() {
        this.tableY = window.innerHeight - 427 - 70
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
      viewLogs() {
        this.children = UserLogView
      },
      closeDialog() {
        this.children = ''
        this.doSearch()
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
      },
      logTypeItem: {
        get() {
          return [{
            code: 'ALL',
            desc: `${this.$t('logs.allType')}`
          }, {
            code: 'ServerLog',
            desc: `${this.$t('logs.serverType')}`
          }, {
            code: 'Right',
            desc: `${this.$t('logs.rightType')}`
          }, {
            code: 'User',
            desc: `${this.$t('logs.userType')}`
          }]
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
