<template>
  <div>
    <app-dialog
      :visible="visible"
      :title="title"
    >
      <template #dialogContent>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="rightsSchema.groupName"
            :label="$t('rights.groupName')"
            :rules="groupNameRules"
          >
          </v-text-field>
          <v-text-field
            v-model="rightsSchema.desc"
            :label="$t('rights.groupDesc')">
          </v-text-field>
          <v-text-field
            v-model="rightsSchema.rightsCode"
            :label="$t('rights.rightsCodes')"
            :rules="rightsCodeRules"
            :append-icon="'toc'"
            readonly
            @click:append="openRightsCode()"
          >
          </v-text-field>
        </v-form>
      </template>
      <template #dialogBtn>
        <v-btn depressed @click="action()">{{$t('homePage.confirm')}}</v-btn>
        <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
      </template>
    </app-dialog>
    <component
      :is="children"
      :rightsCodeParams="rightsSchema.rightsCode"
      @closeDialog="closeDialog"
    ></component>
  </div>
</template>

<script>
  import { saveRights } from '../api'
  import RightsSelectDialog from './RightsSelectDialog'

  export default {
    name: 'RightsDetails',
    data() {
      return {
        title: '', // 弹框标题
        isNew: false, // 判断是否是新建还是编辑
        rightsSchema: { // 表单提交对象
          groupName: undefined,
          desc: undefined,
          rightsCode: undefined,
          id: undefined
        },
        visible: true, // 是否隐藏弹框
        valid: true, // 校验表单是否正确
        groupNameRules: [
          v => !!v || `${this.$t('rights.inputGroupName')}`,
          v => /^[A-Za-z]+$/.test(v) || `${this.$t('rights.errorGroupName')}`
        ],
        rightsCodeRules: [
          v => !!v || `${this.$t('rights.inputRightsCode')}`,
          v => /^(\-?([1-9]{1}\d{3}|[A-Za-z]{2,15}),)*(?=(\-?([1-9]{1}\d{3}|[A-Za-z]{2,15}))$)/.test(v) || `${this.$t('rights.errorRightsCode')}`
        ],
        children: ''
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
        if (this.$refs.form.validate()) {
          this.saveRightsCode()
        }
      },
      saveRightsCode() {
        if (!this.isNew) {
          this.rightsSchema.id = this.rightsSchema._id
        }
        saveRights(this.isNew, this.rightsSchema).then(res => {
          this.$toast.success(res.msg)
          this.close()
        }).catch(() => {}).finally(() => {})
      },
      openRightsCode() {
        this.visible = false
        this.children = RightsSelectDialog
      },
      closeDialog(resultCodes) {
        this.visible = true
        this.children = ''
        if (!this.publicMethods.isEmpty(resultCodes)) {
          this.rightsSchema.rightsCode = resultCodes
        }
      }
    }
  }
</script>

<style scoped>

</style>
