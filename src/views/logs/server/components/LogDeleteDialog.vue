<template>
  <app-dialog
    :visible="true"
    :title="$t('logs.deleteLogTitle')"
    :width="400"
  >
    <template #dialogContent>
      <div class="dialog-text">
        {{$t('logs.deleteLogConfirm', {name: logName})}}
      </div>
    </template>
    <template #dialogBtn>
      <v-btn depressed @click="action()">{{$t('homePage.confirm')}}</v-btn>
      <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
    </template>
  </app-dialog>
</template>

<script>
  import { deleteLogs } from '../api'

  export default {
    name: 'LogDeleteDialog',
    props: {
      logName: {
        type: String,
        default: ''
      }
    },
    created() {
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      },
      action() {
        deleteLogs({
          logName: this.logName
        }).then(() => {
          this.$toast.success(this.$t('homePage.deleteSuccess'))
        }).catch(() => {}).finally(() => {
          this.close()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-text {
    color: #333;
  }
</style>
