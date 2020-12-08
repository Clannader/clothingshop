<template>
  <div class="v-application--wrap">
    <phone-toolbar
      moreVertIcon
      replayIcon
      refreshIcon
      zoomInIcon
      searchIcon
      sortIcon
      @refreshClick="refreshAction"
      @zoomInClick="refreshAction"
    >

      <template v-slot:extension>
        <app-text-icon
          :text="new Date().format('YYYY年MM月DD日')"
          icon="mdi-calendar-blank"
        ></app-text-icon>
      </template>
    </phone-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'PhoneSettingsUser',
    methods: {
      refreshAction() {
        console.log('refreshAction')
      },
      refresh2() {
        console.log('refresh2')
      }
    }
  }
</script>

<style scoped>

</style>
