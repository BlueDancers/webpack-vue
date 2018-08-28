<template>
    <header :class="$style.red">
        <h1>TodoAPP</h1>
    </header>
</template>

<script>
export default {
  created () {
    console.log(this.$style)
  }
}
</script>

<style lang="stylus" module>
.mainheader {
    text-align: center;
    h1 {
        font-size: 100px;
        color: rgba(175, 47, 47, 0.4);
        margin: 20px;
    }
}
.red {
  color: red;
}
</style>

<docs>
#one = 1111
</docs>