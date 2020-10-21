<template>
  <app-dialog
    :visible="true"
    :title="$t('rights.selectGroup')"
    v-resize="onResize"
  >
    <template slot="dialogContent">
      <div class="pd-lr-12 form-group">
        <div class="group-item" :title="rightsCode.join(',')">
          <v-text-field
            v-model="rightsCode"
            :label="$t('rights.selectedRightsCodes')"
            disabled
          >
          </v-text-field>
        </div>
        <v-spacer></v-spacer>
        <div class="card-search-btn">
          <v-btn rounded dark @click="doSearch()">
            {{$t('homePage.search')}}
          </v-btn>
        </div>
      </div>
      <app-table
        :columns="tableColumns"
        :dataSource="tableData"
        :rowKey="record => record.code"
        :loading="loading"
        :total="tableTotal"
        :scroll="{ x:300, y: tableY }"
        :pagination="false"
        @change="doSearch"
        :row-selection="{ selectedRowKeys: rightsCode, onChange: onSelectChange }"
      >
      </app-table>
    </template>
    <template slot="dialogBtn">
      <v-btn depressed @click="action()">{{$t('homePage.confirm')}}</v-btn>
      <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
    </template>
  </app-dialog>
</template>

<script>
  import { getRightsCode } from '../api'

  export default {
    name: 'RightsSelectDialog',
    data() {
      return {
        rightsCode: [],
        tableData: [],
        loading: false,
        tableTotal: 0,
        tableY: 230
      }
    },
    props: {
      rightsCodeParams: {
        type: String,
        default: ''
      }
    },
    created() {
      this.rightsCode = this.publicMethods.isEmpty(this.rightsCodeParams)
        ? [] : this.rightsCodeParams.split(',')
      this.doSearch()
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      },
      action() {
        this.$emit('closeDialog', this.rightsCode.join(','))
      },
      doSearch() {
        this.loading = true
        getRightsCode({}).then(res => {
          this.tableData = res.rightsCode
          this.tableTotal = res.rightsCode.length
        }).catch(() => {
          this.tableData = []
          this.tableTotal = 0
        }).finally(() => {
          this.loading = false
        })
      },
      onResize() {
        this.tableY = window.innerHeight - 330
      },
      onSelectChange(selectedRowKeys/*, selectedRows*/) {
        this.rightsCode = selectedRowKeys
      }
    },
    computed: {
      tableColumns: {
        // 因为表头要翻译,所以要放在computed中去计算值
        get() {
          return [
            {
              title: `${this.$t('rights.rightsCodes')}`,
              width: 150,
              dataIndex: 'code'
            },
            {
              title: `${this.$t('rights.groupDesc')}`,
              dataIndex: 'desc'
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .group-item {
    width: 80.0%;
  }

  .card-search-btn {
    padding-top: 16px;
  }

  .pd-lr-12 {
    padding-right: 12px;
    padding-left: 12px;
  }
</style>
