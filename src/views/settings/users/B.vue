<template>
  <div>
    <p>这是一个B组件</p>
    <app-a
      v-bind="$attrs"
      v-on="$listeners"></app-a>
  </div>
</template>

<script>
  import AppA from './A'

  export default {
    inheritAttrs: true,
    name: 'B',
    components: {
      AppA
    }
  }
</script>

<style scoped>

</style>
