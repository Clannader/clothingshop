<template>
  <v-list-item
    @click="gotoView(item)"
  >
    <v-list-item-icon>
      <v-icon v-text="item.meta.icon"/>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="$t(item.meta.title)"/>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: {
      item: {
        type: Object,
        default: () => ({
          meta: {
            icon: '',
            title: ''
          }
        })
      }
    },
    methods: {
      gotoView(router) {
        this.$router.push({
          name: router.name
        })
      }
    }
  }
</script>

<style scoped>

</style>
