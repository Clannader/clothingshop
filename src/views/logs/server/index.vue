<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <v-text-field
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

    <div
      class="logs-box"
      v-resize="onResize"
      :style="{ 'max-height' : tableY + 'px' }"
    >
      <template v-for="(log, i) in logsArr">
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
                <v-icon>
                  remove_red_eye
                </v-icon>
                <div class="icon-text" @click="viewAction">
                  {{$t('logs.view')}}
                </div>
                <v-icon>
                  cloud_download
                </v-icon>
                <div class="icon-text" @click="downLoadAction">
                  {{$t('logs.download')}}
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </template>
    </div>

    <div class="card-bottom card-round-btn">
      <v-btn rounded @click="goBack()">{{$t('homePage.goback')}}</v-btn>
    </div>
  </div>
</template>

<script>
  import { getSearchLogsList } from './api'

  export default {
    name: 'ServerLogs',
    data() {
      return {
        tableY: 230,
        logsArr: []
      }
    },
    created() {
      this.doSearch()
    },
    methods: {
      doSearch() {
        getSearchLogsList().then(res => {
          this.logsArr = res.logs
        }).catch(() => {
        })
      },
      goBack() {
        this.$router.back(-1)
      },
      onResize() {
        this.tableY = window.innerHeight - 310
      },
      viewAction() {
        console.log('view')
      },
      downLoadAction() {
        console.log('download')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .group-item {
    padding-right: 24px;
    width: 25.0%;
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
        /*background: #fff;*/
        /*border-radius: 4px;*/

        .box-item {
          align-items: center;
          height: 87px;
          padding-left: 24px;
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
            white-space: normal;
            color: $bg-blue;
          }

          .box-icon {
            display: flex;
            flex-wrap: wrap;

            i {
              margin-right: 4px;
              font-size: 16px;
              color: #666;
            }

            .icon-text {
              margin-right: 16px;
              font-weight: 400;
              font-size: 12px;
              color: #666;
            }
          }
        }
      }
    }
  }
</style>
