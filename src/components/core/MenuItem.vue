<template>
  <v-list-item
    @click="gotoView(item)"
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
  </v-list-item
    @click="gotoView(item)">
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

  .nav-sub-item {
    padding-left: 32px !important;
    padding-right: 8px !important;
    .v-list-item__icon {
      margin-right: 16px !important;
    }
  }
</style>
