<template>
  <div class="v-application--wrap">
    <phone-toolbar>

      <template v-slot:icon>
        <v-btn
          icon
        >
          <v-icon>
            refresh
          </v-icon>
        </v-btn>
      </template>

      <template v-slot:extension>
        <app-text-icon
          :text="new Date().format('YYYY年MM月DD日')"
          style="margin-top: 2px"
          icon="mdi-calendar-blank"
        ></app-text-icon>
      </template>
    </phone-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'PhoneSettingsUser'
  }
</script>

<style scoped>

</style>
