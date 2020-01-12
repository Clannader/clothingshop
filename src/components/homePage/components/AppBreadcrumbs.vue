<template>
  <v-breadcrumbs
    :items="breadcrumbs"
    class="bread-content"
    v-if="isShow"
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
          // 其实这个第一次进来有点坑,如果是进入首页,由于不首页不加载该组件,导致不是第一次进来
          let views = []
          try {
            views = sessionStorage.getItem('addViews')
              ? JSON.parse(sessionStorage.getItem('addViews'))
              : []
          } catch (e) {
            views = []
          }
          if (!(views.length === 1 && views[0].name === 'Home')) {
            this.$store.commit('SetAddViews', views)
          }
          // 这里的意思是computed方法里面不建议对变量赋值
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          // this.isFirst = false

          // 可以使用这种方式赋值
          this.setFirst()
        }
        return this.$store.state.tagsView.addViews
      },
      isShow() {
        return this.$store.state.tagsView.currentRouter.name !== 'Home'
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
