<template>
  <app-dialog
    :visible="true"
    :title="$t('logs.userLogTitle')"
    v-resize="onResize"
    :width="600"
  >
    <template #dialogContent>
      <v-virtual-scroll
        :height="tableY"
        :items="logContent"
        item-height="25"
      >
        <template #default="{ item }">
          <div>
            <p class="text-no-wrap" style="color: #333">
              {{item}}
            </p>
          </div>
        </template>
      </v-virtual-scroll>
    </template>
    <template #dialogBtn>
      <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
    </template>
  </app-dialog>
</template>

<script>

  export default {
    name: 'UserLogView',
    props: {
      userLogObject: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        logContent: [],
        tableY: 230
      }
    },
    created() {
      this.loadingLog()
    },
    methods: {
      loadingLog() {
        // 这里还需要改样式的,需要把所有信息展示出来,content使用虚拟滚动条展示
        // 注意切割\r\n和<br>
        this.logContent = this.userLogObject.content.split('\r\n')
      },
      close() {
        this.$emit('closeDialog')
      },
      onResize() {
        // 这里是先执行loadingLog() 方法再执行onResize
        // 并且每一行的高度是25,可以设置的
        // 判断如果日志超过屏幕宽度时才自适应
        const orgHeight = window.innerHeight - 180
        if (this.logContent.length * 25 > orgHeight) {
          this.tableY = orgHeight
        } else {
          this.tableY = this.logContent.length * 25 + 13
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
