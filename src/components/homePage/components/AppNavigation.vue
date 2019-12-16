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
    <v-divider></v-divider>
    <v-list class="pt-0" dense>
      <v-list-item
        v-for="(menu, i) in menuRouter"
        :key="i"
        @click="gotoView(i, menu)"
        :class="{ 'nav-light' : i === lightIndex }"
      >
        <v-tooltip right :disabled="!mini" nudge-right="5">
          <template #activator="{ on: nav }">
            <v-list-item-icon v-on="nav">
              <v-icon
                :class="{'nav-item-title' : i === lightIndex}"
                >
                <template v-if="menu.meta.icon.startsWith('fa')">fa {{menu.meta.icon}}</template>
                <template v-else>iconfont icon-{{menu.meta.icon}}</template>
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title :class="{'nav-item-title' : i === lightIndex}">
                {{$t(menu.meta.title)}}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <span v-text="$t(menu.meta.title)"></span>
        </v-tooltip>
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
        lightIndex: 0
      }
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
      gotoView(index, router) {
        this.$router.push({
          name: router.name
        })
        this.lightIndex = index
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
    background-color: white;
    color: $bg-blue;
    border-bottom: 0 solid transparent;
    line-height: 49px;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
  }

  .nav-light {
    background-color: lighten($bg-blue, 30%);
  }

  .nav-item-title {
    color: #FFFFFF;
  }
</style>
