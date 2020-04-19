<template>
  <div>
    <app-b
    :msg="'B组件给A的消息'"></app-b>
  </div>
</template>

<script>
  import AppB from './B'
  export default {
    components: {
      AppB
    },
    created() {

    },
    name: 'SettingsUsers'
  }
</script>

<style scoped>

</style>
