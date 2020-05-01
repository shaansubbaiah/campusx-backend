import Vue from "vue";
import App from "./App.vue";
import router from './router';
import Vuex from 'vuex';

import VeeValidate from 'vee-validate';

require('./assets/app.css')
 
Vue.config.productionTip = false;

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VeeValidate)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token : "",
    userId: null,
    username: "Stranger"
  }
})

 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");