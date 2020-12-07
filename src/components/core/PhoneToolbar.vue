<template>
  <v-app-bar
    app
    dark
    flat
    fixed
    height="50"
    :src="require('@/assets/images/vbanner.png')"
    color="primary"
  >
    <v-app-bar-nav-icon
    >
    </v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-btn
      icon
    >
      <v-icon>
        mdi-apps
      </v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
  export default {
    name: 'PhoneToolbar'
  }
</script>

<style scoped>

</style>
