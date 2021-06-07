<template>
  <app-dialog
    :visible="visible"
    :title="$t('homePage.changPwdTitle')"
  >
    <template #dialogContent>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="oldPwd"
          :type="showPwd ? 'text' : 'password'"
          :label="$t('homePage.oldPwd')"
          :append-icon="showPwd ?'visibility_off' : 'visibility'"
          :rules="oldPwdRules"
          @click:append="changeShowPassword()"
        >
        </v-text-field>
        <v-text-field
          v-model="newPwd"
          :type="showPwd ? 'text' : 'password'"
          :label="$t('homePage.newPwd')"
          :append-icon="showPwd ?'visibility_off' : 'visibility'"
          :rules="newPwdRules"
          @click:append="changeShowPassword()"
        >
        </v-text-field>
        <v-text-field
          v-model="newPwd2"
          :type="showPwd ? 'text' : 'password'"
          :label="$t('homePage.newPwd2')"
          :append-icon="showPwd ?'visibility_off' : 'visibility'"
          :rules="newPwd2Rules"
          @click:append="changeShowPassword()"
        >
        </v-text-field>
      </v-form>
    </template>
    <template #dialogBtn>
      <v-btn depressed @click="action()">{{$t('homePage.confirm')}}</v-btn>
      <v-btn depressed @click="close()">{{$t('homePage.colse')}}</v-btn>
    </template>
  </app-dialog>
</template>

<script>
  import { changePassword } from './api'
  import CryptoJS from 'crypto-js'

  export default {
    name: 'ChangePassword',
    data() {
      return {
        valid: true, // 校验表单是否正确
        oldPwd: undefined,
        newPwd: undefined,
        newPwd2: undefined,
        oldPwdRules: [
          v => !!v || `${this.$t('homePage.inputOldPwd')}`,
          v => /^[\w]+$/.test(v) || `${this.$t('login.errorPassword')}`
        ],
        newPwdRules: [
          v => !!v || `${this.$t('homePage.inputNewPwd')}`,
          v => /^[\w]+$/.test(v) || `${this.$t('login.errorPassword')}`
        ],
        newPwd2Rules: [
          v => !!v || `${this.$t('homePage.inputNew2Pwd')}`,
          v => /^[\w]+$/.test(v) || `${this.$t('login.errorPassword')}`
        ],
        showPwd: false
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      },
      action() {
        if (this.$refs.form.validate() && this.checkPwd()) {
          changePassword({
            oldPwd: CryptoJS.SHA256(this.oldPwd).toString(),
            newPwd: CryptoJS.SHA256(this.newPwd).toString()
          }).then(() => {
            this.$emit('actionAfter')
          }).catch(() => {})
        }
      },
      checkPwd() {
        if (this.newPwd !== this.newPwd2) {
          this.$toast.error(this.$t('homePage.diffPwd'))
          return false
        }
        return true
      },
      changeShowPassword() {
        this.showPwd = !this.showPwd
      }
    }
  }
</script>

<style scoped>

</style>
