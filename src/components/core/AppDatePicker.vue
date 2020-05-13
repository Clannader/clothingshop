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
          v-model="datePicker"
          v-on="{ ...on, ...$listeners }"
          v-bind="$attrs"
          append-icon="mdi-calendar-blank"
          :class="{'input-require':require}"
          @click:append="menu = true"
          @change="getReturnValue()"
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
  // import moment from 'moment'

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
        format: ''
      }
    },
    watch: {
      updateValue: {
        handler(newVal) {
          this.datePicker = newVal
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

    },
    methods: {
      getReturnValue() {
        this.$emit('update:updateValue', this.datePicker)
      }
    }
  }

</script>

<style scoped>

</style>
