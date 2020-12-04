<template>
  <v-list-item
    color="primary"
    v-on="$listeners"
  >
    <v-list-item-icon>
      <v-icon v-text="item.icon"/>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title v-text="$t(item.title, item.i18nParams)"/>
    </v-list-item-content>

  </v-list-item>
</template>

<script>
  export default {
    name: 'NavItem',
    props: {
      item: {
        type: Object,
        default: () => ({
          icon: '',
          title: ''
        })
      }
    }
  }
</script>

<style scoped>

</style>
