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
              @keyup.enter="doSearch">
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
          <div @click="optionShow(record)">
            <v-menu bottom left class="option-menu">
              <v-btn slot="activator" icon>
                <v-icon style="color: #0055b8">more_vert</v-icon>
              </v-btn>
<!--              <v-list style="width:140px;border-radius:4px">-->
<!--                <v-list-tile-->
<!--                  v-for="(item, i) in items"-->
<!--                  :key="i"-->
<!--                  @click="todo(item.title,record,item.key)"-->
<!--                  v-if="item.status"-->
<!--                >-->
<!--                  <i :class="`actionBarIcon iconfont ${item.icon}`"></i>-->
<!--                  <v-list-tile-title class="actionBarText">{{ item.title }}</v-list-tile-title>-->
<!--                </v-list-tile>-->
<!--              </v-list>-->
            </v-menu>
          </div>
        </template>
      </app-table>
    </v-card>
  </div>
</template>

<script>
  import { getRightsList } from './api.js'

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
        })
      },
      optionShow(record) {
        // 操作按钮显示与否
      }
    },
    data() {
      return {
        tableData: [],
        loading: false,
        groupName: undefined,
        tableTotal: 0
      }
    },
    computed: {
      tableColumns: {
        // 因为表头要翻译,所以要放在computed中去计算值
        get() {
          return [
            {
              title: `${this.$t('rights.groupName')}`,
              width: 200,
              dataIndex: 'groupName'
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
              key: 'x',
              fixed: 'right',
              scopedSlots: { customRender: 'action' },
              width: 80,
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
