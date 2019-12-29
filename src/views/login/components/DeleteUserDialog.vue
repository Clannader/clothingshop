<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="320" persistent>
      <v-card>
        <v-card-title class="dialog-title">
          {{$t('login.deleteUserTitle')}}
        </v-card-title>
        <v-card-text class="dialog-text">
          {{$t('login.deleteUserConfirm')}}
        </v-card-text>
        <v-card-actions class="dialog-footer app-btn">
          <v-spacer></v-spacer>
          <v-btn depressed @click="deleteUserName">{{$t('homePage.yes')}}</v-btn>
          <v-btn depressed @click="close">{{$t('homePage.no')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DeleteUserDialog',
    data() {
      return {
        dialog: true
      }
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      },
      deleteUserName() {
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
