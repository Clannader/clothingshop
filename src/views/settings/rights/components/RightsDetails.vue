<template>
  <app-dialog
    :visible="true"
    :title="title"
  >
    <template slot="dialogBtn">
      <v-btn depressed @click="action()">{{$t('homePage.confirm')}}</v-btn>
      <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
    </template>
  </app-dialog>
</template>

<script>
  export default {
    name: 'RightsDetails',
    data() {
      return {
        title: '',
        isNew: false,
      }
    },
    props: {
      recordId: {
        type: String,
        default: ''
      }
    },
    created() {
      this.isNew = this.publicMethods.isEmpty(this.recordId)
      if (this.isNew) {
        this.title = this.$t('rights.createGroup')
      } else {
        this.title = '编辑'
      }
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      },
      action() {

      }
    }
  }
</script>

<style scoped>

</style>
