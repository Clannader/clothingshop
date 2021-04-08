<template>
  <v-select
    v-model="selectValue"
    v-bind="$attrs"
    v-on="$listeners"
    item-value="code"
    item-text="desc"
    :menuProps="['offsetY']"
    @change="change"
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
      v-else
      v-for="(vue, slot) in $scopedSlots"
      :slot="slot"
      slot-scope="record"
    >
      <slot :name="slot" v-bind="record"></slot>
    </template>
  </v-select>
</template>

<script>
  export default {
    inheritAttrs: true,
    name: 'AppSelect',
    props: {
      customItem: Boolean, // 有值时才使用封装内的样式
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
      }
    },
    created() {
      this.selectValue = this.updateValue
    },
    watch: {
      // updateValue: {
      //   handler(newVal) {
      //     this.selectValue = newVal
      //   },
      //   deep: true
      // }
    }
  }
</script>

<style scoped>

</style>
