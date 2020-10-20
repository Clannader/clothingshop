<template>
  <app-dialog
    :visible="true"
    :title="$t('rights.selectGroup')"
  >
    <template slot="dialogContent">

    </template>
    <template slot="dialogBtn">
      <v-btn depressed @click="action()">{{$t('homePage.confirm')}}</v-btn>
      <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
    </template>
  </app-dialog>
</template>

<script>

  export default {
    name: 'RightsSelectDialog',
    data() {
      return {
        rightsCode: ''
      }
    },
    props: {
      rightsCodeParams: {
        type: String,
        default: ''
      }
    },
    created() {
      this.rightsCode = this.rightsCodeParams
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      },
      action() {
        this.$emit('closeDialog', '1000,2000')
      }
    }
  }
</script>

<style scoped>

</style>
