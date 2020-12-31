<template>
  <v-text-field
    v-model="shopId"
    v-bind="$attrs"
    v-on="$listeners"
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
    inheritAttrs: true,
    name: 'AppShopTextField',
    props: {
      initShop: Boolean // 是否默认当前登录的店铺值
    },
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
      if (this.initShop) {
        this.shopId = this.sessionSchema.shopId
      }
      if (this.sessionSchema.shopId !== 'SYSTEM') {
        this.shopId = this.sessionSchema.shopId
        this.disabled = true
      }
      this.returnShopId()
    }
  }
</script>

<style scoped>

</style>
