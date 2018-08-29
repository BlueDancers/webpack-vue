import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
  <div>
    {{ isActive ? 'active':'no!!'}}
  </div>`,
  data: {
    isActive: false
  }
})
