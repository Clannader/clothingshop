<template>
  <div>
    <div class="card-bottom card-round-btn">
      <v-btn rounded @click="clear()">清除</v-btn>
      <v-btn rounded @click="previewDoc2()">预览文档2</v-btn>
      <v-btn rounded @click="previewDoc()">预览文档</v-btn>
    </div>
    <v-card class="card-body" style="margin-bottom: 20px">
      <v-file-input
        label="上传文件"
        accept=".doc,.docx"
        show-size
        small-chips
        v-model="nodeFile"
      >
      </v-file-input>
    </v-card>
    <v-card class="card-body" id="previewDoc">
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
        // axios的get的传参和设置headers和post有点不一样
        // get的headers的content-type是设置不了的,不知道为什么,但是其他请求头就可以
        api.get('/api/file/word/test', {
          params: {
            docName: '1.docx',
            date: '2020-05-20',
            arr: [1, 2, 3],
            gg: {
              ff: '22'
            }
          },
          headers: {
            'X-oss-DDSS': 'sdsd',
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          }
        }).then(res => {
          mammoth.convertToHtml({ arrayBuffer: this.toArrayBuffer(res.text.data) })
            .then(result => {
              document.getElementById('previewDoc').innerHTML = result.value
            }).done()
        }).catch(err => {
          this.$toast.error(err)
        })
      },
      toArrayBuffer(buffer) {
        const ab = new ArrayBuffer(buffer.length)
        const view = new Uint8Array(ab)
        for (var i = 0; i < buffer.length; ++i) {
          view[i] = buffer[i]
        }
        return ab
      },
      readFileInputEventAsArrayBuffer(file, callback) {
        const reader = new FileReader()
        reader.onload = function(loadEvent) {
          callback(loadEvent.target.result)
        }
        reader.readAsArrayBuffer(file)
      },
      previewDoc2() {
        if (!this.nodeFile) {
          return
        }
        console.log(this.nodeFile)
        this.readFileInputEventAsArrayBuffer(this.nodeFile, result => {
          mammoth.convertToHtml({ arrayBuffer: result })
            .then(result => {
              document.getElementById('previewDoc').innerHTML = result.value
            }).done()
        })
      },
      clear() {
        document.getElementById('previewDoc').innerHTML = ''
      }
    }
  }
</script>

<style scoped>

</style>
