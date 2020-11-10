<template>
  <app-dialog
    :visible="true"
    :title="$t('logs.logTitle')"
    v-resize="onResize"
    :width="900"
  >
    <template slot="dialogContent">
      <a-spin :spinning="loading">
        <!-- <div
          class="dialog-text"
          :style="{ 'max-height' : tableY + 'px' }"
        >
          <v-textarea
            v-model="logContent"
            background-color="green accent-1"
            filled
            auto-grow
            hide-details
            readonly
          ></v-textarea>
        </div> -->
        <v-virtual-scroll
          :height="tableY"
          :items="logContent"
          item-height="25"
          v-scroll.self="onScroll"
        >
          <template v-slot:default="{ item }">
            <div>
              <p class="text-no-wrap" style="color: #333">
                {{item}}
              </p>
            </div>
          </template>
        </v-virtual-scroll>
      </a-spin>
    </template>
    <template slot="dialogBtn">
      <v-btn
        v-if="hasMore"
        depressed
        @click="loadingLog()"
      >{{$t('logs.logMore')}}</v-btn>
      <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
    </template>
  </app-dialog>
</template>

<script>
  import { downloadLogs } from '../api'

  export default {
    name: 'LogView',
    props: {
      logName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        loading: false,
        hasMore: false,
        logContent: [],
        // logTemp: '', // 这个是分隔数组的最后一行内容
        tableY: 230,
        startByte: 0, // 开始加载的字节位数
        endByte: 10 * 1024 // 最大加载1MB
      }
    },
    created() {
      this.loadingLog()
    },
    methods: {
      loadingLog() {
        this.loading = true
        downloadLogs({
          logName: this.logName,
          startByte: this.startByte,
          endByte: this.endByte
        }).then(res => {
          // 方法1:失败
          // const orgBuf = Buffer.from(this.logContent)
          // const newBuf = Buffer.from(res.content, 'base64')
          // this.logContent = Buffer.concat([orgBuf, newBuf]).toString()

          // 方法2:
          // 这里真的很奇怪,使用读取流,如果开始位不是0的时候,后面的读取的数据会多一个前一次读取数据
          // 的最后一个字符,我也不知道为什么,所以这里要判断不是第一次加载,后面的加载都要
          // 删除第一个字符串,否则会重复
          // let content = Buffer.from(res.content, 'base64').toString()
          // if (this.startByte !== 0) {
          //   content = content.substr(1)
          // }
          // 测试用例11-09 10-17
          // const content = Buffer.from(res.content, 'base64').toString()
          this.hasMore = res.hasMore
          const arrContent = Buffer.from(res.content, 'base64').toString().split('\r\n')
          // 取得到数组中的数组的最后一个元素
          const lastArr = arrContent[arrContent.length - 1]
          // 判断最后一个元素是否为空,空代表是\r\n结尾的字符串
          // this.logContent.splice(this.logContent.length - 1, 1)
          if (lastArr === '') {
            // 干掉最后一个元素
            arrContent.splice(arrContent.length - 1, 1)
            if (!this.hasMore) {
              // 判断是不是到最末尾了
              arrContent[0] = this.logContent.splice(this.logContent.length - 1, 1) + arrContent[0]
            }
          } else {
            // 改变第一个元素的值
            arrContent[0] = this.logContent.splice(this.logContent.length - 1, 1) + arrContent[0]
            // content = this.logTemp + content
            // arrContent = content.split('\r\n')
          }
          // this.logTemp = lastArr
          this.logContent = this.logContent.concat(arrContent)
          if (this.hasMore) {
            this.startByte = res.startByte
            this.endByte = res.endByte
          }
        }).catch(() => {
        }).finally(() => {
          this.loading = false
        })
      },
      close() {
        this.$emit('closeDialog')
      },
      onResize() {
        this.tableY = window.innerHeight - 180
      },
      onScroll(e) {
        // 2个标识,阻止多次请求导致加载重复数据
        // 如果没有数据了,也不需要加载
        // 如果正在加载中,也不需要加载
        if (!this.hasMore || this.loading) return
        // 这里不能使用相等,因为不是100%用户会滚到最底部的
        if (e.target.scrollTop + e.target.offsetHeight > e.target.scrollHeight - 100) {
          // 监控到底部了
          this.loadingLog()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-text {
    min-height: 100px;
    overflow: scroll;
  }
</style>
