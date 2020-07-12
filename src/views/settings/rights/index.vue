<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <!-- 权限组名 -->
          <div class="group-item">
            <v-text-field
              v-model="groupName"
              :label="$t('rights.searchName')"
              @keyup.enter="initDoSearh">
            </v-text-field>
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

    <v-card class="card-body">
      <app-table
        :columns="tableColumns"
        :dataSource="tableData"
        :rowKey="record => record._id"
        :loading="loading"
        :total="tableTotal"
        :scroll="{ x:1000,y: 400 }"
        :rowClassName="rowClass"
        :customRow= "rowClick"
        @change="doSearch"
        ref="rightsTable"
      >
        <template slot="groupDesc" slot-scope="{record}">
          <v-tooltip bottom>
            <template v-slot:activator="{ on : tip }">
              <div v-on="tip" class="text-ellipsis">
                {{record}}
              </div>
            </template>
            <div>{{record}}</div>
          </v-tooltip>
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

    <component
      :is="children"
      :recordId="recordId"
      @closeDialog="closeDialog"
    ></component>
  </div>
</template>

<script>
  import { getRightsList } from './api.js'
  import RightsDetails from './components/RightsDetails'
  import RightsDeleteDialog from './components/RightsDeleteDialog'

  export default {
    name: 'SettingsRights',
    created() {
      // 定义表格属性加上ref,为了获取封装后的表格的页码,和条数
      this.doSearch()
    },
    mounted() {
      // 初始化不放在这里,始终感觉不是很好的感觉
    },
    methods: {
      doSearch() {
        this.loading = true
        const rightsTable = this.$refs.rightsTable
        let pageSize = 10 // 如果rightsTable是undefined的时候,使用默认值
        let pageIndex = 1
        if (rightsTable) {
          pageSize = rightsTable.showPages
          pageIndex = rightsTable.pageIndex
        }
        const params = {
          groupName: this.groupName,
          offset: pageIndex,
          pageSize: pageSize
        }
        getRightsList(params).then(result => {
          this.tableData = result.rights
          this.tableTotal = this.tableData.length
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
        this.children = RightsDetails
        this.recordId = record._id
      },
      initDoSearh() {
        this.pageIndex = 1
        this.doSearch()
      },
      // 选中行Class
      rowClass(record/*, index*/) {
        if (record.groupName === this.isSelect.groupName) {
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
        // this.tableColumns[0].isSelect = !this.tableColumns[0].isSelect
      },
      openDelete(record) {
        this.children = RightsDeleteDialog
        this.recordId = record._id
      },
      goBack() {
        this.$router.back(-1)
      },
      openCreate() {
        this.children = RightsDetails
        this.recordId = ''
      },
      closeDialog() {
        this.children = ''
      }
    },
    data() {
      return {
        tableData: [],
        loading: false,
        groupName: undefined,
        tableTotal: 0,
        children: '',
        recordId: undefined,
        isSelect: {} // 点击选中时,获取当前记录的json
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
