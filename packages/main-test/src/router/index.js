import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Main.vue')
    }
  ]
})
export default router
