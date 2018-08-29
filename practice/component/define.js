import Vue from 'vue'

const component = {
  // props: {
  //   active: Boolean,
  //   propOne: String
  // },
  // props: ['active', 'propOne'],
  props: {
    active: {
      type: Boolean,
      required: true, // 必须存在
      // default: true, // 默认值为true,但是注意required和default不会同时存在
      // default () { // 假如是方法必须要return 防止数据发生冲突
      //   return {

      //   }
      // }
      //
      validator (value) { // 通过validator自定义规则
        return typeof value === 'boolean'
      }
    },
    propOne: {
      type: String
    }
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
    <comp ref="comp1" :active="!active" prop-one="comp1" @onChange="onChange"> </comp>
    <comp :active="active" prop-one="222"> </comp>
  </div>`,
  data: {
    active: true
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  methods: {
    onChange () {
      this.active = !this.active
    }
  }
})
