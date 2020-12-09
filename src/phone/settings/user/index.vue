<template>
  <div class="v-application--wrap">
    <phone-toolbar>
      <template v-slot:icon>
        <app-text-icon
          icon="done"
          text="保存"
          @click="click"
        ></app-text-icon>
      </template>
    </phone-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'PhoneSettingsUser',
    methods: {
      click() {
        this.$router.back(-1)
      }
    }
  }
</script>

<style scoped>

</style>
