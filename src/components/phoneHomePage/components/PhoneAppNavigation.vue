<template>
  <v-navigation-drawer
    v-model="drawer"
    class="aside-shadow"
    width="230"
    fixed
    app
  >
  </v-navigation-drawer>
</template>

<script>
  import { sync } from 'vuex-pathify'
  export default {
    name: 'PhoneAppNavigation',
    computed: {
      ...sync('tagsView', ['menuRouter', 'drawer'])
    }
  }
</script>

<style scoped>

</style>
