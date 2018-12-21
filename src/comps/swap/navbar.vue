<i18n>
en:
    swap: "The Billionaire Token swapping"
</i18n>

<template lang="pug">
    nav
        picture(:class="$mq")
          source(srcset="@rs/logo.webp" type="image/webp")
          img(src="@rs/logo.png" alt="the sheep")
        h1(v-t="'swap'")
</template>

<style lang="stylus" scoped>
nav
  position relative
  z-index 5
  display flex
  flex-flow row nowrap
  justify-content space-between
  background #212121
  border-bottom 1px solid white

  img
    width 220px
    margin 1em 2em

  h1
    font-weight 300
    align-self flex-end
    padding 0 .5em .3em
    color #ffb400
    font-size 1.2em
</style>
