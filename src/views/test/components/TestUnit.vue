<template>
  <div>
    <span>{{msg}}</span>
    <span>{{number}}</span>
  </div>
</template>

<script>
  export default {
    name: 'TestUnit',
    props: {
      msg: {
        type: String,
        default: ''
      },
      number: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped>

</style>
