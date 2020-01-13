<template>
  <div>
    <template v-for="(item,index) in items">
      <v-card :key="index">
        <div>
          <div v-text="$t(item.meta.title)"/>
        </div>
      </v-card>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SubItem',
    data() {
      return {
        items: []
      }
    },
    created() {
      // 获取当前路由的上级路由名,及上级路由的全部children
      const allRouter = this.$store.getters.menuRouter
      const current = this.$store.state.tagsView.currentRouter
      // 因为这里进来的都是通过重定向进来的,所以这样重定向的值肯定是有的,那么他的值就是那个大组的
      let redirect = current.redirectedFrom || current.fullPath
      // 刷新页面时,redirect的值在最后会加多一个/
      if (redirect.endsWith('/')) {
        redirect = redirect.substring(0, redirect.length - 1)
      }
      const groupRouter = allRouter.find(route => redirect === `/${route.path}`)
      this.items = groupRouter.children
    }
  }
</script>

<style scoped>

</style>
