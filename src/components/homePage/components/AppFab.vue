<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      aria-label="Scroll to top"
      fab
      dark
      fixed
      bottom
      right
      @click="toTop"
      class="fab-color"
      :title="$t('homePage.toTop')"
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
        // 升级之后,这句话要注释掉,否则走了2次相同路由就会报错
        // this.$router.push({ hash: '' })
        this.$vuetify.goTo(0)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .fab-color {
    background-color: $bg-blue !important;
    bottom: 40px;
  }
</style>
