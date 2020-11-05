<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <v-text-field
              v-model="cond"
              :label="$t('users.searchCond')"
              @keyup.enter="initDoSearh">
            </v-text-field>
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
        ref="usersTable"
      >
        <template slot="adminType" slot-scope="{record}">
          <div class="text-ellipsis">
            {{getAdminTypeLabel(record)}}
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
  </div>
</template>

<script>
  import { getUsersList } from './api'

  export default {
    name: 'SettingsUsers',
    data() {
      return {
        tableData: [],
        loading: false,
        cond: undefined,
        tableTotal: 0,
        children: '',
        tableY: 230,
        isSelect: {}
      }
    },
    created() {
      this.doSearch()
    },
    methods: {
      doSearch() {
        this.loading = true
        const usersTable = this.$refs.usersTable
        let pageSize = 10
        let pageIndex = 1
        if (usersTable) {
          pageSize = usersTable.showPages
          pageIndex = usersTable.pageIndex
        }
        const params = {
          cond: this.cond,
          offset: pageIndex,
          pageSize: pageSize
        }
        getUsersList(params).then(result => {
          this.tableData = result.users
          this.tableTotal = result.total
        }).catch(() => {
          this.tableData = []
          this.tableTotal = 0
        }).finally(() => {
          this.loading = false
          if (!this.tableData.find(v => this.isSelect._id === v._id)) {
            this.isSelect = {}
          }
        })
      },
      goBack() {
        this.$router.back(-1)
      },
      openCreate() {

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
              this.openModify(record)
            }
          }
        }
      },
      selectedRow(record) {
        this.isSelect = record
      },
      openDelete(record) {

      },
      initDoSearh() {
        const usersTable = this.$refs.usersTable
        if (usersTable) {
          usersTable.pageIndex = 1
        }
        this.doSearch()
      },
      openModify(record) {

      },
      getAdminTypeLabel(type) {
        switch (type) {
          case '3RD':
            return this.$t('users.RD_Type')
          case 'SYSTEM':
            return this.$t('users.SYSTEM_Type')
          case 'NORMAL':
            return this.$t('users.NORMAL_Type')
        }
      }
    },
    computed: {
      tableColumns: {
        // 因为表头要翻译,所以要放在computed中去计算值
        get() {
          return [
            {
              title: `${this.$t('users.shopId')}`,
              width: 150,
              dataIndex: 'shopId'
            },
            {
              title: `${this.$t('users.adminId')}`,
              width: 150,
              dataIndex: 'adminId'
            },
            {
              title: `${this.$t('users.adminName')}`,
              width: 150,
              dataIndex: 'adminName'
            },
            {
              title: `${this.$t('users.rights')}`,
              ellipsis: true,
              dataIndex: 'rights'
            },
            {
              title: `${this.$t('users.adminType')}`,
              width: 100,
              dataIndex: 'adminType',
              scopedSlots: { customRender: 'adminType' }
            },
            {
              title: `${this.$t('users.email')}`,
              dataIndex: 'email'
            },
            {
              title: `${this.$t('users.supplierCode')}`,
              ellipsis: true,
              dataIndex: 'supplierCode'
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
    width: 70.0%;
  }

  .card-search-btn {
    padding-top: 16px;
  }
</style>
