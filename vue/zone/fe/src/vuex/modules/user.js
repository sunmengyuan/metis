import {USERLOGIN, USEREXIT} from '../mutation-types'

const state = {
    current: window.localStorage.getItem('user')
}
const mutations = {
    [USERLOGIN] (state, id) {
        state.current = id
    },
    [USEREXIT] (state) {
        state.current = ''
    }
}

export default {
    state,
    mutations
}
