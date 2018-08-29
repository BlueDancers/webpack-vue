import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
  <div>
    <input v-model='text' />
    <span @click="handleChange">this is me</span>
    <span v-show="active"> {{ propOne }}</span>
  </div>`,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      this.$emit('onChange')
    }
  }
}

new Vue({
  components: {
    Comp: component
  },
  el: '#root',
  template: `
  <div>
    <comp :active="!active" prop-one="111" @onChange="onChange"> </comp>
    <comp :active="active" prop-one="222"> </comp>
  </div>`,
  data: {
    active: true
  },
  methods: {
    onChange () {
      this.active = !this.active
    }
  }
})
