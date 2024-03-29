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
      <template #activator="{ on }">
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
  import { get } from 'vuex-pathify'
  import Inputmask from 'inputmask'

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
      // const format = 'yyyy.mm.dd'
      return {
        menu: false,
        datePicker: '', // 日期选择控件
        // format: format, // 日期格式化格式
        dateText: '', // 输入框日期显示
        maskConfig: {
          placeholder: '',
          alias: 'yyyy-mm-dd', // 默认格式
          inputFormat: 'yyyy-mm-dd',
          yearrange: {
            minyear: 1900,
            maxyear: 3099
          }
        }
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
      locale: get('tagsView/language'),
      format: get('userInfo/systemConfig@dateFormat')
      // format: 'YYYY-MM-DD'
    },
    created() {
      // this.format = this.$store.state.userInfo.systemConfig.dateFormat
      if (!this.publicMethods.isEmpty(this.format)) {
        this.maskConfig.alias = this.format.replace(/M/g, 'm')
        this.maskConfig.inputFormat = this.format.replace(/M/g, 'm')
      }
      if (!this.publicMethods.isEmpty(this.updateValue)) {
        this.dateText = this.updateValue.format(this.format)
        this.datePicker = this.updateValue
      }
    },
    methods: {
      getReturnValue() {
        this.$emit('update:updateValue', this.datePicker)
      },
      clearDate() {
        this.dateText = ''
        this.datePicker = undefined
        this.getReturnValue()
      },
      validateDate() {
        // TODO 这里可能要加一个点v-click-outside的时候的指令进行校验
        // 当输入完日期后,点击外部,在点击日期,其实日期是没有变化的
        if (this.publicMethods.isEmpty(this.dateText)) {
          this.clearDate()
          return
        }
        // 这里的日期格式和使用moment组件有差异
        const isValid = Inputmask.isValid(this.dateText, this.maskConfig)
        // const datePicker = this.dateText.createMoment(format).format('YYYY-MM-DD')
        // 暂时这样校验日期吧,JS校验日期确实有点难
        if (!isValid) {
          this.$toast.error(this.$t('homePage.InvalidDate'))
          this.datePicker = undefined
          this.dateText = ''
        } else {
          // format = this.format.replace(/y/g, 'Y').replace(/d/g, 'D')
          const format = this.format.replace(/y/g, 'Y').replace(/d/g, 'D')
          this.datePicker = this.dateText.createMoment(format).format('YYYY-MM-DD')
        }
        this.getReturnValue()
      }
    },
    mounted() {
      Inputmask(this.maskConfig).mask(document.getElementById(this.$children[0].$children[0].computedId))
    }
  }

</script>

<style scoped>

</style>
