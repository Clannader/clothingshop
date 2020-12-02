<template>
  <div
    class="text-icon"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-icon :small="small">{{icon}}</v-icon>
    <span :class="{'span-small':small}">{{text}}</span>
  </div>
</template>

<script>
  export default {
    inheritAttrs: true,
    name: 'AppTextIcon',
    props: {
      icon: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      small: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;

    i {
      margin-right: 5px;
    }

    span {
      letter-spacing: .5px;
      line-height: 14px;
      &.span-small{
        font-size: 12px;
        line-height: 12px;
      }
    }
  }
</style>
