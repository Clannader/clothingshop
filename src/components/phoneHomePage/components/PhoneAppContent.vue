<template>
  <v-main>
    <v-container fluid class="main-content">
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-container>
  </v-main>
</template>

<script>
  export default {
    name: 'PhoneAppContent'
  }
</script>

<style lang="scss" scoped>
  .main-content {
    height: 100%;
    padding: 0;
    background-color: #ecf0f5;
  }
</style>
