<template>
  <div>
    <router-view></router-view>
    <change-password
      :visible="showPwd"
      @closeDialog="quit()"
      @actionAfter="closePwdDialog()"
    ></change-password>
  </div>
</template>

<script>
  import ChangePassword from '@/views/common/ChangePassword'
  import { get } from 'vuex-pathify'

  export default {
    name: 'PhoneBlank',
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

<style scoped>

</style>
