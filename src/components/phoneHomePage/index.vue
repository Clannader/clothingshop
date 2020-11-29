<template>
  <div>
    <router-view></router-view>
    <phone-app-footer></phone-app-footer>
  </div>
</template>

<script>
  import PhoneAppFooter from './components/PhoneAppFooter'
  import ChangeMeta from '@/mixins/change-meta'

  export default {
    name: 'PhoneHomePage',
    components: {
      PhoneAppFooter
    },
    mixins: [ChangeMeta]
  }
</script>

<style scoped>

</style>
