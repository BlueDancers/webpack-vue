import Vue from 'vue'

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
  props: ['value', 'prop1'],
  // template: `
  //   <div :style="style">
  //   <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement('div', {
      style: this.style,
      on: {
        click: () => { this.$emit('click') }
      }
    }, [this.$slots.name, this.prop1])
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
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
  // template: `
  // <div>
  //   <comp ref="comp">
  //     <span ref="span">{{ value }}</span>
  //   </comp>
  // </div>`,
  render (createElement) {
    return createElement(
      'comp',
      {
        ref: 'comp',
        props: {
          prop1: '我是prop1'
        },
        on: {
          click: this.headleclick
        },
        nativeOn: {
          click: this.headleclick // 会自动绑定到更加点上面,就不需要子组件触发了
        }
      },
      [createElement('span', {
        ref: 'span',
        slot: 'name', // 指定插槽,需要子节点指定this.$slots.name
        domProps: {
          innerHTML: '<span>111111</span>' // 指定dom
        },
        attrs: {
          id: 'myid' // 指定id
        }
      }, this.value)])
  },
  data: {
    value: '我是父组件'
  },
  mounted () {
    // console.log(this.$refs.comp.values = 'dsadas') // 可以操作子组件,但是最好不要这么做
    console.log(this.$refs.span)
  },
  methods: {
    headleclick () {
      console.log('执行')
    }
  }
})
