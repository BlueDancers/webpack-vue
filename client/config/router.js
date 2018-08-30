import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      // to是前往的路由
      // from就是之前的路由
      // savedPosition记录滚动条1的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
  })
}
