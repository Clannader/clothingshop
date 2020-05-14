<template>
  <div>
    <v-menu
      v-model="menu"
      v-bind="$attrs"
      v-on="$listeners"
      transition="scale-transition"
      :nudge-top="20"
      offset-y
      max-width="290px"
      min-width="290px"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateText"
          v-on="{ ...on, ...$listeners }"
          v-bind="$attrs"
          append-icon="mdi-calendar-blank"
          :class="{'input-require':require}"
          :readonly="readonly"
          @click:append="menu = true"
        >
        </v-text-field>
      </template>

      <v-date-picker
        v-bind="$attrs"
        v-on="$listeners"
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

  export default {
    inheritAttrs: true,
    name: 'AppDataPicker',
    props: {
      // 是否必填项
      require: {
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
      // 想了几天初始化赋值的办法,依然找不到什么有效的办法,只能让子组件传入初始值来初始化了
      // 不明白为什么别人的就能初始化成功
      initValue: {
        type: String,
        default: ''
      }
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
          this.dateText = newVal.format(this.format)
          this.datePicker = newVal
          this.getReturnValue()
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
      this.datePicker = this.initValue
      this.dateText = this.initValue.format(this.format)
    },
    methods: {
      getReturnValue() {
        this.$emit('update:updateValue', this.datePicker)
        // this.$refs.menu.save(this.datePicker)
      }
    }
  }

</script>

<style scoped>

</style>
