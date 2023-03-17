import Vue from 'vue'
import App from './App.vue'
import Message from '../../message/'
Vue.use(Message)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
