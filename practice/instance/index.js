import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">this is {{ text }}{{ obj.a }}</div>',
  data: {
    text: 1,
    obj: {}
  }
})
app.$mount('#root')

// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// let i = 0
setInterval(() => {
  // i++
  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1

  // app.obj.a = i
  // app.$set(app.obj, 'a', i) // 这是给app.obj补充一个元素
  // app.$forceUpdate() // 强制渲染
  // app.$options.data.text += 1
  // app.$data.text += 1
}, 1000)

// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
console.log(app.$root)// app.$root === app
console.log(app.$children) // 子组件
console.log(app.$slots) // 插槽
console.log(app.$scopedSlots)
console.log(app.$refs)
console.log(app.$isServer) // 判断服务端还是客户端
// console.log(app.$watch)
// const unWatch = app.$watch('text', (newText, oldtext) => {
//   console.log(`${newText}:${oldtext}`)
//   // 第一参数的新值 第二参数是旧值
// })
// setTimeout(() => {
//   unWatch() // 3秒后注销watch方法  假如写在new Vue里面 当vue注销,watch会自动注销
// }, 3000)

// on事件
// app.$once('test', (a, b) => {
//   console.log(`第一参数${a}第二参数${b}`) // once 只能执行一次
// })

app.$on('test', (a, b) => {
  console.log(`第一参数${a}第二参数${b}`) // on可以多次执行
})

setInterval(() => {
  app.$emit('test', 1, 2) // 这就是子组件给父组件传值,
}, 2000)
