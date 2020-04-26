<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field
          :class="{'input-require':isRequire}"
          v-model="datePicker"
          v-on="{ ...on, ...$listeners }"
          v-bind="$attrs"
          @blur="dateFormat()"
          append-icon="iconfont icon-c-opera-logs">
        </v-text-field>
      </template>

      <v-date-picker
        v-bind="$attrs"
        v-on="$listeners"
        v-model="date"
        @input="menu = false"
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
      // 绑定日期,属性标签中带sync
      newDatePicker: {
        type: String,
        default: ''
      },
      // 是否必填项
      isRequire: {
        type: Boolean,
        default: false
      },
      doOnce: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        menu: false,
        date: '',
        last_date: '',
        datePicker: '',
        errorMessages: ''
      }
    },

    watch: {
      newDatePicker: {
        handler(newVal, oldVal) {
          if (newVal !== this.datePicker) {
            // this.last_date = this.datePicker
            if (this.sysLang === 'en') {
              this.datePicker = this.formatDate(newVal)
            } else {
              this.datePicker = newVal
            }
            this.dateFormat()
          }
        },
        deep: true
      },
      doOnce: {
        handler() {
          if (this.newDatePicker !== this.datePicker) {
            // this.last_date = this.datePicker
            if (this.sysLang === 'en') {
              this.datePicker = this.formatDate(this.newDatePicker)
            } else {
              this.datePicker = this.newDatePicker
            }
            this.dateFormat()
          }
        }
      },
      date(val) {
        // this.last_date = this.datePicker
        if (val !== this.datePicker) {
          if (this.sysLang === 'en') {
            this.datePicker = this.formatDate(this.date)
          } else {
            this.datePicker = this.date
          }
          this.dateFormat()
        }
      }
    },
    computed: {

    },

    created() {
      this.sysLang = this.$store.state.tagsView.language
    },

    methods: {
      output(date) {
        this.$emit('update:newDatePicker', date)
        // if (this.min && Date.parse(date) < Date.parse(this.min)) {
        //   console.log('this.min :', this.min)
        //   this.datePicker = this.min
        //   this.$emit('update:newDatePicker', this.min)
        // } else if (this.max && Date.parse(date) > Date.parse(this.max)) {
        //   console.log('this.max :', this.max)
        //   this.datePicker = this.max
        //   this.$emit('update:newDatePicker', this.max)
        // } else {
        //   this.$emit('update:newDatePicker', date)
        // }
      },

      dateFormat() {
        const dateRegex = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/
        const enDateRegex = /^(((0?[1-9]|[12]\d|3[01])[/](0?[13578]|1[02])[/]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|[12]\d|30)[/](0?[13456789]|1[012])[/]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|1\d|2[0-8])[/]0?2[/]((1[6-9]|[2-9]\d)\d{2}))|(29[/]0?2[/]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/
        const date = new Date()
        const year = date.getFullYear()
        const subyear = year.toString().substring(0, 2)
        var temDate = ''
        var valDate = ''
        if (this.sysLang === 'zh') {
          temDate = this.datePicker ? this.datePicker.toString() : ''
          switch (temDate.length) {
            case 8:
              valDate = temDate.substring(0, 4) + '-' + temDate.substring(4, 6) + '-' + temDate.substring(6, 8)
              break
            case 6:
              valDate = subyear + temDate.substring(0, 2) + '-' + temDate.substring(2, 4) + '-' + temDate.substring(4, 6)
              break
            case 4:
              valDate = year + '-' + temDate.substring(0, 2) + '-' + temDate.substring(2, 4)
              break
            default:
              valDate = temDate
              break
          }
          if (!dateRegex.test(valDate) && valDate !== '') {
            this.$toast.warning('无效日期')
            this.datePicker = ''
            this.output(this.datePicker)
          } else {
            this.datePicker = valDate
            this.output(this.datePicker)
            this.date = this.datePicker
          }
        } else if (this.sysLang === 'en') {
          temDate = this.datePicker ? this.datePicker.toString() : ''
          switch (temDate.length) {
            case 8:
              valDate = temDate.substring(0, 2) + '/' + temDate.substring(2, 4) + '/' + temDate.substring(4, 8)
              break
            case 6:
              valDate = temDate.substring(0, 2) + '/' + temDate.substring(2, 4) + '/' + subyear + temDate.substring(4, 6)
              break
            case 4:
              valDate = temDate.substring(0, 2) + '/' + temDate.substring(2, 4) + '/' + year
              break
            default:
              valDate = temDate
              break
          }
          if (!enDateRegex.test(valDate) && valDate !== '') {
            this.$toast.warning('无效日期')
            this.datePicker = ''
            this.output(this.parseDate(this.datePicker))
          } else {
            this.datePicker = valDate
            this.output(this.parseDate(this.datePicker))
            this.date = this.parseDate(this.datePicker)
          }
        }
      },
      formatDate(date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate(date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month}-${day}`
      }
    }
  }

</script>

<style scoped>

</style>
