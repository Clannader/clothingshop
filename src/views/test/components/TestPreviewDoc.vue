<template>
  <div>
    <div class="card-bottom card-round-btn">
      <v-btn rounded @click="previewDoc()">预览文档</v-btn>
    </div>
    <v-card class="card-body" id="previewDoc">
    </v-card>
    <v-card class="card-body">
      <v-file-input
        label="上传文件"
        accept=".doc,.docx"
        show-size
        small-chips
        v-model="nodeFile"
      >
      </v-file-input>
    </v-card>
  </div>
</template>

<script>
  import api from '@/utils/request'
  import mammoth from 'mammoth'

  export default {
    name: 'TestPreviewDoc',
    data() {
      return {
        nodeFile: undefined
      }
    },
    methods: {
      previewDoc() {
        api.get('/api/file/word/test', {}).then(res => {
          mammoth.convertToHtml({ arrayBuffer: this.toArrayBuffer(res.text.data) })
            .then(result => {
              document.getElementById('previewDoc').innerHTML = result.value
            }).done()
        }).catch(err => {
          // mammoth.convertToHtml({ arrayBuffer: this.toArrayBuffer(Buffer.from(err)) })
          //   .then(result => {
          //     document.getElementById('previewDoc').innerHTML = result.value
          //   }).done()
          // this.readFileInputEventAsArrayBuffer(err, function(arrayBuffer) {
          //   mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          //     .then(result => {
          //       document.getElementById('previewDoc').innerHTML = result.value
          //     }).done()
          // })

          const data = err.text.data

          // console.log(err.length)
          // console.log(this.toArrayBuffer(err))
          // console.log(this.toArrayBuffer2(Buffer.from(err)))
          // console.log(this.nodeFile)
          // this.readFileInputEventAsArrayBuffer(this.toArrayBuffer(err), arrayBuffer => {
          //   console.log(arrayBuffer)
          // mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          //   .then(result => {
          //     document.getElementById('previewDoc').innerHTML = result.value
          //   }).done()
          // })
          // this.readFileInputEventAsArrayBuffer(this.nodeFile, function(arrayBuffer) {
          mammoth.convertToHtml({ arrayBuffer: this.toArrayBuffer(data) })
            .then(result => {
              document.getElementById('previewDoc').innerHTML = result.value
            }).done()
          // })
        })
      },
      toArrayBuffer2(buf) {
        const ab = new ArrayBuffer(buf.length)
        const view = new Uint8Array(ab)
        for (var i = 0; i < buf.length; ++i) {
          view[i] = buf[i]
        }
        return ab

        // var buf = new ArrayBuffer(str.length) // 每个字符占用2个字节
        // var bufView = new Uint16Array(buf)
        // for (var i = 0, strLen = str.length; i < strLen; i++) {
        //   bufView[i] = str.charCodeAt(i)
        // }
        // return buf
      },
      toArrayBuffer(buffer) {
        const ab = new ArrayBuffer(buffer.length)
        const view = new Uint8Array(ab)
        for (var i = 0; i < buffer.length; ++i) {
          view[i] = buffer[i]
        }
        return ab
        // const base64 = Buffer.from(buf).toString('base64')
        // const bstr = atob(base64)
        // let n = bstr.length
        // const u8arr = new Uint8Array(n)
        // while (n--) {
        //   u8arr[n] = bstr.charCodeAt(n)
        // }
        // return new Blob([u8arr], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
      },
      readFileInputEventAsArrayBuffer(file, callback) {
        const reader = new FileReader()
        reader.onload = function(loadEvent) {
          callback(loadEvent.target.result)
        }
        reader.readAsArrayBuffer(file)
      }
    }
  }
</script>

<style scoped>

</style>
