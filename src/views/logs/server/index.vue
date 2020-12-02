<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <v-text-field
              v-model="searchCond"
              :label="$t('users.searchCond')"
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
      </v-container>
    </v-card>

    <a-spin :spinning="loading">
      <div
        class="logs-box"
        v-resize="onResize"
        :style="{ 'max-height' : tableY + 'px' }"
      >
        <template v-for="(log, i) in filterData">
          <div
            :key="i"
            :style="(i-1)%3 === 0 ? {'padding': '0 12px'} : ''"
            class="box"
          >
            <v-card class="box-card">
              <div class="box-item">
                <v-tooltip bottom nudge-left="12">
                  <template v-slot:activator="{ on : tip }">
                    <div v-on="tip" class="box-name"><b>{{log.name}}</b></div>
                  </template>
                  <div>{{log.name}}</div>
                </v-tooltip>
                <div class="box-icon">
                  <!--<i class="v-icon material-icons remove_red_eye"
                     @click="viewAction(log.name)"
                  >
                  </i>
                  <div class="icon-text" @click="viewAction(log.name)">
                    {{$t('logs.view')}}
                  </div>-->
                  <!--<i class="v-icon material-icons cloud_download"
                     @click="downLoadAction(log.name)"
                  >
                  </i>
                  <div class="icon-text" @click="downLoadAction(log.name)">
                    {{$t('logs.download')}}
                  </div>-->
                  <!--<i class="v-icon material-icons highlight_off"
                     @click="deleteAction(log.name)"
                     v-if="isShowDelete(log.date)"
                  >
                  </i>-->
                  <!--<div class="icon-text"
                       @click="deleteAction(log.name)"
                       v-if="isShowDelete(log.date)"
                  >
                    {{$t('logs.deleteLog')}}
                  </div>-->
                  <app-text-icon
                    small
                    icon="remove_red_eye"
                    :text="$t('logs.view')"
                    @click="viewAction(log.name)"
                  ></app-text-icon>
                  <app-text-icon
                    small
                    icon="cloud_download"
                    :text="$t('logs.download')"
                    @click="downLoadAction(log.name)"
                  ></app-text-icon>
                  <app-text-icon
                    small
                    v-if="isShowDelete(log.date)"
                    icon="highlight_off"
                    :text="$t('logs.deleteLog')"
                    @click="deleteAction(log.name)"
                  ></app-text-icon>
                  <v-spacer></v-spacer>
                  <span class="box-size">{{log.size}}</span>
                </div>
              </div>
            </v-card>
          </div>
        </template>
      </div>
    </a-spin>

    <div class="card-bottom card-round-btn">
      <div class="flex-center">
        <span class="amount">{{$t('homePage.tableTotal')}}:
          <span class="table-total">{{filterData.length}}</span>
        </span>
      </div>
      <v-spacer></v-spacer>
      <v-btn rounded @click="goBack()">{{$t('homePage.goback')}}</v-btn>
    </div>

    <component
      :is="children"
      :logName="logName"
      @closeDialog="closeDialog"
    ></component>
  </div>
</template>

<script>
  import { getSearchLogsList, downloadLogs } from './api'
  import { saveAs } from 'file-saver'
  import LogView from './components/LogView'
  import LogDeleteDialog from './components/LogDeleteDialog'
  import { get } from 'vuex-pathify'

  export default {
    name: 'ServerLogs',
    data() {
      return {
        tableY: 230,
        logsArr: [],
        loading: false,
        searchCond: undefined,
        logName: '',
        children: ''
      }
    },
    created() {
      this.doSearch()
    },
    methods: {
      doSearch() {
        this.loading = true
        getSearchLogsList().then(res => {
          this.logsArr = res.logs
        }).catch(() => {
        }).finally(() => {
          this.loading = false
        })
      },
      goBack() {
        this.$router.back(-1)
      },
      onResize() {
        this.tableY = window.innerHeight - 310
      },
      viewAction(logName) {
        this.logName = logName
        this.children = LogView
      },
      downLoadAction(logName) {
        this.loading = true
        downloadLogs({
          logName: logName
        }).then(res => {
          saveAs(this.publicMethods.base64ToBlob(res.content, 'application/octet-stream'), logName)
        }).catch(() => {
        }).finally(() => {
          this.loading = false
        })
      },
      filterByFunction(logItem) {
        if (this.publicMethods.isEmpty(this.searchCond)) return true
        // return logItem.name.indexOf(this.searchCond) !== -1 ||
        //   logItem.date.indexOf(this.searchCond) !== -1
        return logItem.date.indexOf(this.searchCond) !== -1
      },
      closeDialog() {
        this.children = ''
        this.doSearch()
      },
      deleteAction(logName) {
        this.logName = logName
        this.children = LogDeleteDialog
      },
      isShowDelete(date) {
        // 判断用户是否有权限
        const rightCode = this.staticVal.RightsCode.DeleteServerLog.code
        const isRight = this.roles.indexOf(rightCode) !== -1
        const isAfter = new Date().todayMoment().diff(date.createMoment(), 'days')
        return isRight && isAfter > 30
      }
    },
    computed: {
      filterData() {
        return this.logsArr.filter(v => {
          return this.filterByFunction(v)
        })
      },
      ...get('userInfo', ['roles'])
    }
  }
</script>

<style lang="scss" scoped>
  .group-item {
    padding-right: 24px;
    width: 35.0%;
  }

  .card-search-btn {
    padding-top: 16px;
  }

  .logs-box {
    min-height: 100px;
    overflow-y: scroll;
    margin: 0 16px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    .box {
      height: 100px;
      padding-bottom: 12px;
      width: (1/3)*100%;

      .box-card {

        .box-item {
          align-items: center;
          height: 87px;
          padding-left: 16px;
          padding-right: 12px;
          cursor: pointer;

          .box-name {
            width: 100%;
            padding: 18px 0 18px;
            vertical-align: middle;
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            font-size: 16px;
            letter-spacing: .44px;
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: $bg-blue;
          }

          .box-icon {
            display: flex;
            flex-wrap: wrap;
            color: #666;
            /*i {*/
            /*  margin-right: 4px;*/
            /*  font-size: 16px;*/
            /*  color: #666;*/
            /*}*/

            /*.icon-text {*/
            /*  margin-right: 16px;*/
            /*  font-weight: 400;*/
            /*  font-size: 12px;*/
            /*  color: #666;*/
            /*}*/

            .box-size {
              color: #333;
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .flex-center {
    width: 20%;
    /*display: flex;*/
    .amount {
      font-size: 12px;
      line-height: 44px; // 这里由于不知道如何居中,只能限制行高了
      color: #757575;
      /*align-items: center;*/

      .table-total {
        display: inline-block;
        text-align: center;
        margin-left: 4px;
        padding: 0 8px;
        border-radius: 2px;
        font-weight: 600;
        font-size: 11px;
        letter-spacing: .34px;
        line-height: 12px;
        color: #333;
      }
    }
  }

  .card-bottom {
    padding-left: 24px;
    display: flex;
    text-align: unset !important;
  }

</style>
