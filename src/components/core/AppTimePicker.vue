<template>
  <div>
    <v-menu
        v-model="menu"
        v-bind="$attrs"
        transition="scale-transition"
        :nudge-top="20"
        offset-y
        :max-width="useSeconds && (validTime() || datePicker) ? '310px' : '290px'"
        :min-width="useSeconds && (validTime() || datePicker) ? '310px' : '290px'"
    >
      <template #activator="{ on }">
        <v-text-field
            v-model="dateText"
            v-on="on"
            v-bind="$attrs"
            append-icon="mdi-clock-time-four-outline"
            :class="{'input-require':inputRequire}"
            :readonly="readonly"
            :clearable="clearable"
            @click:append="menu = true"
            @click:clear="clearDate"
            @blur="validateDate()"
            @input="timeInput"
        >
        </v-text-field>
      </template>

      <v-time-picker
          v-bind="$attrs"
          v-model="datePicker"
          :locale="locale"
          @input="getReturnValue()"
          scrollable
          format="24hr"
      >
      </v-time-picker>
    </v-menu>
  </div>
</template>

<script>
  // import moment from 'moment'
  import { get } from 'vuex-pathify'
  import Inputmask from 'inputmask'

  export default {
    inheritAttrs: true,
    name: 'AppTimePicker',
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
    },
    data() {
      const useSeconds = this.publicMethods.isEmpty(this.$attrs['use-seconds'])
        ? (this.$attrs['use-seconds'] === '') : this.$attrs['use-seconds']
      return {
        menu: false,
        datePicker: '', // 日期选择控件
        useSeconds: useSeconds,
        format: useSeconds ? 'HH:mm:ss' : 'HH:mm', // 日期格式化格式
        dateText: '', // 输入框日期显示
        maskConfig: {
          placeholder: '',
          alias: useSeconds ? 'hh:mm:ss' : 'hh:mm', // 默认格式
          inputFormat: useSeconds ? 'hh:mm:ss' : 'hh:mm'
        }
      }
    },
    watch: {
      updateValue: {
        handler(newVal) {
          if (!this.publicMethods.isEmpty(newVal)) {
            this.dateText = newVal
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
      locale: get('tagsView/language')
    },
    created() {
      if (!this.publicMethods.isEmpty(this.updateValue)) {
        this.dateText = this.updateValue
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
        // TODO 新增判断区间大小,日期控件同理
        if (!this.validTime()) {
          this.$toast.error(this.$t('homePage.InvalidTime'))
          // this.datePicker = this.useSeconds ? '00:00:00' : '00:00'
          // this.dateText = this.useSeconds ? '00:00:00' : '00:00'
          this.datePicker = this.dateText = undefined
        }
        this.getReturnValue()
      },
      timeInput() {
        // TODO 新增判断区间大小
        if (this.validTime()) {
          this.datePicker = this.dateText
        }
      },
      validTime() {
        return Inputmask.isValid(this.dateText, this.maskConfig)
      }
    },
    mounted() {
      Inputmask(this.maskConfig).mask(document.getElementById(this.$children[0].$children[0].computedId))
    }
  }

</script>

<style scoped>

</style>
