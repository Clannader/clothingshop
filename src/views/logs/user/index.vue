<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <app-date-picker
              :label="$t('logs.startDate')"
              :max="endDate"
              :update-value.sync="startDate"
              :close-on-content-click="false"
              readonly
              clearable
            ></app-date-picker>
          </div>
          <div class="group-item">
            <app-time-picker
              :label="$t('logs.startTime')"
              :max="endTime"
              :update-value.sync="startTime"
              :close-on-content-click="false"
              use-seconds
            ></app-time-picker>
          </div>
          <div class="group-item">
            <app-date-picker
              :label="$t('logs.endDate')"
              :min="startDate"
              :update-value.sync="endDate"
              :close-on-content-click="false"
              readonly
              clearable
            ></app-date-picker>
          </div>
          <div class="group-item">
            <app-time-picker
              :label="$t('logs.endTime')"
              :min="startTime"
              :update-value.sync="endTime"
              :close-on-content-click="false"
              use-seconds
            ></app-time-picker>
          </div>
        </div>
        <div class="form-group">
          <div class="group-item">
            <app-select
              :update-value.sync="queryParams.type"
              :items="logTypeItem"
              :label="$t('logs.logType')"
              @changeValue="doSearch"
              custom-item
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
        @change="changeData"
        @doSearch="doSearch"
        :offset.sync="offset"
        :pageSize.sync="pageSize"
      >
        <template #logDate="{text}">
          <div class="text-ellipsis">
            {{text.format('YYYY-MM-DD HH:mm:ss.SSS')}}
          </div>
        </template>

        <template #action="{record}">
          <v-menu
            bottom
            left
            transition="slide-y-transition"
          >
            <template #activator="{ on }">
              <v-btn
                v-on="on"
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
  import tableInit from '@/mixins/table-init'

  export default {
    name: 'UserLogs',
    mixins: [tableInit],
    data() {
      const query = {
        cond: undefined,
        type: 'ALL'
      }
      return {
        queryParams: query,
        queryParamsCopy: query,
        sortOrder: undefined,
        startTime: undefined,
        endTime: undefined,
        startDate: undefined,
        endDate: undefined,
        // pageSize: 30,
        sortField: ['date'] // 这里很尴尬,排序的时候,清除排序那次点击并不知道那一列是客户端排序还是服务器的
        // 所以这里标示一下,哪些字段是服务器排序的
      }
    },
    methods: {
      doSearch() {
        this.queryParams.startDate = this.startTotal
        this.queryParams.endDate = this.endTotal
        this.loading = true
        if (!this.publicMethods.compareObjects(this.queryParamsCopy, this.queryParams)) {
          this.offset = 1
        }
        queryUserLog({
          ...this.queryParams,
          offset: this.offset,
          pageSize: this.pageSize,
          sortOrder: this.sortOrder
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
      onResize() {
        this.tableY = window.innerHeight - 427 - 70
      },
      viewLogs() {
        this.children = UserLogView
      },
      changeData(pagination, filters, sorter) {
        // 可以获取当前分页数,过滤条件,排序条件内容,这里进行的是服务器端排序
        if (this.sortField.includes(sorter.field)) {
          if (sorter.order) {
            this.sortOrder = {
              sort: sorter.field,
              order: sorter.order === 'descend' ? 'desc' : 'asc'
            }
          } else {
            this.sortOrder = undefined
          }
          this.doSearch()
        }
      },
      getDatetime(date, time, isEnd) {
        let temp
        if (!this.publicMethods.isEmpty(date)) {
          if (!this.publicMethods.isEmpty(time)) {
            temp = new Date(date + ' ' + time).toISOString()
          } else {
            temp = new Date(date + ' ' + (isEnd ? '23:59:59' : '00:00:00')).toISOString()
          }
        }
        return temp
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
              scopedSlots: { customRender: 'logDate' },
              // sorter: (a, b) => this.publicMethods.tableSort(a.date, b.date) // 客户端排序
              sorter: true // 服务器排序
            },
            {
              title: `${this.$t('logs.logType')}`,
              dataIndex: 'type',
              width: 120,
              sorter: (a, b) => this.publicMethods.tableSort(a.type, b.type)
              // sortOrder: 'ascend' // descend, ascend 默认初始化排序
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
      },
      startTotal: {
        get() {
          return this.getDatetime(this.startDate, this.startTime, false)
        }
      },
      endTotal: {
        get() {
          return this.getDatetime(this.endDate, this.endTime, true)
        }
      }
    },
    watch: {

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
