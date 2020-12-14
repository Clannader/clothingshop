<template>
  <v-main>
    <v-container fluid class="main-content">
      <van-notice-bar
        left-icon="volume-o"
        mode="closeable"
        scrollable
        @close="closeNotice"
        text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
      />
      <v-fade-transition mode="out-in">
        <menu-carousel
          :notice-height="noticeHeight"
        ></menu-carousel>
      </v-fade-transition>
    </v-container>
  </v-main>
</template>

<script>
  import MenuCarousel from '../content/MenuCarousel'

  export default {
    name: 'PhoneAppContent',
    data() {
      return {
        noticeHeight: 40
      }
    },
    components: {
      MenuCarousel
    },
    methods: {
      closeNotice() {
        // 暂时不知道关闭之后,如何再次出现notice
        this.noticeHeight = 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-content {
    height: 100%;
    padding: 0;
    background-color: #fff;
  }
</style>
