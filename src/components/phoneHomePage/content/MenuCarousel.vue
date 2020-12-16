<template>
  <v-carousel
    v-model="model"
    v-resize="onResize"
    hide-delimiter-background
    :show-arrows="false"
    :height="carouselHeight"
    light
  >
    <v-carousel-item
      v-for="(items, key) in sheet"
      :key="key"
    >
      <div
        class="cell-flex"
        style="padding: 16px 16px 0px 0px"
        v-for="(item, i) in items.item"
        :key="i"
      >
        <div
          v-for="(kid, j) in item.kids"
          :key="j"
          :style="{'padding-left': `${kid.left}px`, 'padding-bottom': `${kid.bottom}px`}"
        >
          <v-sheet
            color="#ecf0f5"
            elevation="3"
            :height="sheetInitWidth"
            :width="sheetInitWidth"
            class="text-center"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div class="display-1">
                {{ kid.index }}
              </div>
            </v-row>
          </v-sheet>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    name: 'MenuCarousel',
    props: {
      noticeHeight: Number
    },
    data: () => ({
      model: 0,
      carouselHeight: 0,
      sheet: [], // 估计要定义3维数组
      sheetInitWidth: 100 // 默认cell宽度
    }),
    watch: {
      noticeHeight: {
        handler() {
          this.onResize()
        }
      }
    },
    methods: {
      onResize() {
        // 这里还需要考虑高度宽度小于sheetInitWidth时的处理,感觉会死循环
        this.sheet = []
        const windowWidth = window.innerWidth // 窗口宽度
        const windowHeight = window.innerHeight // 窗口高度

        const top = this.$vuetify.application.top // vuetify app高度
        const left = this.$vuetify.application.left // vuetify左侧栏宽度
        this.carouselHeight = windowHeight - top - this.noticeHeight // 轮播div高度

        const num = 5 // 定义有xx个功能
        const padding = 16 // 左右上下padding固定16

        const cellWidth = windowWidth - left // cell可用宽度
        const cellHeight = this.carouselHeight - 50 // cell可用高度,轮播的按钮高度(50)

        const [numWidth, widthIv] = this.sumWidth(cellWidth, padding)
        const [numHeight, heightIv] = this.sumHeight(cellHeight, padding)

        // 计算有多少页
        // const maxSum = numWidth * numHeight // 每页最大数量
        // const page = Math.ceil(num / maxSum) // 页数
        // numWidth: 每行最大个数 widthIv:每行间距多少 numHeight:每页最大行数 heightIv:每行间距

        // 先计算全部一共多少行
        const numArr = Math.ceil(num / numWidth)
        const sumArr = []
        let statistics = 0
        for (let i = 0; i < numArr; i++) {
          const arr = []
          const rowNum = (i + 1) * numWidth > num ? num % numWidth : numWidth
          for (let j = 0; j < rowNum; j++) {
            let left = padding
            statistics++
            if (j !== 0) {
              left = widthIv
            }
            arr.push({
              left: left,
              bottom: heightIv,
              index: statistics
            })
          }
          sumArr.push({
            kids: arr
          })
        }
        // 总页数
        const page = Math.ceil(sumArr.length / numHeight)
        for (let p = 0; p < page; p++) {
          const start = p * numHeight
          let end = start + numHeight
          const sheetArr = []
          if (end > sumArr.length) {
            end = sumArr.length
          }
          for (let i = start; i < end; i++) {
            if (i === end - 1) {
              sumArr[i].kids.map(value => {
                value.bottom = 0
                return value
              })
            }
            sheetArr.push(sumArr[i])
          }
          this.sheet.push({
            item: sheetArr
          })
        }
      },
      sumWidth(cellWidth, padding) {
        // dense的算法
        // const sheetWidth = this.sheetInitWidth + padding // cell需要占位的宽度
        // const floor = Math.floor(cellWidth / sheetWidth)
        // const diffWidth = cellWidth - sheetWidth * floor
        // const sheetIv = padding + (diffWidth - padding) / (floor - 1)
        // return [floor, sheetIv]

        // 宽松的算法
        const sheetWidth = this.sheetInitWidth + padding * 2 // cell需要占位的宽度
        let floor = Math.floor(cellWidth / sheetWidth)
        const diffWidth = cellWidth - sheetWidth * floor
        if (diffWidth > this.sheetInitWidth) {
          floor++
        }
        // 计算每个sheet距离的padding
        const sheetIv = Math.floor((cellWidth - padding * 2 - this.sheetInitWidth * floor) / (floor - 1))
        return [floor, sheetIv]
      },
      sumHeight(cellHeight, padding) {
        const sheetHeight = this.sheetInitWidth + padding // cell需要占位的高度
        const floor = Math.floor(cellHeight / sheetHeight)
        const diffHeight = cellHeight - sheetHeight * floor
        // if (diffHeight > this.sheetInitWidth) {
        //   floor++
        // }
        // 计算每个sheet距离的padding
        // const sheetIv = Math.floor((cellHeight - 50 - sheetHeight * floor) / (floor - 1))
        const sheetIv = (diffHeight - padding) / (floor - 1)
        return [floor, sheetIv]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cell-flex {
    display: flex;
  }

  /deep/ .theme--light.v-btn.v-btn--icon {
    color: #3408e4;
  }
</style>
