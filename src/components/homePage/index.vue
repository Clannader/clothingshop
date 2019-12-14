<template>
  <div id="cmsApp">
    <app-navigation></app-navigation>
    <app-toolbar></app-toolbar>
    <app-content></app-content>
    <app-footer></app-footer>
    <app-fab></app-fab>
  </div>
</template>

<script>
  import AppFab from './components/AppFab'
  import AppFooter from './components/AppFooter'
  import AppContent from './components/AppContent'
  import AppNavigation from './components/AppNavigation'
  import AppToolbar from './components/AppToolbar'

  export default {
    name: 'HomePage',
    components: {
      AppFab,
      AppFooter,
      AppContent,
      AppNavigation,
      AppToolbar
    }
  }
</script>
