import Vue from 'vue'

// const component = {
//   props: ['value'],
//   template: `
//     <div :style="style">
//     </div>
//   `,
//   data () {
//     return {
//       style: {
//         width: '200px',
//         height: '200px',
//         border: '1px solid #aaa'
//       }
//     }
//   },
//   methods: {}
// }

// new Vue({
//   el: '#root',
//   components: {
//     comp: component
//   },
//   template: `
//   <div>
//     <comp></comp>
//   </div>`,
//   data: {},
//   methods: {}
// })

const ChildComponent = {
  template: `
    <div>
      Child component {{data.value}}
    </div>
  `,
  inject: ['yeye', 'data'],
  mounted () {
    console.log(this.yeye, this.data) // 获取父级名称
  }
}

const component = {
  name: 'components',
  components: {
    ChildComponent
  },
  props: ['value'],
  template: `
    <div :style="style">
    <slot :value="values">

    </slot>
    <ChildComponent></ChildComponent>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        border: '1px solid #aaa'
      },
      values: '我是子组件'
    }
  },
  methods: {}
}

new Vue({
  el: '#root',
  components: {
    comp: component
  },
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => {
        return this.value
      }
    })
    return {
      yeye: this,
      data
    }
  },
  template: `
  <div>
    <comp ref="comp">
      <span slot-scope="props" ref="span">
      {{props.value}}

      </span>
    </comp>
    <input v-model="value">
  </div>`,
  data: {
    value: '我是父组件'
  },
  mounted () {
    // console.log(this.$refs.comp.values = 'dsadas') // 可以操作子组件,但是最好不要这么做
    console.log(this.$refs.span)
  },
  methods: {}
})
