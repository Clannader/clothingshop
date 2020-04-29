<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field
          :class="{'input-require':isRequire}"
          v-model="datePicker"
          v-on="{ ...on, ...$listeners }"
          v-bind="$attrs"
          append-icon="iconfont icon-c-opera-logs">
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
  export default {
    inheritAttrs: true,
    name: 'AppDataPicker',
    props: {
      // 是否必填项
      isRequire: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        menu: false,
        datePicker: '',
        locale: 'zh'
      }
    },
    watch: {
    },
    computed: {
    },
    created() {
      this.locale = this.$store.state.tagsView.language
    },
    methods: {
    }
  }

</script>

<style scoped>

</style>
