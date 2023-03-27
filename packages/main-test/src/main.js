import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import Message from '@gislife/micro-message'

Vue.use(Message)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

window['URL_CONFIG'] = {
  msg: 'this is main'
}
