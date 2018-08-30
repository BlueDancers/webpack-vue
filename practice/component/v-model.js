import Vue from 'vue'

const component = {
  props: ['value'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value">
    </div>
  `,
  methods: {
    handleInput (e) {
      console.log(e.target.value)
      this.$emit('handleInput', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    comp: component
  },
  template: `
  <div>
    <comp v-model="value"></comp>
  </div>`,
  data: {
    value: 200
  },
  methods: {
    headleInput (e) {
      console.log(e)
    }
  }
})
