import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
  <div>
    <p> Name: {{ name }}</p>
     <p>  getName: {{ getName() }}</p>
     <p><input v-model='fullName'></p>
     <p><input v-model='latsName'></p>
     <p><input v-model='firstName'></p>
  </div>`,
  data: {
    firstName: 'vkcyan',
    latsName: 'Wu',
    number: 0,
    fullName: ''
  },
  computed: {
    name () {
      console.log('complate invokes')
      return this.firstName + ' ' + this.latsName
    }
  },
  watch: {
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + ' ' + this.latsName
      },
      immediate: true
    }
  },
  methods: {
    getName () {
      console.log('getName invokes')
      return this.firstName + ' ' + this.latsName
    }
  }
})
