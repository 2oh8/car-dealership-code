import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  directives: {
    loadedifcomplete: function (el, binding) {
      if (el.complete) {
        binding.value.loaded = true;
      }
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
