<template>
  <v-breadcrumbs
    :items="breadcrumbs"
    class="bread-content"
  >
    <template #item="{ item }">
      <v-breadcrumbs-item
        :disabled="item.disabled"
        @click="gotoView(item)"
      >
        <span class="bread-text">{{ $t(item.text, item.i18nParams) }}</span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    name: 'AppBreadcrumbs',
    data() {
      return {
        isFirst: true
      }
    },
    computed: {
      ...get('tagsView', ['currentRouter', 'addViews']),
      breadcrumbs() {
        // 是否第一次加载组件
        if (this.isFirst) {
          // 其实这个第一次进来有点坑,如果是进入首页,由于不是首页不加载该组件,导致不是第一次进来
          let views = []
          try {
            views = sessionStorage.getItem('addViews')
              ? JSON.parse(sessionStorage.getItem('addViews'))
              : []
          } catch (e) {
            views = []
          }
          // 避免有人删除sessionStorage里面的存的内容
          if (views.length === 0) {
            views.push({
              text: 'menu.home',
              path: '/home',
              disabled: false
            })
            // const current = this.$store.state.tagsView.currentRouter
            // 解决免登陆的时候,有多余的标签
            if (this.isShow && this.currentRouter.path !== '/home') {
              views.push({
                text: this.currentRouter.meta.title,
                path: this.currentRouter.fullPath,
                i18nParams: this.currentRouter.meta.i18nParams,
                disabled: true
              })
            }
          }
          // 如果仅有一个元素,并且第一个是Home页面,则不改变store里面的views
          // 当登录后进入Home,再点击其他页面的时候触发
          // if (!(views.length === 1 && views[0].name === 'Home')) {
          //   this.$store.commit('SetAddViews', views)
          // 我也忘记为什么调用commit了,这里居然不能调用dispatch
          // 因为dispatch会走addViews的方法,这里只能是单纯的保存值,所以用commit

          // 2021-05-04 这里发现一个很大很郁闷的bug啊,这个保存面包屑问题
          // 流程是这样的,先进入router,进行设置当前路由,会先进入afterEach来setAddViews
          // 然后setAddViews会进行commit addViews,然后再初始化页面AppBreadcrumbs
          // 进入这里,获取sessionStorage的值,再次提交addViews
          // 最后再进入router的setAddViews的then方法
          this.$store.commit('tagsView/addViews', views)
          // }
          // 这里的意思是computed方法里面不建议对变量赋值
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          // this.isFirst = false

          // 可以使用这种方式赋值
          this.setFirst()
        }
        return this.addViews
      },
      isShow() {
        return this.currentRouter.fullPath !== '/home'
      }
    },
    methods: {
      gotoView(router) {
        this.$router.push({
          path: router.path
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
    padding: 20px 16px 0px 16px;
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
