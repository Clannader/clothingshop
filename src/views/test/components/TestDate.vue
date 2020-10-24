<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <app-date-picker
              label="开始日期"
              :min="currentDate"
              :update-value.sync="startDate"
              :close-on-content-click="false"
              require
            ></app-date-picker>
          </div>
          <div class="group-item">
            <v-text-field
              v-model="days"
              label="天数"
              prepend-inner-icon="remove"
              append-icon="add"
              maxlength="3"
              @click:prepend-inner="removeDays"
              @click:append="addDays"
              class="input-require"
            ></v-text-field>
          </div>
          <div class="group-item">
            <app-date-picker
              label="结束日期"
              :min="startDate"
              :update-value.sync="endDate"
              :close-on-content-click="false"
              require
            ></app-date-picker>
          </div>
          <div style="padding-top: 16px;" class="card-search-btn">
            <v-btn rounded dark @click="getDateValue()">
              确定
            </v-btn>
            <v-btn rounded dark @click="getPDFValue()">
              获取PDF
            </v-btn>
            <v-btn rounded dark @click="initQRView">
              获取二维码
            </v-btn>
            <v-btn rounded dark @click="printPDF()">
              打印PDF
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-card>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div style="width: 50%; padding-right: 16px;">
            <v-file-input
              label="上传文件"
              accept=".doc,.docx,.mp4"
              show-size
              v-model="file"
            ></v-file-input>
          </div>
          <div style="padding-top: 16px;" class="card-search-btn">
            <v-btn rounded dark small @click="springBootUpLoad()">
              SpringBootUpload
            </v-btn>
          </div>
        </div>

        <div class="form-group">
          <div style="width: 50%; padding-right: 16px;">
            <v-file-input
              label="上传文件"
              accept=".doc,.docx,.mp4"
              show-size
              small-chips
              v-model="nodeFile"
              :loading="nodeShowProgress"
            >
              <v-progress-linear
                slot="progress"
                absolute
                height="4px"
                max="100"
                color="light-blue"
                striped
                v-model="nodeProgress"
              >
              </v-progress-linear>
              <template v-slot:selection="{ text }">
                <v-chip
                  small
                  label
                  color="primary"
                >
                  {{ text }}<span v-if="nodeShowProgress">(&nbsp;{{Math.floor(nodeProgress)}}&nbsp;%)</span>
                </v-chip>
              </template>
            </v-file-input>
          </div>
          <div style="padding-top: 16px;" class="card-search-btn">
            <v-btn rounded dark small @click="nodeJsUpLoad()">
              NodeJsUpload
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-card>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <v-textarea
            v-model="pdfText"
            label="PDF内容"
            hide-details
            outlined
            rows="3"
            row-height="15"
          ></v-textarea>
        </div>
      </v-container>
    </v-card>

    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <!--<video
            controls
            src="http://localhost:3000/video/video-1.mp4"
            style="width: 100%;height: 300px"
          ></video>-->
        </div>
      </v-container>
    </v-card>

    <app-pdf-dialog
      :visible="show"
      :pdf-content="pdfContent"
      :title="'预览PDF'"
      :width="1000"
      @close="pdfClose"
    ></app-pdf-dialog>

    <test-qr-code
      :visible="qrShow"
      :init-code="initCode"
      @close="qrShow = false"
    ></test-qr-code>

    <app-print ref="print"></app-print>
  </div>
</template>

<script>
  import api from '@/utils/request'
  import AppPdfDialog from '@/components/core/pdf/AppPdfDialog'
  import TestQrCode from './TestQrCode'
  import AppPrint from '@/components/core/AppPrint'
  import CryptoJS from 'crypto-js'

  export default {
    name: 'TestDate',
    components: {
      AppPdfDialog,
      TestQrCode,
      AppPrint
    },
    created() {
      this.currentDate = new Date().format()
      this.startDate = this.currentDate
      this.endDate = this.startDate.createMoment().add(this.days, 'days').format('YYYY-MM-DD')
    },
    data() {
      return {
        startDate: undefined,
        endDate: undefined,
        currentDate: undefined,
        days: 1,
        file: undefined,
        nodeFile: undefined,
        nodeProgress: 0,
        nodeShowProgress: false,
        pdfText: '',
        pdfContent: '',
        show: false,
        qrShow: false,
        initCode: ''
      }
    },
    methods: {
      removeDays() {
        if (this.days > 1) {
          --this.days
        } else {
          this.days = 0
        }
      },
      addDays() {
        this.days = ++this.days
      },
      springBootUpLoad() {
        /**
         * spring boot 上传文件写法
         */
        if (!this.file) {
          this.$toast.error('请选择文件')
          return
        }

        const fileName = this.file.name
        console.log(fileName)
        const fileSize = this.file.size
        console.log(fileSize)

        // 创建FormData对象
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('name', '我要传文件')
        formData.append('age', 27)
        api.post('/upload/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          this.$toast.success(res.msg)
        }).catch(err => {
          console.error(err)
        })
      },
      nodeJsUpLoad() {
        /**
         * 测试NodeJS 上传文件写法
         */
        if (!this.nodeFile) {
          this.$toast.error('请选择文件')
          return
        }

        // const fileName = this.nodeFile.name
        // const fileSize = this.nodeFile.size
        this.nodeShowProgress = true
        // 创建FormData对象
        const formData = new FormData()
        // 如果是多个,需要遍历append
        // formData.append('file', this.nodeFile[0])
        // formData.append('file', this.nodeFile[1])
        // 如果是单个,则直接写
        formData.append('file', this.nodeFile)
        formData.append('name', '我要传文件')
        formData.append('age', 27)
        api.post('/api/file/test/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: e => {
            if (e.lengthComputable) {
              this.nodeProgress = (e.loaded / e.total) * 100
            }
          }
        }).then(res => {
          this.$toast.success(res.msg)
        }).catch(err => {
          console.error(err)
        }).finally(() => {
          this.nodeShowProgress = false
          this.nodeProgress = 0
        })
      },
      getDateValue() {
        console.log('currentDate:' + this.currentDate)
        console.log('startDate:' + this.startDate)
        console.log('endDate:' + this.endDate)
      },
      async getPDFValue() {
        // api.post('/api/file/test/pdf', {
        //   num: this.days
        // }).then(res => {
        //   this.pdfContent = res.pdf
        //   this.show = true
        // }).catch(() => {})
        // const resp = await this.getReport()
        // if (resp) {
        //   this.pdfContent = resp.pdf
        //   this.show = true
        // }
        api.post('/api/file/pdf/test', {}).then(res => {
            this.pdfContent = res.pdf
            this.show = true
        }).catch(() => {})
      },
      async loginPMS() {
        const resp = await api.post(
          '/cmbg-api/user/login',
          {
            password: CryptoJS.SHA256('WYNwyn123456').toString().toUpperCase(),
            return_permisson: false,
            station: 'DEV-OLIVER',
            username: 'oliver'
          }, {
            headers: {
              hotelcode: 'staging22'
            }
          })
          .then(res => {
            // if (res.code === 1000) {
            //   console.log(res.credential)
            //   localStorage.setItem('cmbgAPI', res.credential)
            //   return res
            // } else {
            //   return null
            // }
            return res
          }).catch(err => {
            // console.error(err)
            // return null
            return err
          })

        if (resp.code === 1000) {
          console.log(resp.credential)
          localStorage.setItem('cmbgAPI', resp.credential)
          return resp
        } else {
          return null
        }
      },
      async getReport() {
        const resp = await api.post(
          '/cmbg-api/na/statistic/report/print_with_condition',
          {
            id: 97067,
            parameter_list: []
          }, {
            headers: {
              credential: localStorage.getItem('cmbgAPI') || '',
              hotelcode: 'staging22'
            }
          })
          .then(res => {
            // if (res.code === 1100) {
            //   console.log('进行登录')
            //   this.loginPMS().then(() => {
            //     console.log('登录成功')
            //     this.getReport()
            //   })
            // } else if (res.code === 1000) {
            //   return res
            // } else {
            //   return null
            // }
            return res
          }).catch(err => {
            // if (res.code === 1100) {
            //   console.log('进行登录')
            //   this.loginPMS().then(() => {
            //     console.log('登录成功')
            //     this.getReport()
            //   })
            // }
            return err
        })

        if (resp.code === 1100) {
          console.log('进行登录')
          const loginResp = await this.loginPMS().then(res => res).catch(() => null)
          if (loginResp) {
            console.log('登录成功')
            return this.getReport()
          } else {
            return null
          }
        } else if (resp.code === 1000) {
          return resp
        } else {
          return null
        }
      },
      pdfClose() {
        this.show = false
        this.pdfContent = undefined
      },
      printPDF() {
        api.post('/api/file/pdf/test', {}).then(res => {
          this.$refs.print.print(res.pdf)
        }).catch(() => {})
      },
      initQRView() {
        this.qrShow = true
        this.initCode = this.days + ''
      }
    },
    watch: {
      startDate: function(val) {
        if (!val) {
          return
        }
        this.endDate = this.startDate.createMoment().add(this.days, 'days').format('YYYY-MM-DD')
      },
      endDate: function(val) {
        if (!val) {
          return
        }
        this.days = this.endDate.createMoment().diff(this.startDate.createMoment(), 'days')
      },
      days: function(val) {
        this.endDate = this.startDate.createMoment().add(val, 'days').format('YYYY-MM-DD')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .group-item {
    padding-right: 24px;
    width: 20%;

    &:last-child {
      padding-right: 0px;
    }

    /deep/ .v-input input {
      text-align: center !important;
    }
  }

</style>
