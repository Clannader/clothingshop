<template>
  <div>
    <p>这里是B.vue的消息:{{msg}}</p>
    <a-test v-bind="$attrs" v-on="$listeners">
      <template
        v-for="(vue, slot) in $slots"
        :slot="slot"
        slot-scope="row">
        <slot :name="slot" :record="row"></slot>
      </template>
    </a-test>
    <p>这里是B.vue的属性值:{{age}}</p>
    <slot name="age"></slot>
  </div>
</template>

<script>
  import ATest from './A'

  export default {
    name: 'B',
    inheritAttrs: true,
    components: {
      ATest
    },
    props: {
      msg: {
        type: String,
        default: ''
      },
      age: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped>

</style>
