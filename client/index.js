import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/style/global.styl'
import createRouter from './config/router'
import store from './store/store'

Vue.use(VueRouter)
const router = createRouter()

new Vue({
  el: '#root',
  router,
  store,
  render: (h) => h(App)
})

// router.beforeEach((to, from, next) => {
//   console.log('我是路由守卫beforeEach', to.fullPath)
//   next()
// })
// router.beforeResolve((to, from, next) => {
//   console.log('我是路由守卫beforeResolve')
//   next()
// })

// router.afterEach((to, from) => {
//   console.log('我是路由守卫afterEach')
// })
