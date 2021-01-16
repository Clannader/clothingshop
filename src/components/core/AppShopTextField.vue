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
    @blur="validateShopId()"
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
      },
      validateShopId(isAlert = false) {
        // 如果没有权限,不能使用SYSTEM店铺
        const regex = /(SYSTEM)/gi
        // 判断shopId不能为空,并且没有权限,并且匹配system才会去校验
        if (!this.publicMethods.isEmpty(this.shopId) &&
          !this.publicMethods.isPermission('CreateSYSAny') &&
          this.shopId.match(regex)) {
          if (!isAlert) {
            // 判断是否弹出提示框
            this.$toast.error(this.$t('homePage.invShopId'))
          }
          this.shopId = ''
        }
        this.returnShopId()
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
      // 如果没有权限,不能使用SYSTEM店铺
      this.validateShopId(true)
    }
  }
</script>

<style scoped>

</style>
