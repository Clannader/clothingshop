<template>
  <v-tooltip
    right
    :disabled="!mini"
  >
    <template #activator="{ on: itemTip }">
      <v-list-item
        @click="gotoView(item)"
        v-on="itemTip"
      >
        <v-list-item-icon v-if="!subItem">
          <v-icon v-text="item.meta.icon"/>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t(item.meta.title)"/>
        </v-list-item-content>

        <!-- 如果这是子item,那么icon放右边-->
        <v-list-item-icon v-if="subItem">
          <v-icon v-text="item.meta.icon"/>
        </v-list-item-icon>
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
    }
  }
</script>

<style scoped lang="scss">
  .nav-light {
    background-color: lighten($bg-blue, 30%);

    .v-icon, .v-list-item__content {
      color: #FFFFFF;
    }
  }

</style>
