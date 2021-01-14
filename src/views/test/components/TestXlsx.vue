<template>
  <div>
    <div class="card-bottom card-round-btn">
      <v-btn rounded @click="importFile()">导入</v-btn>
      <v-btn rounded @click="downloadFile()">下载</v-btn>
    </div>
    <v-card class="card-body" style="margin-bottom: 20px">
      <v-file-input
        label="上传文件"
        accept=".csv,.xlsx"
        show-size
        small-chips
        v-model="xlsxFile"
      >
      </v-file-input>
    </v-card>
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  import { saveAs } from 'file-saver'

  export default {
    name: 'TestXlsx',
    data() {
      return {
        xlsxFile: undefined,
        downData: [
          ['Alle', '12'],
          ['Dader', '334']
        ]
      }
    },
    methods: {
      async importFile() {
        if (!this.xlsxFile) {
          return
        }
        const [err, data] = await this.loadFile(this.xlsxFile)
          .then(res => [null, res]).catch(err => [err])
        if (err) {
          return
        }
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        for (const sheet in workbook.Sheets) {
          const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
          console.log(sheetArray)
        }
      },
      loadFile(file) {
        if (typeof FileReader === 'undefined') {
          // 你的浏览器不支持FileReader
          console.error('你的浏览器不支持FileReader')
          return Promise.reject('你的浏览器不支持FileReader')
        }
        const fileReader = new FileReader()
        fileReader.readAsBinaryString(file) // 设置读取的类型
        return new Promise(resolve => {
          fileReader.onload = e => {
            resolve(e.target.result)
          }
        })
      },
      downloadFile() {
        if (this.downData.length === 0) {
          return
        }
        const ws = XLSX.utils.aoa_to_sheet(this.downData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')

        const option = {
          type: 'buffer', // base64或者buffer
          bookType: 'xlsx'
        }
        const buffer = XLSX.write(wb, option)

        // buffer 类型的
        const arrByte = Buffer.from(buffer, 'binary')
        saveAs(new Blob([arrByte], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'Text.xlsx')

        // base64字节的
        // saveAs(this.publicMethods.base64ToBlob(buffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'), 'Text.xlsx')
      }
    }
  }
</script>

<style scoped>

</style>
