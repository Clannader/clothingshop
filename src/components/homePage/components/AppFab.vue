<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      @click="toTop"
      class="fab-color"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
  export default {
    name: 'AppFab',
    data: () => ({
      fab: false
    }),
    methods: {
      onScroll() {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset ||
          document.documentElement.offsetTop ||
          0
        this.fab = top > 100
      },
      toTop() {
        this.$router.push({ hash: '' })
        this.$vuetify.goTo(0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  // TODO 暂时这样写再说
  @import "@/style/color.scss";

  .fab-color {
    background-color: $bg-blue !important;
    bottom: 40px;
  }
</style>
