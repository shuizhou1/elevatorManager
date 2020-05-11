import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    theme
  },
  strict: process.env.NODE_ENV !== 'production'
})
