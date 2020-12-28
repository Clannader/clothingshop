<template>
  <v-text-field
    v-model="shopId"
    :label="$t('homePage.shopID')"
    clearable
    @click:clear="clearShopId"
    @keyup.enter="searchShopId"
    append-icon="toc"
    :disabled="disabled"
    @input="returnShopId"
    @click:append="openShopId()"
  >
  </v-text-field>
</template>

<script>
  export default {
    name: 'AppTextField'
  }
</script>

<style scoped>

</style>
