<template>
  <v-footer
    color="white"
    fixed
    inset
    app
    class="main-footer"
  >
    <strong>Copyright &copy; {{systemConfig.copyright}}-{{ new Date().getFullYear() }} {{systemConfig.author}}</strong>
    {{$t('homePage.rights')}}
    <v-spacer></v-spacer>
    <strong>{{$t('homePage.version')}}</strong>{{systemConfig.version}}
    <v-btn
      icon
      x-small
      @click="refreshRouter"
      :title="$t('homePage.refreshRouter')"
      style="margin-left: 10px"
    >
      <v-icon>
        mdi-refresh
      </v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
  import { call, get } from 'vuex-pathify'

  export default {
    name: 'AppFooter',
    computed: {
      ...get('userInfo', ['systemConfig'])
    },
    methods: {
      refreshRouter: call('userInfo/changeRoles')
    }
  }
</script>

<style lang="scss" scoped>
  .main-footer {
    padding: 10px;
    font-size: 10px;
    //border-top: 1px solid #d2d6de;
    //这里之所以这个属性无效,是因为用了color=white,被覆盖属性了
    strong {
      padding: 0 10px 0 10px;
    }
  }

  .white {
    border-top: 1px solid #d2d6de !important;
  }
</style>
