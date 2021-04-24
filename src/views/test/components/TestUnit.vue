<template>
  <div>
    <span>{{msg}}</span>
    <span>{{number}}</span>
    <test-data :info.sync="info"></test-data>
    <v-btn rounded dark @click="action()">
      测试数据回调
    </v-btn>
  </div>
</template>

<script>
  import TestData from './TestData'
  export default {
    name: 'TestUnit',
    components: {
      TestData
    },
    props: {
      msg: {
        type: String,
        default: ''
      },
      number: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        info: {}
      }
    },
    methods: {
      action() {
        console.log(this.info)
      }
    }
  }
</script>

<style scoped>

</style>
