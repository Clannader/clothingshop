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
      v-if="!slotItem"
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
  </v-select>
</template>

<script>
  export default {
    inheritAttrs: true,
    name: 'AppSelect',
    props: {
      slotItem: Boolean,
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
