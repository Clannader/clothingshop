<template>
  <v-snackbar
    v-model="show"
    v-if="show"
    top
    :color="color"
    :timeout="-1"
    rounded="pill"
    >
    {{message}}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        dark
        text
        rounded
        @click="close()"
      >
        Close
      </v-btn>
    </template>
<!--    <v-btn dark text @click="close()">Close</v-btn>-->
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
        // 是否显示弹框
        show: false,
        // 这个是定时器
        activeTimeout: -1
      }
    },
    beforeCreate() {
      // 2.3.x版本以上这里报undefined
      this.$vuetify.application = {
        bar: 0,
        bottom: 0,
        footer: 0,
        insetFooter: 0,
        left: 0,
        right: 0,
        top: 0
      }
    },
    created() {
      // 如果判断已经弹了框,则后面的弹的框都不显示
      if (store.getters.showSnackbar) {
        return
      }
      this.show = true
    },
    mounted() {
      this.setTimeout()
      store.dispatch('tagsView/setShowSnackbar', true)
    },
    methods: {
      close() {
        this.show = false
        store.dispatch('tagsView/setShowSnackbar', false)
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
