<template>
  <v-snackbar
    v-model="show"
    top
    :color="color"
    :timeout="timeout">
    {{message}}
    <v-btn dark text @click="close()">Close</v-btn>
  </v-snackbar>
</template>

<script>
  import store from '@/store'

  export default {
    name: 'AppSnackbar',
    props: {
      color: {
        type: String,
        default: 'info'
      },
      timeout: {
        type: Number,
        default: 0
      },
      message: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        show: true
      }
    },
    methods: {
      close() {
        this.show = false
        store.dispatch('setShowSnackbar')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-snack--top {
    top: 20px;
  }
</style>
