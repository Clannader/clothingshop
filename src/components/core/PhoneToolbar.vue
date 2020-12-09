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

    <template v-for="(item, i) in iconItem">
      <v-btn
        :key="i"
        icon
        @click="iconClick(item.name)"
      >
        <v-icon>
          {{snakeCase(item.name)}}
        </v-icon>
      </v-btn>
    </template>

    <template
      v-slot:extension
      v-if="$slots.extension && !extension"
    >
      <slot name="extension"></slot>
    </template>
    <template
      v-slot:extension
      v-else-if="extension"
    >
      <v-text-field
        filled
        dense
        hide-details
        clearable
        rounded
        append-outer-icon="search"
        v-on="$listeners"
      >
      </v-text-field>
    </template>
  </v-app-bar>
</template>

<script>
  import { get } from 'vuex-pathify'
  import snakeCase from 'lodash/snakeCase'
  import kebabCase from 'lodash/kebabCase'

  export default {
    name: 'PhoneToolbar',
    props: {
      // 这里很神奇哦,按钮的排序如果是循环加进去的话
      // 顺序与这里声明的顺序有关系
      refreshIcon: Boolean,
      sortIcon: Boolean,
      zoomInIcon: Boolean,
      replayIcon: Boolean,
      searchIcon: Boolean,
      moreVertIcon: Boolean,
      // 是个显示自定义插槽
      extension: Boolean
    },
    data() {
      return {
        iconItem: []
      }
    },
    created() {
      // 这里需要自定义按钮图标,遍历this里面的字段是以Icon结尾的就是btn
      for (const key in this) {
        if (key.endsWith('Icon') && this[key]) {
          this.iconItem.push({
            name: key.replace('Icon', '')
          })
        }
      }
    },
    computed: {
      ...get('tagsView', ['currentRouter@meta'])
    },
    methods: {
      goback() {
        this.$router.back(-1)
      },
      iconClick(eventName) {
        this.$emit('click:' + kebabCase(eventName))
      },
      snakeCase() {
        return snakeCase.apply(this, arguments)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-toolbar__title {
    font-size: 1rem;
  }
</style>
