<template>
  <div class="loginBox">
    <div v-if="hackReset" class="loginContentBox">
      <div class="headerBox">
        <h2>{{$t('login.title')}}/
          <small>{{$t('login.login')}}</small>
        </h2>
      </div>
      <div class="formBox">
        <v-form ref="form" v-model="valid">
          <div class="inputBox">
            <v-combobox
              v-model="userName"
              :rules="userNameRules"
              :items="userNameList"
              :placeholder="$t('login.userName')"
              prepend-inner-icon="iconfont icon-c-login-user"
            ></v-combobox>
          </div>
          <div class="inputBox">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :placeholder="$t('login.password')"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="iconfont icon-c-pws"
              :append-icon="showPassword ?'visibility_off' : 'visibility'"
              name="input-10-1"
              @click:append="changeShowPassword()"
            ></v-text-field>
          </div>
          <div class="inputBox">
            <v-select
              v-model="language"
              :items="languageList"
              item-text="desc"
              item-value="code"
              prepend-inner-icon="iconfont icon-c-language"
              @change="languagesChange(language)"
            ></v-select>
          </div>
        </v-form>
      </div>
      <div class="loginBtnBox">
        <v-btn @click="submit()">{{$t('login.login')}}</v-btn>
      </div>
      <div class="bottomBtn">
        <div>
          <v-checkbox
            v-model="isRemember"
            :label="$t('login.rememberMe')"
            height="14px"
            color="primary"
          ></v-checkbox>
        </div>
        <a href="javascript:void (0)">{{$t('login.forgot')}}?</a>
      </div>
    </div>
  </div>
</template>

<script scope>
  import { login } from './api.js'
  import CryptoJS from 'crypto.js'

  export default {
    data() {
      return {
        hackReset: true,
        isRemember: true,
        showPassword: false,
        valid: true,
        userName: '',
        userNameRules: [
          v => !!v || `${this.$t('login.userName')}`,
          v => /^[\w\u4e00-\u9fa5\@\.]+$/.test(v) || `${this.$t('login.errorUsername')}`
        ],

        password: '',
        passwordRules: [
          v => !!v || `${this.$t('login.password')}`,
          v => /^[\w]+$/.test(v) || `${this.$t('login.errorPassword')}`
        ],
        userNameList: [],
        languageList: []
      }
    },
    created() {
      if (localStorage.getItem('userNameList')) {
        try {
          this.userNameList = JSON.parse(localStorage.getItem('userNameList'))
        } catch (e) {
          this.userNameList = []
        }
        if (this.userNameList.length > 0) {
          this.userName = this.userNameList[0]
        }
      }
      this.languageList = this.staticVal.LanguageList
      // 全局enter按键登录
      this.publicMethods.hotkeys(this.submit, 'Enter')
    },
    computed: {
      language: {
        get() {
          return this.$store.state.tagsView.language
        },
        set(lang) {
          this.languagesChange(lang)
          this.changeLang()
          // this.$refs.form.reset()
        }
      }
    },
    methods: {
      // 改变语言时重载登录Input部分
      // 改变的是错误提示的Input
      changeLang() {
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      },
      // switch language
      languagesChange(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
      },
      submit() {
        if (this.$refs.form.validate()) {
          this.userLogin()
        }
      },
      changeShowPassword() {
        this.showPassword = !this.showPassword
      },
      async userLogin() {
        const params = {
          adminId: this.userName,
          adminPws: CryptoJS.sha256(this.password)
        }
        const [err, data] = await this.publicMethods.getPromise(login(params))
        if (err) {
          // this.$toask.info('success', 'sss')
          // console.log(err)
          return
        }
        if (data.code === this.staticVal.Code.Success) {
          if (this.isRemember) {
            if (this.userNameList.indexOf(this.userName) === -1) {
              this.userNameList.unshift(this.userName)
            } else if (this.userNameList.indexOf(this.userName) > -1) {
              this.userNameList.splice(this.userNameList.indexOf(this.userName), 1)
              this.userNameList.unshift(this.userName)
            }
          } else if (this.userNameList.indexOf(this.userName) > -1) {
            this.userNameList.splice(this.userNameList.indexOf(this.userName), 1)
          }
          localStorage.setItem('userNameList', JSON.stringify(this.userNameList))
          sessionStorage.setItem('userName', this.userName)
          this.publicMethods.setUserSession(data['credential'])
          document.onkeydown = undefined
          this.$router.push({ name: 'Home' })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'login.scss';
</style>
