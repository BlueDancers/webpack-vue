// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

const routes = [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    component: () => import('../views/todo/todo.vue'),
    name: 'app',
    meta: {
      title: '主页'
    }
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue'),
    name: 'login'
  }
]

export default routes
