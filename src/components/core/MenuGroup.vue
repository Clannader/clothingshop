<template>
  <v-list-group
    :prepend-icon="item.meta.icon"
  >

  </v-list-group>
</template>

<script>
  export default {
    name: 'MenuGroup',
    props: {
      item: {
        type: Object,
        default: () => ({
          meta: {
            icon: ''
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
