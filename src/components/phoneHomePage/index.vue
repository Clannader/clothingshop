<template>
  <v-app id="cmsApp">
    <phone-app-toolbar></phone-app-toolbar>
    <phone-app-content></phone-app-content>
  </v-app>
</template>

<script>
  import PhoneAppToolbar from './components/PhoneAppToolbar'
  import PhoneAppContent from './components/PhoneAppContent'

  export default {
    name: 'PhoneHomePage',
    components: {
      PhoneAppToolbar,
      PhoneAppContent
    }
  }
</script>

<style scoped>

</style>
