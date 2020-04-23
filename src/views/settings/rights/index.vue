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
      </app-table>
    </v-card>
  </div>
</template>

<script>
  import { getRightsList } from './api.js'

  export default {
    name: 'SettingsRights',
    created() {

    },
    mounted() {
      this.doSearch()
    },
    methods: {
      doSearch() {
        this.loading = true
        const params = {
          groupName: this.groupName
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
              dataIndex: 'rightsCode',
              scopedSlots: { customRender: 'rightsCodes' }
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
