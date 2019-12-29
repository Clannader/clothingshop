<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: 'SubItem',
    created() {
      // 获取当前路由的上级路由名,及上级路由的全部children
      const allRouter = this.$store.getters.menuRouter
      const current = this.$store.state.tagsView.currentRouter
      console.log(current)
    }
  }
</script>

<style scoped>

</style>
