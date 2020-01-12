<template>
  <v-breadcrumbs
    :items="breadcrumbs"
    class="bread-content"
  >
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :disabled="item.disabled"
        @click="gotoView(item)"
      >
        <span class="bread-text">{{ $t(item.text) }}</span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
  export default {
    name: 'AppBreadcrumbs',
    data() {
      return {
        isFirst: true
      }
    },
    computed: {
      breadcrumbs() {
        return this.$store.state.tagsView.addViews
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

<style lang="scss" scoped>
  .bread-content {
    padding: 24px 16px 0px 16px;
  }

  .bread-text {
    color: $bg-blue;
    cursor: pointer;
  }

  .v-breadcrumbs__item--disabled {
    .bread-text {
      color: rgba(0, 0, 0, .38);
    }
  }
</style>
