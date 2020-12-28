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
      slotItem: Boolean
    },
    data() {
      return {
        selectValue: undefined
      }
    },
    methods: {
      change() {
        this.$emit('update:selected', this.selectValue)
        this.$emit('changeValue')
      }
    }
  }
</script>

<style scoped>

</style>
