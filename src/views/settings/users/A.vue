<template>
  <div>
    <p>这是一个A组件</p>
    <p>这是一个A组件消息:{{msg}}</p>
  </div>
</template>

<script>
  export default {
    name: 'A',
    props: {
      msg: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>

</style>
