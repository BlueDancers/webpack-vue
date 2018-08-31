import Vuex from 'vuex'
import state from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: state,
    mutations, // 同步方法
    getters, // 处理state
    actions, // 异步方法
    plugins: [
      (store) => {
        console.log('plugins 加载了')
      }
    ]
  })
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}

// modules: {
//   a: {
//     namespaced: true,
//     state: {
//       text: 1
//     },
//     mutations: {
//       updateText(state, text) {
//         console.log(state)
//         state.text = text
//       }
//     },
//     getters: {
//       textPlus(state, getters, rootState) { // 第二参数是所有getters的方法 第三参数是全局的state
//         return `我是${state.text},全局state${rootState.count},b的state${rootState.b.text}`
//       }
//     },
//     actions: {
//       add({
//         state,
//         commit,
//         rootState
//       }) {
//         // commit('updateText', 20)
//         commit('updateCount', 100, {
//           root: true
//         }) // 加上{root: true}就是调用全局的vex的mutations
//       }
//     }
//   },
//   b: {
//     state: {
//       text: 2
//     }
//   }
// }
