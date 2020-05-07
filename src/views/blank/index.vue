<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Blank',
    props: {
      msg: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
