<template>
  <v-container
    class="text-center"
    fill-height
    style="height: calc(100vh - 58px);"
  >
    <v-row align="center">
      <v-col>
        <h1 class="display-2 primary--text">{{$t('homePage.notWhoops')}}, 404</h1>

        <p>{{$t('homePage.notPage')}}</p>

        <v-btn
          @click="gotoHome"
          color="primary"
          outlined
        >
          {{$t('homePage.notHere')}}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ChangeMeta from '@/mixins/change-meta'

  export default {
    name: 'NotFound',
    mixins: [ChangeMeta],
    methods: {
      gotoHome() {
        // 清空视图可能要重写一个方法,解决解锁资源
        this.$store.dispatch('tagsView/clearViews')
        sessionStorage.setItem('addViews', [])
        this.$router.push({
          path: '/home'
        })
      }
    }
  }
</script>

<style scoped>

</style>
