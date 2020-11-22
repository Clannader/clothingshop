<template>
  <div>
    <p>Test Store</p>
    <v-btn @click="click">store</v-btn>
    <v-btn @click="click2">renameStore</v-btn>
    <v-btn @click="click3">vuex-pathify[dispatch]</v-btn>
    <v-btn @click="click4">$store[dispatch]</v-btn>
    <v-btn @click="click5">fun</v-btn>
    <v-btn @click="click6">alert</v-btn>
  </div>
</template>

<script>
  import { get, sync, dispatch } from 'vuex-pathify'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'TestStore',
    created() {
      // 第一种方法取值
      console.log('$store:value   ' + this.$store.state.testStore.store)
      // 使用vuex-pathify的sync
      console.log('sync:value   ' + this.store)
      // 如果需要重命名需要这样写
      console.log('sync:rename:value   ' + this.renameStore)
      console.log('get:vaule   ' + this.getStore)
      console.log('mapGetters:vaule   ' + this.mapStoreGetters)
      console.log('mapState:vaule   ' + this.mapStateStore)
      console.log('mapGetters:language   ' + this.language)
      console.log('get:Getters   ' + this.storeGetters)
    },
    computed: {
      ...sync('testStore', ['store']),
      renameStore: sync('testStore/store'),
      getStore: get('testStore/store'),
      ...mapGetters('testStore', {
        mapStoreGetters: 'storeGetters'
      }),
      ...get('testStore', ['storeGetters']), // get 方法的根元素取法
      ...mapState('testStore', {
        mapStateStore: 'store' // 重命名
      }),
      ...mapGetters(['language'])
      // ...mapState('testStore', ['store']) // 不重命名
    },
    methods: {
      click() {
        // 这里单纯的set就是进入了mutations方法的
        this.store = 'reValueStore'
      },
      click2() {
        this.renameStore = 'reValueRenameStore'
        // this.getStore = '22' // 因为设置的是只读,所以set值会报错
      },
      click3() {
        dispatch('testStore/getStore', 'vuex-pathify')
      },
      click4() {
        this.$store.dispatch('testStore/getStore', 'TestStore')
        this.$store.commit('testStore/store', 'commit')
      },
      click5() {
        const store = sync('testStore/store')
        const getStore = get('testStore/store')
        console.log('方法里面调用sync:' + store.get.call(this))
        console.log('方法里面调用get:' + getStore.call(this))
      },
      click6() {
        this.$toast.success('ssddd')
      }
    }
  }
</script>

<style scoped>

</style>
