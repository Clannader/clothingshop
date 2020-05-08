<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <app-date-picker
            :label="'开始日期'"
            :newDatePicker.sync="startDate"
            :min="currentDate"
          ></app-date-picker>
        </div>
        <div class="form-group">
          <v-text-field
            type="number"
            :label="'天数'"
            v-model="days"
            prepend-inner-icon="remove"
            maxlength="3"
            @click:prepend-inner="days=remove(days)"
            append-icon="add"
            @click:append="days=add(days)"
          ></v-text-field>
        </div>
        <div class="form-group">
          <app-date-picker
            :label="'结束日期'"
            :newDatePicker.sync="endDate"
            :min="startDate"
          ></app-date-picker>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'TestDate',
    created() {
    },
    data() {
      return {
        startDate: null,
        endDate: null,
        currentDate: null,
        days: 0
      }
    },
    methods: {
      remove(days) {

      },
      add(days) {

      }
    }
  }
</script>

<style scoped>

</style>
