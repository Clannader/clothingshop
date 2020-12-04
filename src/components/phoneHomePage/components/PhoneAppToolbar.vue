<template>
  <v-app-bar
    app
    dark
    flat
    fixed
    height="50"
    :src="require('@/assets/images/vbanner.png')"
    color="primary"
  >
    <v-app-bar-nav-icon
      @click.stop="changeSidebar"
    >
    </v-app-bar-nav-icon>

    <span style="padding-left: 12px">
      <v-list-item
        class="pa-0"
        color="rgba(0, 0, 0, .4)"
        dark
      >
      <v-list-item-content>
        <v-list-item-title class="title">
          Marcus Obrien
        </v-list-item-title>
        <v-list-item-subtitle>
          Network Engineer
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    </span>

    <v-spacer></v-spacer>

    <v-btn
      icon
    >
      <v-icon>
        mdi-apps
      </v-icon>
    </v-btn>

    <template v-slot:extension>
      <app-text-icon
        style="margin-left: 46px"
        :text="adminName"
        icon="person"
      ></app-text-icon>
      <app-text-icon
        :text="new Date().format('YYYY年MM月DD日')"
        style="margin-top: 2px"
        icon="mdi-calendar-blank"
      ></app-text-icon>
    </template>

  </v-app-bar>
</template>

<script>
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'PhoneAppToolbar',
    computed: {
      ...get('userInfo', ['sessionSchema@adminName']),
      ...sync('tagsView', ['drawer'])
    },
    methods: {
      changeSidebar() {
        this.drawer = !this.drawer
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-list-item:hover {
    background-color: transparent;
  }
</style>
