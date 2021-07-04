<template>
  <app-dialog
    :visible="visible"
    :width="width"
    :title="title"
  >
    <template #dialogContent>
      <app-pdf :pdf-content="pdfContent"></app-pdf>
    </template>
    <template #dialogBtn>
      <v-btn depressed @click="print()">{{$t('homePage.print')}}</v-btn>
      <v-btn depressed @click="download()">{{$t('homePage.download')}}</v-btn>
      <v-btn depressed @click="close()">{{$t('homePage.close')}}</v-btn>
    </template>
    <app-print ref="print"></app-print>
  </app-dialog>
</template>

<script>
  import { saveAs } from 'file-saver'

  export default {
    name: 'AppPdfDialog',
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
