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
        <app-pdf :pdf-content="pdfContent"></app-pdf>
      </v-card-text>
      <v-card-actions class="dialog-footer app-btn">
        <v-spacer></v-spacer>
        <v-btn depressed @click="print()">{{$t('homePage.print')}}</v-btn>
        <v-btn depressed @click="download()">{{$t('homePage.download')}}</v-btn>
        <v-btn depressed @click="close()">{{$t('homePage.close')}}</v-btn>
      </v-card-actions>
    </v-card>
    <app-print ref="print"></app-print>
  </v-dialog>
</template>

<script>
  import AppPdf from './AppPdf'
  import AppPrint from '../AppPrint'
  import { saveAs } from 'file-saver'

  export default {
    name: 'AppPdfDialog',
    components: {
      AppPdf,
      AppPrint
    },
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
      // 是否点蒙层可关闭
      // persistent: {
      //   type: Boolean,
      //   default: true
      // },
      visible: {
        type: Boolean,
        default: false
      },
      // 是否需要确定按钮
      // onlyClose: {
      //   type: Boolean,
      //   default: false
      // },
      pdfContent: {
        type: String,
        default: ''
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      download() {
        saveAs(this.publicMethods.base64ToBlob(this.pdfContent, 'application/pdf'), '8SE.pdf')
      },
      print() {
        this.$refs.print.print(this.pdfContent)
      }
    }
  }
</script>

<style scoped>

</style>
