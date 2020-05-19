<template>
  <iframe id="printIframe" style="display:none">
  </iframe>
</template>

<script>
  export default {
    name: 'AppPrint',
    props: {
      pdfContent: {
        type: String,
        default: ''
      }
    },
    watch: {
      pdfContent: {
        handler(val) {
          this.print(val)
        }
      }
    },
    mounted() {
      // this.print(this.pdfContent)
    },
    methods: {
      print(base64) {
        const printIframe = document.querySelector('#printIframe')
        const blob = this.publicMethods.base64ToBlob(base64, 'application/pdf')
        printIframe.setAttribute('src', URL.createObjectURL(blob))
        setTimeout(() => {
          printIframe.contentWindow.print()
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>
