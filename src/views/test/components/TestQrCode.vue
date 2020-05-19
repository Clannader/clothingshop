<template>
  <v-dialog
    v-model="visible"
    persistent
    :width="320"
  >
    <v-card>
      <v-card-title class="dialog-title">
        <span class="dialog-title-text">二维码</span>
      </v-card-title>
      <v-card-text style="padding: 24px 24px 0px 24px">
        <div class="form-group">
          <qriously :value="initCode" :size="200"/>
        </div>
      </v-card-text>
      <v-card-actions class="dialog-footer app-btn">
        <v-spacer></v-spacer>
        <v-btn depressed @click="submit()">{{$t('homePage.confirm')}}</v-btn>
        <v-btn depressed @click="close()">{{$t('homePage.close')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'TestQrCode',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      initCode: {
        type: String,
        default: ''
      }
    },
    watch: {
      initCode(newVal) {
        if (newVal) {
          console.log(newVal)
        }
      }
    },
    methods: {
      submit() {
        this.$emit('submit')
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-group {
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
