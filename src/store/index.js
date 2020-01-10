import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const $api = 'http://127.0.0.1:8000/api/'

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
  state: {
    SystemName: '',
    RunningNumber: '',
    GoodsList: []
  },
  actions: {
    GenRunningNumber (state) {
      // axios.get($api + 'GetRunningNumber/Goods')
      //   .then((response) => {
      //     state.commit('setRunning', response.data)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
        state.commit('setRunning', 'testing state')
    },
    GenSystemName (state, value) {
      state.commit('setSystemName', value)
    },
    GetGoodsList (state, pageNumber) {
      axios.get($api + 'TestAPI?page=' + pageNumber)
        .then((response) => {
          console.log(response.data)
          state.commit('setGoodsList', response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mutations: {
    setSystemName (state, value) {
      state.SystemName = value
    },
    setRunning (state, value) {
      state.RunningNumber = value
    },
    setGoodsList (state, value) {
      state.GoodsList = value
    }
  },
  getters: {
    RunningNumber: state => state.RunningNumber,
    SystemName: state => state.SystemName,
    GoodsList: state => state.GoodsList
  },
  strict: debug
})
