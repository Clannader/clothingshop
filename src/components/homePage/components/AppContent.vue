<template>
  <v-content class="layout-content-box">
    <v-container fluid class="main-content">
      <app-breadcrumbs></app-breadcrumbs>
      <router-view></router-view>
    </v-container>
  </v-content>
</template>

<script>
  import AppBreadcrumbs from './AppBreadcrumbs'

  export default {
    name: 'AppContent',
    components: {
      AppBreadcrumbs
    }
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
