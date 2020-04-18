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
      <a-table
        :columns="tableColumns"
        :pagination="false">

      </a-table>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'SettingsRights',
    methods: {
      doSearch() {

      }
    },
    data() {
      return {
        loading: false, // 加载中标识
        // 分页器所需参数
        tableParams: this.staticVal.tableParams,
        pagination: {},
        tableConfig: {
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
              width: 200,
              dataIndex: ''
            },
            {
              title: `${this.$t('rights.groupDesc')}`,
              width: 250,
              dataIndex: ''
            },
            {
              title: `${this.$t('rights.rightsCodes')}`,
              dataIndex: ''
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
