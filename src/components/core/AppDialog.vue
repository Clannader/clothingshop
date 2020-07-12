<template>
  <v-dialog
    v-model="visible"
    persistent
    :width="width"
  >
    <v-card>
      <v-card-title class="dialog-title">
        <span class="dialog-title-text">{{title}}</span>
      </v-card-title>
      <v-card-text style="padding: 0px 24px 0px 24px">
        <slot name="dialogContent"></slot>
      </v-card-text>
      <v-card-actions class="dialog-footer app-btn">
        <v-spacer></v-spacer>
        <slot name="dialogBtn"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'AppDialog',
    props: {
      // 标题
      title: {
        type: String,
        default: ''
      },
      // dialog宽度
      width: {
        type: Number,
        default: 640
      },
      visible: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>
