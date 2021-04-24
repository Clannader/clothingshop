<template>
  <div>
    <v-text-field
      v-model="obj.a"
      label="字段A">
    </v-text-field>
    <v-text-field
      v-model="obj.b"
      label="字段A">
    </v-text-field>
  </div>
</template>

<script>
  export default {
    name: 'TestData',
    props: {
      info: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      obj: {
        get() {
          return this.info
        },
        set(v) {
          this.$emit('update:info', v)
        }
      }
    }
  }
</script>

<style scoped>

</style>
