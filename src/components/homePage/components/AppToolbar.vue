<template>
  <v-app-bar
    app
    dark
    flat
    fixed
    height="50"
    color="primary"
  >
    <v-app-bar-nav-icon
      @click.stop="changeSidebar()"
    >
    </v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-btn
      text
      :title="$t('homePage.userName')"
    >
      <v-img
        left
        :src="require('@/assets/user/default.jpg')"
        class="user-img"
      ></v-img>
      {{adminName}}
    </v-btn>

    <app-lang></app-lang>

    <v-btn
      icon
      :title="$t('homePage.logout')"
      @click="logout()"
    >
      <v-icon>
        mdi-export
      </v-icon>
    </v-btn>
    <component :is="children" @closeDialog="closeDialog()"></component>
  </v-app-bar>
</template>

<script>
  import AppLang from '../toolbar/AppLang'
  import LogoutDialog from '../toolbar/LogoutDialog'

  export default {
    name: 'AppToolbar',
    components: {
      AppLang,
      LogoutDialog
    },
    data() {
      return {
        adminName: '',
        children: ''
      }
    },
    created() {
      // this.userName = sessionStorage.getItem('userName')
      this.adminName = this.$store.getters.sessionSchema.adminName
    },
    methods: {
      changeSidebar() {
        // 初始化侧边栏状态,是收缩还是展开
        this.$store.dispatch('setMini', !this.$store.getters.mini)
      },
      logout() {
        this.children = LogoutDialog
      },
      closeDialog() {
        this.children = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 10px;
  }
</style>
