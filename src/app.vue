<template>
  <div id="app">
    <div id="cover"></div>
    <headers></headers>
    <todo></todo>
    <footers></footers>
  </div>
</template>

<script>
import headers from './todo/header.vue'
import todo from './todo/todo.vue'
import footers from './todo/footer.jsx'
export default {
  components: {
    headers,
    footers,
    todo
  },
  data() {
    return {
      data: 'vue'
    }
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