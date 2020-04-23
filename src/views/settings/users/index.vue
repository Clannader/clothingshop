<template>
  <div>
    <app-b
    :msg="'B组件给A的消息'">
      <template slot="app"><h1>B的插槽</h1></template>
      <template slot="pane">
        <h1>B的插槽2</h1>
      </template>
    </app-b>
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
    data() {
      return {
        msg: 'AASSS'
      }
    },
    name: 'SettingsUsers'
  }
</script>

<style scoped>

</style>
