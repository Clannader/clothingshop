<template>
  <div>
    <router-view></router-view>
    <phone-app-footer></phone-app-footer>
  </div>
</template>

<script>
  import PhoneAppFooter from './components/PhoneAppFooter'

  export default {
    name: 'PhoneHomePage',
    components: {
      PhoneAppFooter
    }
  }
</script>

<style scoped>

</style>
