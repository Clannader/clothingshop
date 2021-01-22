<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <app-shop-text-field
              :shopId.sync="queryParams.shopId"
              @searchShopId="doSearch"
            ></app-shop-text-field>
          </div>
          <div class="group-item">
            <app-text-field
              :update-value.sync="queryParams.cond"
              :label="$t('users.searchCond')"
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
        :scroll="{ x:1000,y: tableY }"
        :rowClassName="rowClass"
        :customRow="rowClick"
        @change="doSearch"
        :offset.sync="offset"
        :pageSize.sync="pageSize"
      >
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

              <!-- 子集按钮 -->
              <v-list-item @click="openChildren(record)">
                <i class="material-icons list"></i>
                <v-list-item-title>
                  {{$t('systemConfig.subset')}}
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
      type="ONE"
      :recordScheam="recordScheam"
      @closeDialog="closeDialog"
    ></component>
  </div>
</template>

<script>
  import { getSystemGroup, getSystemInfo } from './api.js'
  import ConfigDetails from './components/ConfigDetails'
  import tableInit from '@/mixins/table-init'

  export default {
    name: 'SystemConfig',
    mixins: [tableInit],
    data() {
      const query = {
        cond: undefined,
        shopId: undefined,
        type: 'ONE'
      }
      return {
        queryParams: query,
        queryParamsCopy: query
      }
    },
    methods: {
      doSearch() {
        this.loading = true
        if (!this.publicMethods.compareObjects(this.queryParamsCopy, this.queryParams)) {
          this.offset = 1
        }
        getSystemGroup({
          ...this.queryParams,
          offset: this.offset,
          pageSize: this.pageSize
        }).then(result => {
          this.tableData = result.group
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
      openCreate() {
        this.children = ConfigDetails
        this.recordScheam = {}
      },
      openModify(record) {
        getSystemInfo({ id: record._id }).then(result => {
          console.log(result)
        }).catch(() => {})
      },
      openDelete() {
      },
      openChildren() {

      }
    },
    computed: {
      tableColumns: {
        // 因为表头要翻译,所以要放在computed中去计算值
        get() {
          return [
            {
              title: `${this.$t('systemConfig.shopId')}`,
              width: 150,
              dataIndex: 'shopId'
            },
            {
              title: `${this.$t('systemConfig.key')}`,
              width: 200,
              dataIndex: 'key'
            },
            {
              title: `${this.$t('systemConfig.value')}`,
              width: 250,
              ellipsis: true,
              dataIndex: 'value'
            },
            {
              title: `${this.$t('systemConfig.desc')}`,
              ellipsis: true,
              dataIndex: 'desc'
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
    width: 30.0%;
  }

  .card-search-btn {
    padding-top: 16px;
  }
</style>
