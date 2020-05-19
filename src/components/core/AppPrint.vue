<template>
  <iframe id="printIframe">
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
          if (val) {
            this.print(val)
          }
        }
      }
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
