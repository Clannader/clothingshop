<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <app-shop-text-field></app-shop-text-field>
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

    <div class="card-bottom card-round-btn">
      <v-btn rounded @click="openCreate()">{{$t('homePage.create')}}</v-btn>
      <v-btn rounded @click="goBack()">{{$t('homePage.goback')}}</v-btn>
    </div>
  </div>
</template>

<script>
  import { getSystemGroup } from './api.js'

  export default {
    name: 'SystemConfig',
    data() {
      return {
        tableData: [],
        tableY: 230,
        loading: false,
        queryParams: {

        },
        tableTotal: 0,
        children: '',
        recordScheam: undefined,
        isSelect: {}
      }
    },
    created() {
      this.doSearch()
    },
    methods: {
      doSearch() {
        this.loading = true
        getSystemGroup(this.queryParams).then(result => {
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
        })
      },
      goBack() {
        this.$router.back(-1)
      },
      openCreate() {
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
