<template>
  <div>
  </div>
</template>

<script>
  import { getSearchLogsList } from './api'

  export default {
    name: 'ServerLogs',
    created() {
      getSearchLogsList().then(res => {
        console.log(res)
      }).catch(() => {

      })
    }
  }
</script>

<style scoped>

</style>
