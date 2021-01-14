<template>
  <div>
    <v-card class="card-title">
      <v-container fluid class="card-container">
        <div class="form-group">
          <div class="group-item">
            <v-text-field
              v-model="cond"
              :label="$t('users.searchCond')">
            </v-text-field>
          </div>
          <v-spacer></v-spacer>
          <div class="card-search-btn">
            <v-btn rounded dark @click="doSearch()">
              {{$t('homePage.search')}}
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-card>

    <component
      :is="children"
    ></component>
  </div>
</template>

<script>
  export default {
    name: 'TestContainer',
    props: {
      pageName: String
    },
    computed: {
      children() {
        const that = this
        return function(resolve) {
          require([`@/views/test/components/${that.pageName}`], resolve)
        }
      }
    },
    data() {
      return {
        cond: undefined
      }
    },
    created() {
      console.log('初始化')
    },
    methods: {
      doSearch() {
        this.$toast.success(this.pageName)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .group-item {
    padding-right: 24px;
    width: 70.0%;
  }

  .card-search-btn {
    padding-top: 16px;
  }
</style>
