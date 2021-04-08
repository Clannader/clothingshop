<template>
  <v-tooltip
    :right="mini && !subItem"
    :bottom="(!mini && subItem) || viewItem"
    :disabled="showTips && !viewItem"
  >
    <!--  v-tooltip的源码里面必须这样写才能绑定tip,并且是{on:value}这样的键值对-->
    <template #activator="{ on }">
      <v-list-item
        @click="gotoView(item)"
        color="primary"
        v-on="on"
        :class="isActiveClass(item)"
      >
        <v-list-item-icon v-if="!subItem">
          <v-icon v-text="item.meta.icon"/>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="$t(item.meta.title, item.meta.i18nParams)"/>
        </v-list-item-content>

        <!-- 如果这是子item,那么icon放右边-->
        <v-list-item-icon v-if="subItem && !item.meta.chip">
          <v-icon v-text="item.meta.icon"/>
        </v-list-item-icon>

        <v-chip
          v-if="item.meta.chip"
          :color="chipColor"
          x-small
          text-color="white"
        >
          {{ item.meta.chip }}
        </v-chip>

        <slot />
      </v-list-item>
    </template>
    <!-- 这里是显示tips的内容-->
    <span v-text="$t(item.meta.title, item.meta.i18nParams)"></span>
  </v-tooltip>
</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    name: 'AppMenuItem',
    props: {
      item: {
        type: Object,
        default: () => ({
          meta: {
            icon: '',
            title: ''
          }
        })
      },
      subItem: {
        // 是否是子item
        type: Boolean,
        default: false
      },
      viewItem: {
        // 是否是页面使用
        type: Boolean,
        default: false
      },
      mini: {
        // 左侧栏是否关闭,关闭则开启tooltip
        type: Boolean,
        default: false
      }
    },
    methods: {
      gotoView(router) {
        this.$router.push({
          path: `/${router.to}`
        })
      },
      isActiveClass(item) {
        const current = this.currentRouter
        let clazz = ''
        if (current.fullPath === '/' + item.to) {
          clazz = 'v-list-item--active'
        }
        return clazz
      }
    },
    computed: {
      chipColor() {
        switch (this.item.meta.chip) {
          case 'new':
            return 'primary'
          case 'updated':
            return 'warning'
          case 'deprecated':
            return 'black'
          case 'help':
            return 'error'
          default:
            return 'primary'
        }
      },
      showTips() {
        if (this.mini) {
          return false
        } else if (!this.mini && this.subItem) {
          return false
        }
        return true
      },
      ...get('tagsView', ['currentRouter'])
      // current() {
      //   return this.$store.state.tagsView.currentRouter
      // }
    }
  }
</script>

<style scoped lang="scss">

  .v-list-group--no-action > .v-list-group__items > div > .v-list-item {
    padding-left: 88px; // 原本是88px
  }

  .v-list-item__subtitle,
  .v-list-item__title {
    overflow: visible;
  }

  .v-application--is-ltr .v-list--dense.v-list--nav {
    .v-list-group--no-action.v-list-group--sub-group {
      & > .v-list-group__items > div > .v-list-item {
        padding-left: 74px;
      }
    }
  }

  .v-icon.v-icon{
    font-size: 20px;
  }

  /deep/ .v-list-item__action:last-of-type:not(:only-child){
    margin-left: 8px !important;
  }

  /deep/ .v-list--item__action:last-of-type:not(:only-child) {
    margin-left: 8px !important;
  }

  .v-list--nav .v-list-item{
    padding: 0 10px;
  }
</style>
