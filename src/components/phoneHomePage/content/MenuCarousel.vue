<template>
  <v-carousel
    v-model="model"
    v-resize="onResize"
    hide-delimiter-background
    :show-arrows="false"
    :height="tableY"
    light
  >
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
    >
      <v-sheet
        color="#ecf0f5"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">
            Slide {{ i + 1 }}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    name: 'MenuCarousel',
    data: () => ({
      model: 0,
      colors: [
        'primary',
        'yellow darken-2'
      ],
      tableY: 500
    }),
    methods: {
      onResize() {
        this.tableY = window.innerHeight - 98
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .theme--light.v-btn.v-btn--icon{
    color: $bg-blue; /*darken($bg-blue, 20%);*/
  }
</style>
