<template>
  <div>
    <p>这是一个B组件</p>
    <app-a
      v-bind="$attrs"
      v-on="$listeners">
      <template
        v-for="(vue, slot) in $slots"
        :slot="slot">
        <slot :name="slot"></slot>
      </template>
    </app-a>
<!--    <div slot="pane" slot-scope="msg">-->
<!--      <slot name="pane" :data="msg"></slot>-->
<!--    </div>-->
  </div>
</template>

<script>
  import AppA from './A'

  export default {
    inheritAttrs: true,
    name: 'B',
    components: {
      AppA
    }
  }
</script>

<style scoped>

</style>
