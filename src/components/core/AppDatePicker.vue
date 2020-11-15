<template>
  <div>
    <v-menu
      v-model="menu"
      v-bind="$attrs"
      transition="scale-transition"
      :nudge-top="20"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateText"
          v-on="on"
          v-bind="$attrs"
          append-icon="mdi-calendar-blank"
          :class="{'input-require':inputRequire}"
          :readonly="readonly"
          :clearable="clearable"
          @click:append="menu = true"
          @click:clear="clearDate"
          @blur="validateDate()"
        >
        </v-text-field>
      </template>

      <v-date-picker
        v-bind="$attrs"
        v-model="datePicker"
        :locale="locale"
        @change="getReturnValue()"
        scrollable
      >
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  // import moment from 'moment'

  export default {
    inheritAttrs: true,
    name: 'AppDatePicker',
    props: {
      // 是否必填项
      // require关键字会出现警告
      // Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
      // 解决办法,改名字即可
      inputRequire: {
        type: Boolean,
        default: false
      },
      // 因为只能对输入框有效,不能对日期选择只读,否则选不了日期
      readonly: {
        type: Boolean,
        default: false
      },
      // 控件更新子组件字段值
      updateValue: {
        type: null,
        default: undefined
      },
      clearable: {
        type: Boolean,
        default: false
      }
      // 想了几天初始化赋值的办法,依然找不到什么有效的办法,只能让子组件传入初始值来初始化了
      // 不明白为什么别人的就能初始化成功
      // initValue: {
      //   type: String,
      //   default: ''
      // }
    },
    data() {
      return {
        menu: false,
        datePicker: '', // 日期选择控件
        format: '', // 日期格式化格式
        dateText: '' // 输入框日期显示
      }
    },
    watch: {
      updateValue: {
        handler(newVal) {
          if (!this.publicMethods.isEmpty(newVal)) {
            this.dateText = newVal.format(this.format)
            this.datePicker = newVal
          } else {
            this.dateText = ''
            this.datePicker = ''
          }
        },
        deep: true
      }
    },
    computed: {
      locale() {
        return this.$store.state.tagsView.language
      }
    },
    created() {
      this.format = this.$store.state.userInfo.systemConfig.dateFormat
      if (!this.publicMethods.isEmpty(this.updateValue)) {
        this.dateText = this.updateValue.format(this.format)
        this.datePicker = this.updateValue
      }
    },
    methods: {
      getReturnValue() {
        this.$emit('update:updateValue', this.datePicker)
        // this.$refs.menu.save(this.datePicker)
      },
      clearDate() {
        this.dateText = ''
        this.datePicker = undefined
        this.getReturnValue()
      },
      validateDate() {
        if (this.publicMethods.isEmpty(this.dateText)) {
          this.clearDate()
          return
        }
        const format = this.format.replace(/y/g, 'Y').replace(/d/g, 'D')
        const datePicker = this.dateText.createMoment(format).format('YYYY-MM-DD')
        // 暂时这样校验日期吧,JS校验日期确实有点难
        if (datePicker === 'Invalid date') {
          this.$toast.error(this.$t('homePage.InvalidDate'))
          this.datePicker = undefined
          this.dateText = ''
        } else {
          this.datePicker = datePicker
        }
        this.getReturnValue()
      }
    }
  }

</script>

<style scoped>

</style>
