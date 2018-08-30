<template>
  <div>
    <section class="real-app">
      <input type="text" class="add-input" autofocus="autofocus" placeholder="接下来要做什么" @keyup.enter="addTodo">
      <item
        :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deletetodo">
      </item>
      <tabs :filter="filter" :todos="todos" @toggle="toggle" @clearAllCompleted="clearAllCompleted"></tabs>
    </section>
  </div>
</template>

<script>
import item from './item.vue'
import tabs from './tabs.vue'
let id = 0
export default {
  beforeRouteEnter (to, from, next) {
    console.log('todo的守卫开始了')
    next(vm => {
      console.log('获取data数据 filter', vm.filter)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('todo的守卫更新了')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo的守卫离开了')
    if (window.confirm('真的真的退出吗')) {
      next()
    } else {}
  },
  components: {
    item,
    tabs
  },
  data () {
    return {
      todos: [],
      filter: '全部'
    }
  },
  computed: {
    filteredTodos () {
      if (this.filter === '全部') {
        return this.todos
      } else if (this.filter === '代做事项') {
        return this.todos.filter(todo => todo.completed === false)
      } else if (this.filter === '完成事项') {
        return this.todos.filter(todo => todo.completed === true)
      }
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deletetodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggle (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => {
        return todo.completed === false
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
