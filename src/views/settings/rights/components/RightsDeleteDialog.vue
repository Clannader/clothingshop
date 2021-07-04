<template>
  <app-dialog
    :visible="true"
    :title="$t('rights.deleteGroup')"
    :width="400"
  >
    <template #dialogContent>
      <div class="dialog-text">
        {{$t('rights.confirmDelete', {name: rightsSchema.groupName})}}
      </div>
    </template>
    <template #dialogBtn>
      <v-btn depressed @click="action()">{{$t('homePage.confirm')}}</v-btn>
      <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
    </template>
  </app-dialog>
</template>

<script>
  import { deleteRights } from '../api'

  export default {
    name: 'RightsDeleteDialog',
    data() {
      return {
        rightsSchema: {
          groupName: undefined
        }
      }
    },
    props: {
      recordScheam: {
        type: Object,
        default: () => ({})
      }
    },
    created() {
      this.rightsSchema = this.recordScheam
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      },
      action() {
        deleteRights({
          id: this.rightsSchema._id
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
