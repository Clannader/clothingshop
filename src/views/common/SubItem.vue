<template>
  <div class="padding-16">
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        md="4"
        lg="3"
      >
        <v-card outlined>
          <menu-item
            :item="item"
            no-markdown
          >
            <v-list-item-action>
              <v-icon>mdi-arrow-right</v-icon>
            </v-list-item-action>
          </menu-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'SubItem',
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
      this.items = this.getItems(groupRouter.children)
    },
    methods: {
      getItems(items) {
        const temp = []
        items.map(item => {
          if (!item.meta.hidden) {
            temp.push(item)
          } else if (item.children && item.children.length > 0) {
            temp.push(this.getItems(item.children))
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

  .item-content {
    cursor: pointer;
    flex: 3;
    text-align: center;
    border-radius: 6px;
  }
</style>
