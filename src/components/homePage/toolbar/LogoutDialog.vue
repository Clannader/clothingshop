<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="320" persistent>
      <v-card>
        <v-card-title class="dialog-title">
          {{$t('homePage.logoutSys')}}
        </v-card-title>
        <v-card-text class="dialog-text">
            {{$t('homePage.logoutConfirm')}}
        </v-card-text>
        <v-card-actions class="dialog-footer app-btn">
          <v-spacer></v-spacer>
          <v-btn depressed @click="quit">{{$t('homePage.yes')}}</v-btn>
          <v-btn depressed @click="close">{{$t('homePage.no')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'LogoutDialog',
    data() {
      return {
        dialog: true
      }
    },
    created() {
      this.publicMethods.hotkeys(this.quit, 'Enter')
    },
    methods: {
      close() {
        // 提交触发外部组件的关闭方法
        // TODO 这个不知道怎么注销指定按键的事件,这样注销会把全部按键的事件都注销了
        document.onkeydown = undefined
        this.$emit('closeDialog')
      },
      quit() {
        this.$router.push({ path: '/' })
        // TODO 后期清除面包屑的数组保存
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
