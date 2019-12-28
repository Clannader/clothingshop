<template>
  <v-tooltip
    :right="mini && !subItem"
    :bottom="!mini && subItem"
    :disabled="showTips"
  >
    <template #activator="{ on: itemTip }">
      <v-list-item
        @click="gotoView(item)"
        color="primary"
        v-on="itemTip"
      >
        <v-list-item-icon v-if="!subItem">
          <v-icon v-text="item.meta.icon"/>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="$t(item.meta.title)"/>
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

      </v-list-item>
    </template>
    <!-- 这里是显示tips的内容-->
    <span v-text="$t(item.meta.title)"></span>
  </v-tooltip>
</template>

<script>
  export default {
    name: 'MenuItem',
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
      mini: {
        // 左侧栏是否关闭,关闭则开启tooltip
        type: Boolean,
        default: false
      }
    },
    methods: {
      gotoView(router) {
        this.$router.push({
          name: router.name
        })
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
      }
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

</style>
