<template>
  <div>
    <div
      class="pdf-content"
      v-resize="onResize"
      :style="{ 'height': pdfHeight + 'px'}"
    >
      <div class="pdf-list">
        <canvas ref="pdfCanvas"></canvas>
      </div>
    </div>

    <v-row class="mr-24">
      <v-col class="flex-center">
        <span class="amount">{{$t('homePage.tableTotal')}}: {{total}}</span>
      </v-col>
      <v-row class="mr-24">
        <v-col class="flex-center flexEnd">
          <v-pagination
            v-model="pageIndex"
            :length="total"
            :total-visible="7"
            style="padding-left: 20px"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
  import PDFJS from 'pdfjs-dist'

  export default {
    name: 'AppPdf',
    props: {
      pdfContent: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        pageIndex: 1, // 当前第几页
        total: 1,
        pdfObject: undefined,
        pdfHeight: 300
      }
    },
    watch: {
      pageIndex() {
        // 当每次分页的时候,加载对应页码的pdf
        this.pageCanvas()
        // 由于有bug,所以就只能通过这个方法回到顶部
        this.$vuetify.goTo('.pdf-list', {
          duration: 500,
          easing: 'linear',
          container: '.pdf-list'
        })
      },
      pdfContent: {
        async handler(val) {
          if (val) {
            // 当检测内容有变化的时候,需要跳回第一页的操作
            // 重新加载pdf
            await this.showPdf(val, this.pageIndex !== 1)
            // 返回顶部
            // 如果页数等于1,不会触发watch
            this.pageIndex = 1
            this.$vuetify.goTo('.pdf-list', {
              duration: 500,
              easing: 'linear',
              container: '.pdf-list'
            })
          }
        }
      }
    },
    mounted() {
      // 初始化时加载pdf
      this.showPdf(this.pdfContent, false)
    },
    methods: {
      async showPdf(base64, isChange) {
        // const pdfList = document.querySelector('.pdfList') // 通过querySelector选择DOM节点,使用document.getElementById()也一样
        const CMAP_URL = process.env.VUE_APP_CMAPS_PATH + '/static/cmaps/'
        const decodedBase64 = atob(base64) // 使用浏览器自带的方法解码
        PDFJS.GlobalWorkerOptions.workerSrc = PDFJS
        // 返回一个pdf对象
        this.pdfObject = await PDFJS.getDocument({
          data: decodedBase64,
          cMapUrl: CMAP_URL,
          cMapPacked: true
        }).promise.then(res => res).catch(err => {
          this.$toast.error(err)
          console.log(err)
          return null
        })
        if (this.pdfObject === null) {
          return
        }
        this.total = this.pdfObject.numPages // 声明一个pages变量等于当前pdf文件的页数
        // 这里避免pdf内容改变时,切换至第一页的时候,修改页数不能走这里触发页数渲染
        if (!isChange) {
          this.pageCanvas()
        }
      },
      async pageCanvas() {
        // const pdfList = document.querySelector('.pdf-list')
        // const canvas = document.createElement('canvas')
        const canvas = this.$refs.pdfCanvas
        const page = await this.pdfObject.getPage(this.pageIndex) // 调用getPage方法传入当前循环的页数,返回一个page对象
        const scale = 1.5 // 缩放倍数，1表示原始大小
        const viewport = page.getViewport(scale)
        const context = canvas.getContext('2d') // 创建绘制canvas的对象
        canvas.height = viewport.height // 定义canvas高和宽
        canvas.width = viewport.width
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        }
        await page.render(renderContext).promise

        // canvas.className = 'canvas' // 给canvas节点定义一个class名,这里我取名为canvas
        // if (pdfList.hasChildNodes()) {
        //   // 判断pdfList下是否存在canvas标签,如果存在,先删除后添加
        //   pdfList.removeChild(pdfList.querySelector('canvas'))
        // }
        // pdfList.appendChild(canvas) // 插入到pdfList节点的最后
      },
      onResize() {
        this.pdfHeight = window.innerHeight - 230
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mr-24 {
    margin-left: 0px;
    margin-right: 0px;
  }

  .v-pagination {
    width: auto;
  }

  .flex-center {
    display: flex;
    align-items: center;
  }

  .amount {
    font-size: 12px;
    line-height: 12px;
    color: #555;
  }

  .flexEnd {
    justify-content: flex-end;
    padding-right: 0px;
  }

  .pagination ul > li:last-child .v-pagination__navigation {
    margin-right: 0px;
  }

  .pdf-content {
    height: 300px;
    overflow: auto;

    .pdf-list {
      height: 100%;
      overflow: auto;
    }
  }
</style>
