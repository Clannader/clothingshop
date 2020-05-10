<template>
  <div>
    <p>这里是A.vue的消息:{{msg}}</p>
    <slot name="msg"></slot>
    <p>--------分隔符----------</p>
    <slot name="name"></slot>
    <p>这里是A.vue的名字:{{name}}</p>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'A',
    props: {
      msg: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>

</style>
