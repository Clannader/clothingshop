<template>
  <v-main>
    <v-container fluid class="main-content">
      <v-fade-transition mode="out-in">
        <menu-carousel></menu-carousel>
      </v-fade-transition>
    </v-container>
  </v-main>
</template>

<script>
  import MenuCarousel from '../content/MenuCarousel'

  export default {
    name: 'PhoneAppContent',
    components: {
      MenuCarousel
    }
  }
</script>

<style lang="scss" scoped>
  .main-content {
    height: 100%;
    padding: 0;
    background-color: #fff;
  }
</style>
