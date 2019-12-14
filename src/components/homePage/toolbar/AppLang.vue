<template>
  <v-menu
    bottom
    left
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on: menu }">
      <v-btn
        :aria-label="currentLanguage.desc"
        :title="$t('homePage.lang')"
        text
        v-on="menu"
      >
        {{currentLanguage.desc}}
        <v-icon
          right
        >
          mdi-menu-down
        </v-icon>
      </v-btn>
    </template>
    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="lang in languageList"
        :key="lang.code"
        no-markdown
      >{{lang.desc}}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'AppLang',
    data() {
      return {
        languageList: []
      }
    },
    created() {
      this.languageList = this.staticVal.LanguageList
    },
    computed: {
      currentLanguage() {
        const locale = this.$i18n.locale
        return this.languageList.find(l => l.code === locale)
      }
    }
  }
</script>

<style scoped>

</style>
