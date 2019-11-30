<template>
  <v-content class="layout-content-box">
    <v-container fluid class="main-content">
      <router-view></router-view>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: 'AppContent'
  }
</script>

<style lang="scss" scoped>
  .layout-content-box /deep/ .v-content__wrap {
    height: 100% !important;
  }

  .main-content {
    height: 100%;
    padding: 0;
    background-color: #ecf0f5;
  }
</style>
