<template>
  <v-text-field
    v-model="textValue"
    v-bind="$attrs"
    v-on="$listeners"
    :clearable="clearable"
    @click:clear="clearText"
    @keyup.enter="changeValue"
    @input="update"
    :type="passwordInput ? (showPassword ? 'text' : 'password') : 'text'"
    :append-icon="passwordInput ? (showPassword ? 'visibility' : 'visibility_off') : $attrs['append-icon']"
    @click:append="changeShowPassword()"
  >
  </v-text-field>
</template>

<script>
  import Inputmask from 'inputmask'

  export default {
    inheritAttrs: true,
    name: 'AppTextField',
    props: {
      updateValue: {
        type: null,
        default: undefined
      },
      passwordInput: {
        type: Boolean, // 封装密码输入框控件
        default: false
      },
      plainText: { // 显示明文
        type: Boolean,
        default: false
      },
      mask: {
        type: [String, Object], // 使用Inputmask来校验输入
        default: ''
      },
      clearable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const maskConfig = {
        placeholder: '',
        rightAlign: false,
        yearrange: {
          minyear: 1900,
          maxyear: 3099
        }
      }
      if (typeof this.mask === 'string') {
        maskConfig.mask = this.mask
      } else {
        Object.assign(maskConfig, this.mask)
      }
      return {
        orgValue: undefined, // 原始值
        showPassword: false,
        isMask: !this.publicMethods.isEmpty(this.mask), // 是否开启输入校验规则
        maskConfig: maskConfig
      }
    },
    methods: {
      update() {
        // 每次输入时都会进这里面
        this.$emit('update:updateValue', this.orgValue)
      },
      clearText() {
        this.orgValue = undefined
        this.update()
        this.$nextTick(() => {
          this.changeValue()
        })
      },
      changeValue() {
        this.$emit('changeValue', this.orgValue)
      },
      changeShowPassword() {
        if (!this.passwordInput) return
        this.showPassword = !this.showPassword
      },
      setOrgValue(v) {
        this.orgValue = v
      }
    },
    create() {
    },
    mounted() {
      // 这里又发现一个顺序问题,如果是异步赋值的话,顺序如下
      // computed.textValue.get() -> mounted()
      if (this.isMask) {
        // 不知道这个id准不准确的,如果不准确,再使用uuid去赋值即可
        // :id='id'  id=uuid.v4().replace(/\-/g, '') 在data()里面定义即可
        Inputmask(this.maskConfig).mask(document.getElementById(this.$children[0].computedId))
      }
    },
    computed: {
      textValue: {
        get() {
          const isEmpty = this.publicMethods.isEmpty(this.updateValue)
          this.setOrgValue(this.updateValue)
          if (this.isMask && !isEmpty) {
            this.setOrgValue(Inputmask(this.maskConfig).format(this.orgValue))
          }
          // 我知道这句话有什么用了,就是初始值时,格式化值了,需要回传值回去
          // 要不然还是之前的值的
          this.update() // 这里加了一句更新,不知道有没有什么问题
          if (this.passwordInput && !isEmpty && !this.plainText) {
            // 如果启用密码框的时候,显示的内容就变*号
            return this.orgValue.replace(/.{1}/g, '*')
          } else {
            return this.orgValue
          }
        },
        set(value) {
          if (!this.orgValue) {
            // 如果原始值是undefined
            this.orgValue = value
          } else if (this.passwordInput && value) {
            if (value.length > this.orgValue.length) {
              this.orgValue = this.orgValue + value.substring(this.orgValue.length)
            } else {
              this.orgValue = this.orgValue.substring(0, this.orgValue.length - 1)
            }
          } else {
            // 没有启动密码框的时候进这里
            this.orgValue = value
          }
        }
      }
    },
    watch: {
      mask(newVal) {
        if (!this.publicMethods.isEmpty(newVal)) {
          Object.assign(this.maskConfig, newVal)
          Inputmask(this.maskConfig).mask(document.getElementById(this.$children[0].computedId))
        }
      }
    }
  }
</script>

<style scoped>

</style>
