<template>
  <v-select
    v-model="selectValue"
    v-bind="$attrs"
    v-on="$listeners"
    item-value="code"
    item-text="desc"
    :menuProps="$attrs.menuProps ? $attrs.menuProps: ['offsetY']"
    @change="change"
    :no-data-text="$t('homePage.emptyText')"
    :class="{'visible-selected': selectAllItem}"
    :multiple="selectAllItem"
  >
    <template
      v-slot:item="{ item, attrs, on }"
      v-if="customItem"
    >
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item-title
          v-text="item.desc + ' (' + item.code + ')'"
        >
        </v-list-item-title>
      </v-list-item>
    </template>
    <template
      v-if="selectAllItem"
      v-slot:prepend-item
    >
      <div style="position: sticky;top: 0;z-index: 2">
        <v-list-item
          ripple
          @click="toggle"
          style="background-color: #fff"
          v-if="$attrs.items.length > 0"
        >
          <v-list-item-action>
            <v-icon :color="selectValue.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t('homePage.selectAll2')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </template>
    <template
      v-for="(vue, slot) in $scopedSlots"
      :slot="slot"
      slot-scope="record"
    >
      <slot :name="slot" v-bind="record"></slot>
    </template>
    <template
      v-for="(vue, slot) in $slots"
      :slot="slot"
    >
      <slot :name="slot"></slot>
    </template>
  </v-select>
</template>

<script>
  export default {
    inheritAttrs: true,
    name: 'AppSelect',
    props: {
      customItem: Boolean, // 开启使用组件内自定义插槽
      selectAllItem: Boolean, // 开启使用全选按钮
      // 控件更新子组件字段值
      updateValue: {
        type: null,
        default: undefined
      }
    },
    data() {
      return {
        selectValue: undefined
      }
    },
    methods: {
      change() {
        this.$emit('update:updateValue', this.selectValue)
        this.$emit('changeValue')
      },
      toggle() {
        this.$nextTick(() => {
          if (this.likesAllCollection) {
            this.selectValue = []
          } else {
            this.selectValue = this.$attrs.items.map(v => v.code)
          }
          this.change()
        })
      }
    },
    created() {
      this.selectValue = this.updateValue
    },
    watch: {
      updateValue(newVal) {
        this.selectValue = newVal
        // this.$emit('update:updateValue', newVal)
      }
    },
    computed: {
      likesAllCollection() {
        return this.selectValue.length === this.$attrs.items.length
      },
      likesSomeCollection() {
        return this.selectValue.length > 0 && !this.likesAllCollection
      },
      icon() {
        if (this.likesAllCollection) return 'mdi-checkbox-marked'
        if (this.likesSomeCollection) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-list {
    padding: 0;
  }
</style>
