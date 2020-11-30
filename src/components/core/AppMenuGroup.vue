<template>
  <v-list-group
    :group="group"
    :prepend-icon="subGroup ? '' : item.meta.icon"
    :sub-group="subGroup"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title v-text="$t(item.meta.title, item.meta.i18nParams)"/>
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in children">
      <app-menu-sub-group
        v-if="isShowGroupNav(child)"
        :key="`sub-group-${i}`"
        :item="child"
      />

      <app-menu-item
        v-else-if="!child.meta.hidden && !child.children"
        :key="`sub-item-${i}`"
        :item="child"
        sub-item
      />
    </template>
  </v-list-group>
</template>

<script>
  export default {
    name: 'AppMenuGroup',
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
    },
    methods: {
      isShowGroupNav(item) {
        // 是否显示大组的左侧栏
        // 有子路由,并且子路由个数不为0,并且不是收缩的状态
        if (item.meta.hidden) {
          return false
        }
        let len = item.children && item.children.length > 0 && !this.mini
        if (len) {
          // 如果子路由全部都隐藏则不显示
          len = item.children.find(child => !child.meta.hidden)
        }
        return len
      },
      genGroup(groupPath, children) {
        return children.map(item => {
          let group = `${groupPath}/${item.path}`

          if (item.children) {
            group = `${group}|${this.genGroup(item.path, item.children)}`
          }

          return group
        }).join('|')
      }
    },
    computed: {
      children() {
        return this.item.children.map(item => ({
          ...item,
          to: this.item.to ? `${this.item.to}/${item.path}` : `${this.item.path}/${item.path}`
        }))
      },
      group() {
        return this.genGroup(this.item.path, this.item.children)
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .v-list-group--sub-group .v-list-group__header {
    padding-left: 24px !important; /*从32变成了24*/
  }

  /deep/ .v-icon.v-icon{
    font-size: 20px;
  }
</style>
