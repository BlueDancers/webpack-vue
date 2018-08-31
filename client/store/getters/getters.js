export default { // 可以理解为computed
  fullName (state) {
    return `姓名:${state.name},年龄:${state.count}`
  }
}
