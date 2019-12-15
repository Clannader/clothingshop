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
    <v-toolbar-title
      class="bar-title"
      @click="gotoHome()"
    >
      <span><b>Clothing Shop </b>MS</span>
    </v-toolbar-title>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-item
        v-for="menu in menuRouter"
        :key="menu.name"
        @click="nothing"
      >
        <v-list-item-action>
          <v-icon>iconfont icon-{{menu.meta.icon}}</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{$t(menu.meta.title)}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AppNavigation',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'menuRouter',
        'mini'
      ])
    },
    methods: {
      nothing() {

      },
      gotoHome() {
        this.$router.push({ name: 'Home' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bar-title {
    z-index: 88;
    background-color: $bg-blue;
    color: #fff;
    border-bottom: 0 solid transparent;
    line-height: 50px;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
  }
</style>
