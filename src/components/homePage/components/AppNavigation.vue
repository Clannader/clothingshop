<template>
  <v-navigation-drawer
    class="aside-shadow"
    width="230"
    fixed
    app
    permanent
    :mini-variant.sync="mini"
    mini-variant-width="56"
  >
    <v-toolbar-title
      class="bar-title"
      @click="gotoHome()"
    >
      <span v-if="!mini"><b>Clothing Shop </b>MS</span>
      <span v-else><b>CMS</b></span>
    </v-toolbar-title>
    <v-divider></v-divider>
    <v-list
      class="pt-0"
      dense
      expand
    >
      <template
        v-for="(menu, i) in menuRouter"
      >
        <menu-group
          v-if="menu.children && menu.children.length > 0 && !mini"
          :key="`group-${i}`"
          :item="menu"
        />

        <menu-item
          v-else
          :key="`item-${i}`"
          :item="menu"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AppNavigation',
    computed: {
      ...mapGetters([
        'menuRouter'
      ]),
      mini: {
        get() {
          return this.$store.getters.mini
        },
        set(val) {
          // 我就纳闷了,如果不这样写,左侧栏缩小后点击就会报错...
        }
      }
    },
    methods: {
      gotoHome() {
        this.$router.push({ name: 'Home' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bar-title {
    z-index: 88;
    background-color: white;
    color: $bg-blue;
    /*border-bottom: 0 solid transparent;*/
    line-height: 50px;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
  }
</style>
