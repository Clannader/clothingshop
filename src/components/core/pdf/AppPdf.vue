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
        this.pageCanvas()
        this.$vuetify.goTo('.pdf-list', {
          duration: 500,
          easing: 'linear',
          container: '.pdf-list'
        })
      }
    },
    mounted() {
      this.showPdf(this.pdfContent)
    },
    methods: {
      async showPdf(base64) {
        // const pdfList = document.querySelector('.pdfList') // 通过querySelector选择DOM节点,使用document.getElementById()也一样
        // const CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.3.200/cmaps/'
        const decodedBase64 = atob(base64) // 使用浏览器自带的方法解码
        PDFJS.GlobalWorkerOptions.workerSrc = PDFJS
        this.pdfObject = await PDFJS.getDocument({
          data: decodedBase64,
          // cMapUrl: CMAP_URL,
          cMapPacked: true
        }) // 返回一个pdf对象
        this.total = this.pdfObject.numPages // 声明一个pages变量等于当前pdf文件的页数
        await this.pageCanvas()
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
        await page.render(renderContext)

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

  .pagination ul>li:last-child .v-pagination__navigation{
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
