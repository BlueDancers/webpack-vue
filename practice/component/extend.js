import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: Number
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
  mounted () {
    console.log('数据挂载完成')
  },
  methods: {
    handleChange () {
      this.$emit('onChange')
    }
  }
}

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  extends: component,
  mounted () {
    console.log(this.$parent.$options.name) // 获取父组件的名称
    this.$parent.text = 2333333 // 通过$parent可以直接修改父组件的值
  }
}

new Vue({
  name: 'root',
  parent: parent,
  el: '#root',
  components: {
    Comp: component2
  },
  mounted () {
    console.log(this.$parent.$options.name) // 获取父组件的名称
  },
  data () {
    return {
      propOne: 'component2', // 可以覆盖原有的数据
      active: true,
      text: 22222
    }
  },
  template: `
  <div>
    <comp :active="active" :prop-one="text" @onChange="onChange"> </comp>
  </div>`,
  methods: {
    onChange () {
      this.active = !this.active
    }
  }
})

// const CompVue = Vue.extend(component) // extend 组件的拓展

// new CompVue({
//   el: '#root',
//   propsData: { // 注意这里是propsData
//     propOne: '我是CompVue', // 可以覆盖原有的数据
//     active: true
//   },
//   mounted () {
//     console.log('组件数据挂载完成')
//   },
//   data: {
//     text: 111 // 也会覆盖
//   }
// })

// new Vue({
//   components: {
//     Comp: component
//   },
//   el: '#root',
//   template: `
//   <div>
//     <comp :active="active" prop-one="111" @onChange="onChange"> </comp>
//   </div>`,
//   data: {
//     active: true
//   },
//   methods: {
//     onChange () {
//       this.active = !this.active
//     }
//   }
// })
