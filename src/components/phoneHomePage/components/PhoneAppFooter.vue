<template>
  <van-tabbar
      v-model="tabActive"
      :border="false"
      :z-index="100"
      safe-area-inset-bottom
  >
    <template v-for="(item, i) in tabbarItem">
      <van-tabbar-item :name="item.itemName" :key="i" @click="goTo(item)">
        <span>{{item.name}}</span>
        <template #icon="props">
          <van-icon :name="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<script>
  export default {
    name: 'PhoneAppFooter',
    data() {
      return {
        tabActive: 'home',
        tabbarItem: [
          {
            name: '首页',
            icon: {
              active: 'wap-home',
              inactive: 'wap-home-o'
            },
            path: '/home',
            itemName: 'home'
          },
          {
            name: ' 退出',
            icon: {
              active: 'chat',
              inactive: 'chat-o'
            },
            path: '/login',
            itemName: 'chat'
          },
          {
            name: '购物车',
            icon: {
              active: 'shopping-cart',
              inactive: 'shopping-cart-o'
            },
            path: '/user/cart',
            itemName: 'cart'
          },
          {
            name: '我的',
            icon: {
              active: 'manager',
              inactive: 'manager-o'
            },
            path: '/user/info',
            itemName: 'info'
          }
        ]
      }
    },
    created() {
      const path = this.$route.path
      const arr = this.tabbarItem.filter(item => item.path === path)
      if (arr.length > 0) {
        this.tabActive = arr[0].itemName
      }
    },
    methods: {
      goTo(item) {
        this.tabActive = item.itemName
        this.$router.push({ path: item.path })
      }
    }
  }
</script>

<style scoped>

</style>
