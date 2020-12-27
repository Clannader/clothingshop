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
  import { get } from 'vuex-pathify'

  export default {
    name: 'AppShopTextField',
    data() {
      return {
        shopId: undefined,
        disabled: false
      }
    },
    methods: {
      searchShopId() {
        this.$emit('searchShopId')
      },
      clearShopId() {
        this.shopId = null
        this.returnShopId()
        this.searchShopId()
      },
      openShopId() {

      },
      returnShopId() {
        this.$emit('update:shopId', this.shopId)
      }
    },
    computed: {
      ...get('userInfo', ['sessionSchema'])
    },
    created() {
      if (this.sessionSchema.selfShop !== 'SYSTEM') {
        this.shopId = this.sessionSchema.selfShop
        this.disabled = true
        this.returnShopId()
      }
    }
  }
</script>

<style scoped>

</style>
