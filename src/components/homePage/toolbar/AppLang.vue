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
        @click="translateI18n(lang)"
      >

        <v-list-item-avatar
          tile
          size="24px"
        >
          <v-img
            :src="`../../../assets/i18n/${lang.code}.png`"
            width="24px"
          />
        </v-list-item-avatar>
        <v-list-item-title v-text="lang.desc" />
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
    },
    methods: {
      translateI18n(lang) {
        const locale = lang.code
        this.$i18n.locale = locale
        this.$store.dispatch('setLanguage', locale)
      }
    }
  }
</script>

<style scoped>

</style>
