import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import company from './modules/company'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    mutations,
    modules: {
        company
    },
    strict: debug,
})