<template>
  <div>
    <v-menu
      v-model="menu"
      v-bind="$attrs"
      v-on="$listeners"
      ref="menu"
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
      updateValue: {
        type: null,
        default: undefined
      }
    },
    data() {
      return {
        menu: false,
        datePicker: '',
        format: '',
        dateText: ''
      }
    },
    watch: {
      updateValue: {
        handler(newVal) {
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
    },
    methods: {
      getReturnValue() {
        this.$emit('update:updateValue', this.datePicker)
        this.dateText = this.datePicker.format(this.format)
        // this.$refs.menu.save(this.datePicker)
      }
    }
  }

</script>

<style scoped>

</style>
