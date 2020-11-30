<template>
  <app-menu-group
    :item="item"
    sub-group
  >
  </app-menu-group>
</template>

<script>
  export default {
    name: 'AppMenuSubGroup',
    props: {
      item: {
        type: Object,
        default: () => ({
          meta: {
            title: '',
            icon: ''
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
