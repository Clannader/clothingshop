<template>
  <v-snackbar
    v-model="show"
    top
    :color="color"
    >
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
        show: false,
        activeTimeout: -1
      }
    },
    created() {
      if (store.getters.showSnackbar) {
        return
      }
      this.show = true
    },
    mounted() {
      this.setTimeout()
      store.dispatch('setShowSnackbar', true)
    },
    methods: {
      close() {
        this.show = false
        store.dispatch('setShowSnackbar', false)
        window.clearTimeout(this.activeTimeout)
      },
      setTimeout() {
        this.activeTimeout = window.setTimeout(() => {
          this.close()
        }, this.timeout)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-snack--top {
    top: 20px;
  }
</style>
