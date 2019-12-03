<template>
  <v-navigation-drawer
    class="aside-shadow"
    width="230"
    fixed
    app
    permanent
    :mini-variant.sync="mini"
    mini-variant-width="50"
  >
    <v-toolbar-title class="bar-title">
      <span><b>Clothing Shop </b>MS</span>
    </v-toolbar-title>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile
        v-for="menu in menuRouter"
        :key="menu.name"
        @click="nothing"
      >
        <v-list-tile-action>
          <v-icon>iconfont icon-{{menu.meta.icon}}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{$t(menu.meta.title)}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AppNavigation',
    data() {
      return {
        mini: false
      }
    },
    computed: {
      ...mapGetters([
        'menuRouter'
      ])
    },
    methods: {
      nothing() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  // TODO 暂时这样写再说
  @import "~@/style/color.scss";

  .bar-title {
    z-index: 88;
    background-color: $bg-blue;
    color: #fff;
    border-bottom: 0 solid transparent;
    /*padding: 0 15px;*/
    line-height: 50px;
    cursor: default;
    text-align: center;
    font-size: 18px;
  }
</style>
