import Vue from 'vue'
import VueResource from 'vue-resource'
import {sync} from 'vuex-router-sync'
import router from './router'
import store from './vuex/store'
import App from './App'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

sync(store, router)

router.start(App, '#app')
