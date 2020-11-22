/**
 * Create by CC on 2020/11/22
 */
'use strict'

import { make } from 'vuex-pathify'

const state = {
  store: 'storeValue',
  mapStore: 'mapStore'
}

const mutations = {
  ...make.mutations(state),
  store: (state, msg = '') => {
    console.log('进入mutations Store')
    state.store = msg
  }
}

const actions = {
  getStore: ({ commit }, msg = '') => {
    console.log('进入getStore')
    commit('store', msg)
  }
}

const getters = {
  storeGetters: state => {
    return state.mapStore
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
