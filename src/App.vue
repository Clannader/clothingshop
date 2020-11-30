<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
  import ChangeMeta from '@/mixins/change-meta'

  export default {
    name: 'App',
    mixins: [ChangeMeta]
  }
</script>

<style>
</style>
