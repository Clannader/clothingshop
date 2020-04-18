<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <!-- 权限组名 -->
          <div class="group-item">
            <v-text-field
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
      >
      </app-table>
    </v-card>
  </div>
</template>

<script>
  import { getRightsList } from './api.js'

  export default {
    name: 'SettingsRights',
    created() {
      this.doSearch()
    },
    methods: {
      doSearch() {
        this.loading = true
        getRightsList({}).then(result => {
          this.tableData = result.rights
          this.loading = false
        })
      }
    },
    data() {
      return {
        tableData: [],
        loading: false
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
              dataIndex: 'desc'
            },
            {
              title: `${this.$t('rights.rightsCodes')}`,
              dataIndex: 'rightsCode'
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
