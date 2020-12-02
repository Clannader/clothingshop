<template>
  <v-navigation-drawer
    v-model="drawer"
    class="aside-shadow"
    width="230"
    fixed
    app
  >
    <template v-slot:prepend>
      <v-img
        :src="require('@/assets/images/vbanner.png')"
      >
        <v-list-item
          two-line
          dark
        >
          <v-list-item-avatar>
            <img :src="require('@/assets/user/default.jpg')">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-img>
    </template>

    <v-divider></v-divider>
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

<style lang="scss" scoped>
  .v-image .v-list-item:hover{
    background-color: transparent;
  }
</style>
