<template>
  <app-dialog
    :visible="visible"
    :title="title"
  >
    <template slot="dialogContent">
      <v-form ref="form" v-model="valid">
        <app-shop-text-field
          :shopId.sync="configSchema.shopId"
          :label="$t('systemConfig.shopId')"
          :rules="shopIdRules"
          :init-shop="true"
        ></app-shop-text-field>
        <v-text-field
          v-model="configSchema.key"
          :label="$t('systemConfig.key')"
          :rules="configKeyRules"
        >
        </v-text-field>
        <v-text-field
          v-model="configSchema.value"
          :label="$t('systemConfig.value')"
          :rules="configValueRules"
        >
        </v-text-field>
        <v-text-field
          v-model="configSchema.desc"
          :label="$t('systemConfig.desc')">
        </v-text-field>
      </v-form>
    </template>
    <template slot="dialogBtn">
      <v-btn depressed @click="action()">{{$t('homePage.confirm')}}</v-btn>
      <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
    </template>
  </app-dialog>
</template>

<script>

  export default {
    name: 'ConfigDetails',
    props: {
      recordScheam: {
        type: Object,
        default: () => ({})
      },
      type: {
        type: String,
        required: true,
        default: 'ONE',
        validator: function(value) {
          return ['ONE', 'TWO'].includes(value)
        }
      }
    },
    data() {
      return {
        title: '', // 弹框标题
        isNew: false, // 判断是否是新建还是编辑
        configSchema: { // 表单提交对象
          shopId: undefined,
          key: undefined,
          value: undefined,
          desc: undefined,
          id: undefined
        },
        visible: true, // 是否隐藏弹框
        valid: true, // 校验表单是否正确
        children: '',
        shopIdRules: [
          v => !!v || `${this.$t('systemConfig.inputShopId')}`
        ],
        configKeyRules: [
          v => !!v || `${this.$t('systemConfig.inputConfigKey')}`
        ],
        configValueRules: [
          v => {
            return (this.type === 'ONE' || !!v) || `${this.$t('systemConfig.inputConfigValue')}`
          }
        ]
      }
    },
    created() {
      this.isNew = Object.keys(this.recordScheam).length === 0
      if (this.isNew) {
        this.title = this.$t('systemConfig.createConfig')
      } else {
        this.configSchema = this.recordScheam
        this.title = this.$t('systemConfig.modifyConfig', { name: this.configSchema.key })
      }
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      },
      action() {
        // if (this.$refs.form.validate()) {
        // }
      }
    }
  }
</script>

<style scoped>

</style>
