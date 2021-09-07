import Vue from 'vue'
import Vuex from 'vuex'

import {setHeader} from '../custom/axios.custom'

Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? {state: {loggedIn: true}, user} : {state: {}, user: null}

const initUser = (store) => {
  const {ACCESS_TOKEN} = localStorage
  if (ACCESS_TOKEN) {
    store.commit('setToken', ACCESS_TOKEN)
  }
}

export default new Vuex.Store({
  plugins: [initUser],
  state: {
    initialState,
    authenticated: false,
    token: null,
    currentUser: null
  },
  getters: {
    token (state) {
      return state.token
    },
    user (state) {
      return state.currentUser
    },
    authenticated (state) {
      return state.authenticated
    }
  },
  mutations: {
    setToken (state, accessToken) {
      state.token = accessToken
      localStorage.ACCESS_TOKEN = accessToken
      setHeader(accessToken)
    },
    setUserDetail (state, payload) {
      localStorage.setItem('user', JSON.stringify(payload))
      state.currentUser = payload
      state.authenticated = payload !== null
    }
  },
  actions: {
    setToken ({commit}, payload) {
      commit('setToken', payload)
    },
    setUserDetail ({commit}, payload) {
      commit('setUserDetail', payload)
    }
  }
})
