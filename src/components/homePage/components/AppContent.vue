<template>
  <v-main class="layout-content-box">
    <v-container fluid class="main-content">
      <app-breadcrumbs></app-breadcrumbs>
      <v-fade-transition hide-on-leave="">
        <router-view></router-view>
      </v-fade-transition>
    </v-container>
    <change-password
      :visible="showPwd"
      @closeDialog="quit()"
      @actionAfter="closePwdDialog()"
    ></change-password>
  </v-main>
</template>

<script>
  import AppBreadcrumbs from './AppBreadcrumbs'
  import ChangePassword from '@/views/common/ChangePassword'
  import { get } from 'vuex-pathify'

  export default {
    name: 'AppContent',
    computed: {
      ...get('userInfo', ['sessionSchema'])
    },
    components: {
      AppBreadcrumbs,
      ChangePassword
    },
    data() {
      return {
        showPwd: false
      }
    },
    created() {
      this.showPwd = this.sessionSchema.isFirstLogin
    },
    methods: {
      async quit() {
        await this.publicMethods.removeUserSession()
        this.$router.push({ path: '/login' })
      },
      closePwdDialog() {
        this.showPwd = false
        this.$store.dispatch('userInfo/setSessionSchema', {
          isFirstLogin: false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout-content-box /deep/ .v-content__wrap {
    /*height: 100% !important;*/
  }

  .main-content {
    height: 100%;
    padding: 0;
    background-color: #ecf0f5;
  }
</style>
