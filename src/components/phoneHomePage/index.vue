<template>
  <v-app id="cmsApp">
    <phone-app-toolbar></phone-app-toolbar>
    <phone-app-navigation></phone-app-navigation>
    <phone-app-content></phone-app-content>
  </v-app>
</template>

<script>
  import PhoneAppToolbar from './components/PhoneAppToolbar'
  import PhoneAppContent from './components/PhoneAppContent'
  import PhoneAppNavigation from './components/PhoneAppNavigation'

  export default {
    name: 'PhoneHomePage',
    components: {
      PhoneAppToolbar,
      PhoneAppContent,
      PhoneAppNavigation
    }
  }
</script>

<style scoped>

</style>
