<template>
  <v-toolbar
    dark
    flat
    fixed
    height="50"
    color="primary"
  >
    <v-app-bar-nav-icon @click.stop="changeSidebar()"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text>{{userName}}</v-btn>
      <v-menu
        attach
        bottom
        left
        offset-y
        max-height="500"
        v-slot:activator="{ on }"
      >
        <v-btn
          :aria-label="$t('homePage.version')"
          text
          v-on="on"
        >
          <span
            class="hidden-sm-and-down mr-1"
            v-text="$t('homePage.version')"
          />
          <v-icon class="hidden-sm-and-down">mdi-menu-down</v-icon>
          <v-icon class="hidden-md-and-up">mdi-comment-question</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            no-markdown
          >{{item.title}}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'AppToolbar',
    data() {
      return {
        // mini: false,
        userName: '',
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ]
      }
    },
    created() {
      // const sidebarStatus = localStorage.getItem('sidebarStatus')
      // this.mini = sidebarStatus && sidebarStatus === 'true'
      this.userName = sessionStorage.getItem('userName')
    },
    methods: {
      changeSidebar() {
        // 初始化侧边栏状态,是收缩还是展开
        // this.mini = !this.mini
        // localStorage.setItem('sidebarStatus', this.mini)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-toolbar__items {
    .v-btn {
      text-transform: capitalize;
    }
  }
</style>
