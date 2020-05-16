<template>
  <div class="pdfList"></div>
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
    watch: {
      pdfContent: {
        handler(val) {
          if (val) {
            this.showPdf(val)
          }
        }
      }
    },
    mounted() {
      this.showPdf(this.pdfContent)
    },
    methods: {
      async showPdf(base64) {
        const pdfList = document.querySelector('.pdfList') // 通过querySelector选择DOM节点,使用document.getElementById()也一样
        // const CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.3.200/cmaps/'
        const decodedBase64 = atob(base64) // 使用浏览器自带的方法解码
        PDFJS.GlobalWorkerOptions.workerSrc = PDFJS
        const pdf = await PDFJS.getDocument({
          data: decodedBase64,
          // cMapUrl: CMAP_URL,
          cMapPacked: true
        }) // 返回一个pdf对象
        const pages = pdf.numPages // 声明一个pages变量等于当前pdf文件的页数
        for (let i = 1; i <= pages; i++) {
          // 循环页数
          const canvas = document.createElement('canvas')
          const page = await pdf.getPage(i) // 调用getPage方法传入当前循环的页数,返回一个page对象
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

          canvas.className = 'canvas' // 给canvas节点定义一个class名,这里我取名为canvas
          pdfList.appendChild(canvas) // 插入到pdfList节点的最后
        }
      }
    }
  }
</script>

<style scoped>

</style>
