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
        // 是否第一次加载组件
        if (this.isFirst) {
          let views = []
          try {
            views = JSON.parse(sessionStorage.getItem('addViews'))
          } catch (e) {
            views = []
          }
          this.$store.commit('SetAddViews', views)
          // 这里的意思是computed方法里面不建议对变量赋值
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          // this.isFirst = false

          // 可以使用这种方式赋值
          this.setFirst()
        }
        return this.$store.state.tagsView.addViews
      }
    },
    methods: {
      gotoView(router) {
        this.$router.push({
          name: router.name
        })
      },
      setFirst() {
        this.isFirst = false
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
