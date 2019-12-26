<template>
  <v-list-group
    :prepend-icon="item.meta.icon"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title v-text="$t(item.meta.title)"/>
      </v-list-item-content>
    </template>
    <template v-for="(child, i) in item.children">
      <menu-item
        :key="`sub-item-${i}`"
        :item="child"
        sub-item
      />
    </template>
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
            title: '',
            icon: ''
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
