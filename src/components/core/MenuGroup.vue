<template>
  <v-list-group
    :prepend-icon="subGroup ? '' : item.meta.icon"
    :sub-group="subGroup"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title v-text="$t(item.meta.title)"/>
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in item.children">
      <menu-sub-group
        v-if="child.children && child.children.length > 0"
        :key="`sub-group-${i}`"
        :item="child"
      />

      <menu-item
        v-else
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
      },
      subGroup: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .v-list-group--sub-group .v-list-group__header {
    padding-left: 32px !important;
  }
</style>
