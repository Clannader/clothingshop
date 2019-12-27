<template>
  <menu-group
    :item="item"
    sub-group
  >
  </menu-group>
</template>

<script>
  export default {
    name: 'MenuSubGroup',
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
