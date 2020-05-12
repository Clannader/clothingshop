<template>
  <div>
    <v-menu
      v-model="menu"
      transition="scale-transition"
      :nudge-top="80"
      offset-y
      max-width="290px"
      min-width="290px"
      :disabled="disabled"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="datePicker"
          v-on="{ ...on, ...$listeners }"
          v-bind="$attrs"
          append-icon="mdi-calendar-blank"
          :disabled="disabled"
          :class="{'input-require':require}"
          @blur="dateFormat()"
          @click:append="menu = true"
        >
        </v-text-field>
      </template>

      <v-date-picker
        v-bind="$attrs"
        v-on="$listeners"
        v-model="datePicker"
        :locale="locale"
        scrollable
      >
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    inheritAttrs: true,
    name: 'AppDataPicker',
    props: {
      // 是否必填项
      require: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        menu: false,
        datePicker: ''
      }
    },
    watch: {
    },
    computed: {
      locale() {
        return this.$store.state.tagsView.language
      }
    },
    created() {

    },
    methods: {
      dateFormat() {
        console.log(moment.locales())
      }
    }
  }

</script>

<style scoped>

</style>
