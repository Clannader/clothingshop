<template>
  <app-dialog
    :visible="true"
    :title="$t('logs.logTitle')"
    v-resize="onResize"
    :width="900"
  >
    <template slot="dialogContent">
      <a-spin :spinning="loading">
        <div
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
        </div>
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
        logContent: '',
        tableY: 230,
        startByte: 0, // 开始加载的字节位数
        endByte: 3 * 1024 // 最大加载1MB
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
          let content = Buffer.from(res.content, 'base64').toString()
          if (this.startByte !== 0) {
            content = content.substr(1)
          }
          this.logContent += content
          this.hasMore = res.hasMore
          if (this.hasMore) {
            this.startByte = this.endByte
            this.endByte += 1024
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
