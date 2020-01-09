import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'
import JQuery from 'jquery'

// window.$ = JQuery

axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$api = 'http://127.0.0.1:8000/api/'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
