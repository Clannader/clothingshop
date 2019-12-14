<template>
  <v-footer
    color="white"
    fixed
    inset
    app
    class="main-footer"
  >
    <strong>Copyright &copy; 2017-{{ new Date().getFullYear() }} Oliver.wu</strong>
    {{$t('homePage.rights')}}
    <v-spacer></v-spacer>
    <strong>{{$t('homePage.version')}}</strong>1.0.0.0
  </v-footer>
</template>

<script>
  export default {
    name: 'AppFooter'
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
