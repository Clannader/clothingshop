<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="320" persistent>
      <v-card>
        <v-card-title class="dialog-title">
          {{$t('login.deleteUserTitle')}}
        </v-card-title>
        <v-card-text class="dialog-text">
          {{$t('login.deleteUserConfirm', { user: this.userName})}}
        </v-card-text>
        <v-card-actions class="dialog-footer app-btn">
          <v-spacer></v-spacer>
          <v-btn depressed @click="close(true)">{{$t('homePage.yes')}}</v-btn>
          <v-btn depressed @click="close(false)">{{$t('homePage.no')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DeleteUserDialog',
    props: {
      userName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dialog: true
      }
    },
    methods: {
      close(isAction) {
        this.$emit('closeDialog', isAction)
      }
    }
  }
</script>

<style scoped>

</style>
