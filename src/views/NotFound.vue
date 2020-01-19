<template>
  <div>
    <v-btn @click="gotoHome">返回首页</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
    methods: {
      gotoHome() {
        this.$router.push({
          path: '/home'
        })
      }
    }
  }
</script>

<style scoped>

</style>
