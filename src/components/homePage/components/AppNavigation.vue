<template>
  <v-navigation-drawer
    v-model="drawer"
    class="aside-shadow"
    width="230"
    fixed
    app
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
      dense
      expand
      nav
    >
      <template
        v-for="(menu, i) in menuRouter"
      >
        <menu-group
          v-if="isShowGroupNav(menu)"
          :key="`group-${i}`"
          :item="menu"
        />

        <menu-item
          v-else-if="isShowItemNav(menu)"
          :key="`item-${i}`"
          :item="menu"
          :mini="mini"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { sync } from 'vuex-pathify'

  export default {
    name: 'AppNavigation',
    computed: {
      ...sync('tagsView', ['menuRouter', 'drawer']),
      mini: {
        get() {
          return this.$store.getters.mini
        },
        set(val) {
          // 经过测试可以在sync里面加入mini,但是这样导致显示的效果
          // 和预期的不一样,所以还是按照老方式的写法吧
          // 我就纳闷了,如果不这样写,左侧栏缩小后点击就会报错...
        }
      }
    },
    methods: {
      gotoHome() {
        this.$router.push({ path: '/home' })
      },
      isShowGroupNav(item) {
        // 是否显示大组的左侧栏
        // 有子路由,并且子路由个数不为0,并且不是收缩的状态
        if (item.meta.hidden) {
          return false
        }
        let len = item.children && item.children.length > 0 && !this.mini
        if (len) {
          // 如果子路由全部都隐藏则不显示
          len = item.children.find(child => !child.meta.hidden)
        }
        return len
      },
      isShowItemNav(item) {
        if (this.mini) {
          if (item.children && item.children.length > 0) {
            // 判断是否是组
            return item.children.find(child => !child.meta.hidden)
          } else {
            // 不是组则判断一个条件
            return !item.meta.hidden
          }
        } else {
          return !item.meta.hidden && !item.children
        }
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
