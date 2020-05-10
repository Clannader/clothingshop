<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <app-date-picker
              :label="'开始日期'"
              :newDatePicker.sync="startDate"
              :min="currentDate"
            ></app-date-picker>
          </div>
          <div class="group-item">
            <v-text-field
              type="number"
              :label="'天数'"
              v-model="days"
              prepend-inner-icon="remove"
              maxlength="3"
              @click:prepend-inner="days=remove(days)"
              append-icon="add"
              @click:append="days=add(days)"
            ></v-text-field>
          </div>
          <div class="group-item">
            <app-date-picker
              :label="'结束日期'"
              :newDatePicker.sync="endDate"
              :min="startDate"
            ></app-date-picker>
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
              single-line
              prepend-icon=""
              v-model="file"
            ></v-file-input>
          </div>
          <div style="padding-top: 16px;" class="card-search-btn">
            <v-btn rounded dark @click="springBootUpLoad()">
              SpringBootUpLoad
            </v-btn>
          </div>
        </div>

        <div class="form-group">
          <div style="width: 50%; padding-right: 16px;">
            <v-file-input
              label="上传文件"
              accept=".doc,.docx,.mp4"
              show-size
              single-line
              small-chips
              prepend-icon=""
              v-model="nodeFile"
            ></v-file-input>
          </div>
          <div style="padding-top: 16px;" class="card-search-btn">
            <v-btn rounded dark @click="nodeJsUpLoad()">
              NodeJsUpLoad
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  import api from '@/utils/request'

  export default {
    name: 'TestDate',
    created() {
    },
    data() {
      return {
        startDate: null,
        endDate: null,
        currentDate: null,
        days: 0,
        file: undefined,
        nodeFile: undefined
      }
    },
    methods: {
      remove(days) {

      },
      add(days) {

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
          }
        }).then(res => {
          this.$toast.success(res.msg)
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .group-item {
    padding-right: 24px;
    width: 30%;
    &:last-child{
      padding-right: 0px;
    }
  }
</style>
