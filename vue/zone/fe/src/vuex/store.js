import Vue from 'vue'
import Vuex from 'vuex'
import constant from './modules/constant'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        constant,
        user
    }
})
