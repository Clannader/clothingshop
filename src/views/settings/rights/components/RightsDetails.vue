<template>
  <app-dialog
    :visible="visible"
    :title="title"
  >
    <template slot="dialogContent">
      <v-text-field
        v-model="rightsSchema.groupName"
        :label="$t('rights.groupName')">
      </v-text-field>
      <v-text-field
        v-model="rightsSchema.desc"
        :label="$t('rights.groupDesc')">
      </v-text-field>
      <v-text-field
        v-model="rightsSchema.rightsCode"
        :label="$t('rights.rightsCodes')">
      </v-text-field>
    </template>
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
        rightsSchema: {
          groupName: undefined,
          desc: undefined,
          rightsCode: undefined
        },
        visible: true
      }
    },
    props: {
      recordScheam: {
        type: Object,
        default: () => ({})
      }
    },
    created() {
      this.isNew = Object.keys(this.recordScheam).length === 0
      if (this.isNew) {
        this.title = this.$t('rights.createGroup')
      } else {
        this.rightsSchema = this.recordScheam
        this.title = this.$t('rights.modifyGroup', { name: this.rightsSchema.groupName })
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
