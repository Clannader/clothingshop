<template>
  <v-navigation-drawer
    v-model="drawer"
    class="aside-shadow"
    width="230"
    fixed
    app
    temporary
  >
    <template v-slot:prepend>
      <v-img
        :src="require('@/assets/images/vbanner.png')"
        max-height="98"
      >
        <v-list-item
          two-line
          dark
          class="nav-title"
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
      <!-- 导航栏缩小时样式 -->
      <!--<v-img
        :src="require('@/assets/images/vbanner.png')"
        max-height="50"
        v-else
      >
        <v-avatar
          class="d-block text-center mx-auto"
          style="margin-top: 7px"
          size="36"
        >
          <img :src="require('@/assets/user/default.jpg')">
        </v-avatar>
      </v-img>-->
    </template>

    <v-list
      dense
      expand
      nav
    >
      <template
        v-for="(menu, i) in items"
      >
        <v-divider
          v-if="menu.divider"
          :key="`divider-${i}`"
        ></v-divider>
        <nav-item
          :key="`item-${i}`"
          :item="menu"
          :class="{'nav-margin-top':menu.divider}"
          @click="doAction(menu)"
        />
      </template>
    </v-list>

    <v-list
      dense
      expand
      nav
      style="position: fixed; bottom: 0;width: 100%"
    >
      <v-divider></v-divider>
      <v-list-item
        class="nav-margin-top"
      >
        <v-list-item-content>
          <v-list-item-title
            style="color: #0055b8"><strong>ClothingShop Mobile</strong></v-list-item-title>
          <v-list-item-subtitle>{{systemConfig.version}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <component :is="children" @closeDialog="closeDialog()"></component>
  </v-navigation-drawer>
</template>

<script>
  import { get, sync } from 'vuex-pathify'
  import NavItem from './NavItem'
  import LogoutDialog from '../../homePage/toolbar/LogoutDialog'

  export default {
    name: 'PhoneAppNavigation',
    components: {
      NavItem
    },
    data() {
      return {
        items: [
          {
            icon: 'chat',
            title: 'menu.pMessage',
            path: 'home'
          }, {
            icon: 'mdi-apps',
            title: 'menu.pHomePage',
            path: 'home'
          }, {
            icon: 'settings',
            title: 'menu.pSettings',
            path: '/settings/user'
          }, {
            icon: 'history',
            title: 'menu.pOperation',
            path: 'home'
          }, {
            icon: 'exit_to_app',
            title: 'menu.pLogout',
            divider: true,
            action: this.gotoLogout
          }
        ],
        children: ''
      }
    },
    computed: {
      ...sync('tagsView', ['menuRouter', 'drawer']),
      ...get('userInfo', ['systemConfig'])
    },
    methods: {
      doAction(item) {
        this.drawer = false
        if (item.path) {
          this.$router.push({
            path: item.path
          })
        } else if (typeof item.action === 'function') {
          item.action.call(this, item)
        }
      },
      gotoLogout() {
        this.children = LogoutDialog
      },
      closeDialog() {
        this.children = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-image .v-list-item:hover {
    background-color: transparent;
  }

  .nav-title {
    position: fixed;
    top: 26px;
  }

  .nav-margin-top {
    margin-top: 4px;
  }
</style>
