<template>
  <div id="app">
    <div id="cover"></div>
    <headers></headers>
    {{ counter }}
    {{ fullName }}
    <router-link to="/app/12"> app </router-link>
    <router-link to="/login"> login </router-link>

    <router-link to="/app/123"> exact </router-link>
    <transition name="fade">
      <router-view />
    </transition>

    <footers></footers>
  </div>
</template>

<script>
import headers from './views/layout/header.vue'
import footers from './views/layout/footer.jsx'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {

  components: {
    headers,
    footers
  },
  data () {
    return {
      data: 'vue'
    }
  },
  mounted () {
    // let i = 1
    setInterval(() => {
      // this.updateCount(i++)
      this.updateCountSync({
        num: 1,
        time: 1000
      })
    }, 2000)
  },
  computed: {
    ...mapState({
      counter: (state) => {
        return state.count
      },
      textA: state => state.a.text
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters({
      'fullName': 'fullName',
      'textPlus': 'a/textPlus'
    })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapActions(['updateCountSync', 'a/add']),
    ...mapMutations(['updateCount', 'a/updateText'])
  }
}
</script>
<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #555;
  opacity: 0.4;
  z-index: -1;
}
</style>
