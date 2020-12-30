<template>
  <v-text-field
    v-model="textValue"
    v-bind="$attrs"
    v-on="$listeners"
    clearable
    @click:clear="clearText"
    @keyup.enter="changeValue"
    @input="update"
  >
  </v-text-field>
</template>

<script>
  export default {
    inheritAttrs: true,
    name: 'AppTextField',
    props: {
      updateValue: {
        type: null,
        default: undefined
      }
    },
    data() {
      return {
        textValue: undefined
      }
    },
    methods: {
      update() {
        this.$emit('update:updateValue', this.textValue)
      },
      clearText() {
        this.textValue = undefined
        this.update()
        this.changeValue()
      },
      changeValue() {
        this.$emit('changeValue')
      }
    },
    created() {
      this.textValue = this.updateValue
    }
  }
</script>

<style scoped>

</style>
