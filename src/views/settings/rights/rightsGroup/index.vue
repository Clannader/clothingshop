<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <!-- 权限组名 -->
          <div class="group-item">
            <app-text-field
              :update-value.sync="queryParams.groupName"
              :label="$t('rights.searchName')"
              @changeValue="doSearch">
            </app-text-field>
          </div>
          <v-spacer></v-spacer>
          <!-- 按钮 -->
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
        :scroll="{ x:1000, y:tableY }"
        :rowClassName="rowClass"
        :pagination="false"
        :customRow= "rowClick"
        @doSearch="doSearch"
      >
        <template #groupDesc="{text}">
          <v-tooltip bottom>
            <template #activator="{ on }">
              <div v-on="on" class="text-ellipsis">
                {{text}}
              </div>
            </template>
            <div>{{text}}</div>
          </v-tooltip>
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
              <!-- 编辑按钮-->
              <v-list-item @click="openModify(record)">
                <i class="material-icons create"></i>
                <v-list-item-title>
                  {{$t('homePage.modify')}}
                </v-list-item-title>
              </v-list-item>

              <!-- 删除按钮-->
              <v-list-item @click="openDelete(record)">
                <i class="material-icons highlight_off"></i>
                <v-list-item-title>
                  {{$t('homePage.delete')}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </app-table>
    </v-card>

    <div class="card-bottom card-round-btn">
      <v-btn rounded @click="openCreate()">{{$t('homePage.create')}}</v-btn>
      <v-btn rounded @click="goBack()">{{$t('homePage.goback')}}</v-btn>
    </div>

    <component
      :is="children"
      :recordScheam="recordScheam"
      @closeDialog="closeDialog"
    ></component>
  </div>
</template>

<script>
  import { getRightsList, findRightsById } from './api.js'
  import RightsDetails from './components/RightsDetails'
  import RightsDeleteDialog from './components/RightsDeleteDialog'
  import tableInit from '@/mixins/table-init'

  export default {
    name: 'RightsGroup',
    mixins: [tableInit],
    methods: {
      doSearch() {
        this.loading = true
        // const rightsTable = this.$refs.rightsTable
        // let pageSize = 10 // 如果rightsTable是undefined的时候,使用默认值
        // let pageIndex = 1
        // if (rightsTable) {
        //   pageSize = rightsTable.showPages
        //   pageIndex = rightsTable.pageIndex
        // }
        // const params = {
        //   groupName: this.groupName,
        //   offset: pageIndex,
        //   pageSize: pageSize
        // }
        getRightsList(this.queryParams).then(result => {
          this.tableData = result.rights
          this.tableTotal = result.total
        }).catch(() => {
          this.tableData = []
          this.tableTotal = 0
        }).finally(() => {
          this.loading = false
          // 循环遍历看看搜索回来的数据是否还包含之前选中的数据,人如果不包含,则清空
          if (!this.tableData.find(v => this.isSelect.groupName === v.groupName)) {
            this.isSelect = {}
          }
        })
      },
      openModify(record) {
        // 编辑权限组
        findRightsById({ id: record._id }).then(result => {
          this.children = RightsDetails
          this.recordScheam = result.rights
        }).catch(() => {})
      },
      // 选中行Class
      rowClass(record/*, index*/) {
        if (record.groupName === this.isSelect.groupName) {
          return 'rowSelected'
        }
      },
      openDelete(record) {
        this.children = RightsDeleteDialog
        this.recordScheam = {
          _id: record._id,
          groupName: record.groupName
        }
      },
      openCreate() {
        this.children = RightsDetails
        this.recordScheam = {}
      },
      onResize() {
        this.tableY = window.innerHeight - 427 + 34 // 34 是分页的差额
      }
    },
    data() {
      return {
        queryParams: {
          groupName: undefined
        }
      }
    },
    computed: {
      tableColumns: {
        // 因为表头要翻译,所以要放在computed中去计算值
        get() {
          return [
            {
              title: `${this.$t('rights.groupName')}`,
              width: 150,
              fixed: 'left',
              dataIndex: 'groupName',
              isSelect: false
            },
            {
              title: `${this.$t('rights.groupDesc')}`,
              width: 250,
              dataIndex: 'desc',
              ellipsis: true,
              scopedSlots: { customRender: 'groupDesc' }
            },
            {
              title: `${this.$t('rights.rightsCodes')}`,
              ellipsis: true,
              dataIndex: 'rightsCode'
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
    width: 40.0%;
  }

  .card-search-btn {
    padding-top: 16px;
  }
</style>
