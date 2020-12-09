<template>
  <v-main>
    <v-container fluid class="main-content">
      <v-fade-transition mode="out-in">
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
  import ChangePassword from '@/views/common/ChangePassword'
  import { get } from 'vuex-pathify'

  export default {
    name: 'PhoneAppContent',
    computed: {
      ...get('userInfo', ['sessionSchema'])
    },
    components: {
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
  .main-content {
    height: 100%;
    padding: 0;
    background-color: #fff;
  }
</style>
