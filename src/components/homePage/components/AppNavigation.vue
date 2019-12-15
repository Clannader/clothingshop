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
      <span v-if="!mini"><b>Clothing Shop </b>MS</span>
      <span v-else><b>CMS</b></span>
    </v-toolbar-title>

    <v-list class="pt-0" dense>
      <template v-for="menu in menuRouter">
        <v-list-item :key="menu.name" @click="nothing(menu)">
          <v-tooltip right :disabled="!mini" nudge-right="5">
            <template #activator="{ on: nav }">
              <v-list-item-icon v-on="nav">
                <v-icon>iconfont icon-{{menu.meta.icon}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{$t(menu.meta.title)}}</v-list-item-title>
              </v-list-item-content>
            </template>
            <span v-text="$t(menu.meta.title)"></span>
          </v-tooltip>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AppNavigation',
    data() {
      return {}
    },
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
      nothing(router) {
        this.$router.push({
          name: router.name
        })
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
