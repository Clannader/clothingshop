<template>
  <v-app-bar
    app
    dark
    flat
    fixed
    height="50"
    :src="require('@/assets/images/vbanner.png')"
    color="primary"
  >
    <v-app-bar-nav-icon @click="goback()">
      <v-icon>
        arrow_back
      </v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>{{$t(meta.title)}}</v-toolbar-title>
    <v-spacer></v-spacer>

    <slot name="icon"></slot>
    <template
      v-slot:extension
      v-if="$slots.extension"
    >
      <slot name="extension"></slot>
    </template>
  </v-app-bar>
</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    name: 'PhoneToolbar',
    computed: {
      ...get('tagsView', ['currentRouter@meta'])
    },
    methods: {
      goback() {
        this.$router.back(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-toolbar__title{
    font-size: 1rem;
  }
</style>
