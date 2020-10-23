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
            >
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title>
                    {{item}}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action @click.stop>
                  <v-btn
                    icon
                    small
                    @click.stop.prevent="openDeleteUserDialog(item)"
                  >
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
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
        <span>{{$t('login.forgot')}}?</span>
      </div>
    </div>
    <component
      :is="children"
      :userName="clickItem"
      @closeDialog="deleteUserName"
    ></component>
  </div>
</template>

<script scope>
  import { login } from './api.js'
  import CryptoJS from 'crypto-js'
  import DeleteUserDialog from './components/DeleteUserDialog'

  export default {
    components: {
      DeleteUserDialog
    },
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
        languageList: [],
        children: '',
        clickItem: ''// 当前点击用户名下拉框的值
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
        // 这里加一个定时器,是为了combo box组件的问题,当输入完内容时,没有失去焦点的时候,还是会
        // 获取不到值的,所以这里加个定时器,让组件更新在event的事件队列之后,这样获取值
        // 就不会有问题了
        setTimeout(() => {
          if (this.$refs.form.validate()) {
            this.userLogin()
          }
        })
      },
      changeShowPassword() {
        this.showPassword = !this.showPassword
      },
      async userLogin() {
        if (this.$store.state.tagsView.showSnackbar) {
          return
        }
        const params = {
          adminId: this.userName,
          adminPws: CryptoJS.SHA256(this.password).toString()
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
          this.publicMethods.setUserSession({ ...data['session'], credential: data['credential'] })
          document.onkeydown = undefined
          if (data.expireMsg) {
            this.$toast.success(data.expireMsg, 6000)
          }
          this.$router.push({ path: '/home' })
        }
      },
      deleteUserName(isAction) {
        this.children = ''
        // 如果子组件返回true,那么就是需要执行删除效果
        if (isAction) {
          // 如何删除的元素和当前选中的用户名一样,那么当前的用户名需要清空
          if (this.userName === this.clickItem) {
            this.userName = ''
          }
          this.userNameList.splice(this.userNameList.indexOf(this.clickItem), 1)
          localStorage.setItem('userNameList', JSON.stringify(this.userNameList))
        }
      },
      openDeleteUserDialog(item) {
        this.children = DeleteUserDialog
        this.clickItem = item
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'login.scss';
</style>
