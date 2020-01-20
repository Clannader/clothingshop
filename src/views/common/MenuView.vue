<template>
  <div class="padding-16">
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-hover>
          <template v-slot="{ hover }">
            <v-card outlined :elevation="hover ? 10 : 3">
              <menu-item
                :item="item"
                no-markdown
                view-item
              >
                <v-list-item-action>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-list-item-action>
              </menu-item>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'MenuView',
    data() {
      return {
        items: []
      }
    },
    created() {
      // 获取当前路由的上级路由名,及上级路由的全部children
      const allRouter = this.$store.getters.menuRouter
      const current = this.$store.state.tagsView.currentRouter
      // 因为这里进来的都是通过重定向进来的,所以这样重定向的值肯定是有的,那么他的值就是那个大组的
      let redirect = current.redirectedFrom || current.fullPath
      // 刷新页面时,redirect的值在最后会加多一个/
      if (redirect.endsWith('/')) {
        redirect = redirect.substring(0, redirect.length - 1)
      }
      const groupRouter = allRouter.find(route => redirect === `/${route.path}`)
      this.items = this.getAllItems(groupRouter.path, this.publicMethods.extend(true, [], groupRouter.children))
    },
    methods: {
      isShowGroupNav(item) {
        if (item.meta.hidden) {
          return false
        }
        let len = item.children && item.children.length > 0
        if (len) {
          // 如果子路由全部都隐藏则不显示
          len = item.children.find(child => !child.meta.hidden)
        }
        return len
      },
      isShowItemNav(item) {
        return !item.meta.hidden && !item.children
      },
      getAllItems(groupPath, items) {
        let temp = []
        items.map(item => {
          const to = item.to ? item.to : groupPath
          if (this.isShowGroupNav(item)) {
            temp = temp.concat(this.getAllItems(to, item.children))
          } else if (this.isShowItemNav(item)) {
            item.to = `${to}/${item.path}`
            temp.push(item)
          }
        })
        return temp
      }
    }
  }
</script>

<style lang="scss" scoped>
  .padding-16 {
    padding: 16px;
  }
</style>
