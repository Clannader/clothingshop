<template>
  <v-menu
    bottom
    left
    offset-y
    transition="slide-y-transition"
    open-delay="60"
    close-delay="100"
    open-on-hover
  >
    <template #activator="{ on }">
      <v-btn
        :aria-label="currentLanguage.desc"
        :title="$t('homePage.lang')"
        text
        v-on="on"
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
          <!-- https://cdn.vuetifyjs.com/images/flags/cn.png -->
          <!-- `../../../assets/i18n/${lang.code}.png` -->
          <v-img
            :src="require(`@/assets/i18n/${lang.code}.png`)"
            width="24px"
          />
        </v-list-item-avatar>
        <v-list-item-title v-text="lang.desc"/>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'AppLang',
    data() {
      return {
        languageList: this.staticVal.LanguageList
      }
    },
    created() {
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
        const currentLocale = this.$i18n.locale
        if (locale !== currentLocale) {
          this.$i18n.locale = locale
          this.$store.dispatch('tagsView/setLanguage', locale)
        }
      }
    }
  }
</script>

<style scoped>

</style>
