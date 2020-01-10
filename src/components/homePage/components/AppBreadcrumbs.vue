<template>
  <v-breadcrumbs
    :items="breadcrumbs"
    class="bread-content"
  />
</template>

<script>
  export default {
    name: 'AppBreadcrumbs',
    data() {
      return {
        breadcrumbs: [
          {
            text: 'Dashboard',
            disabled: false,
            to: 'breadcrumbs_dashboard'
          },
          {
            text: 'Link 1',
            disabled: false,
            to: 'breadcrumbs_link_1'
          },
          {
            text: 'Link 2',
            disabled: true,
            to: 'breadcrumbs_link_2'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bread-content {
    padding: 24px 12px 0px 16px;
  }
</style>
