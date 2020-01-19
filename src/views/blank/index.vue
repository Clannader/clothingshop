<template>
  <div>
    <v-btn @click="test">测试</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'Blank',
    methods: {
      async test() {
        await this.$store.dispatch('changeRoles')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
