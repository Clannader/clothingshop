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
      {{userName}}
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
  </v-app-bar>
</template>

<script>
  import AppLang from '../toolbar/AppLang'

  export default {
    name: 'AppToolbar',
    components: { AppLang },
    data() {
      return {
        userName: ''
      }
    },
    created() {
      this.userName = sessionStorage.getItem('userName')
    },
    methods: {
      changeSidebar() {
        // 初始化侧边栏状态,是收缩还是展开
        this.$store.dispatch('setMini', !this.$store.getters.mini)
      },
      logout() {
        console.log('223')
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
