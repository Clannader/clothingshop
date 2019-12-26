<template>
  <v-list-item
    @click="gotoView(item)"
    :class="subItem ? 'nav-sub-item' : ''"
  >
    <v-list-item-icon>
      <v-icon v-text="item.meta.icon"/>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="$t(item.meta.title)"/>
    </v-list-item-content>
  </v-list-item>
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
    padding-left: 32px;
    padding-right: 8px;
    .v-list-item__icon {
      margin-right: 16px;
    }
  }
</style>
