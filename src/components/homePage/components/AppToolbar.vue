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
    >{{userName}}</v-btn>

    <app-lang></app-lang>

    <v-btn
      icon
      :title="$t('homePage.logout')"
    >
      <v-icon>
        mdi-export
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
  import AppLang from '../toolbar/AppLang'

  export default {
    name: 'AppToolbar',
    components: { AppLang },
    data() {
      return {
        // mini: false,
        userName: ''
      }
    },
    created() {
      // const sidebarStatus = localStorage.getItem('sidebarStatus')
      // this.mini = sidebarStatus && sidebarStatus === 'true'
      this.userName = sessionStorage.getItem('userName')
    },
    methods: {
      changeSidebar() {
        // 初始化侧边栏状态,是收缩还是展开
        // this.mini = !this.mini
        // localStorage.setItem('sidebarStatus', this.mini)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
