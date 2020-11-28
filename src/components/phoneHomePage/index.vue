<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import ChangeMeta from '@/mixins/change-meta'
  export default {
    name: 'PhoneHomePage',
    mixins: [ChangeMeta]
  }
</script>

<style scoped>

</style>
