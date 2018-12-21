<i18n>
en:
    copy: "Copyright {cc} 2017-2019 Billionaire Token. All Rights Reserved"
</i18n>

<template lang="pug">
    footer
        picture(:class="$mq")
          source(srcset="@rs/oaia.webp" type="image/webp")
          img(src="@rs/oaia.png" alt="the sheep")
        i18n(path="copy")
            span(place="cc") &copy
</template>

<style lang="stylus" scoped>
footer
  width 100%
  height 100vh
  position fixed
  top 0
  background #373737
  color #999999
  display flex
  flex-flow column nowrap
  justify-content flex-end
  align-items center

  picture
    animation walk 40s linear infinite

  img
    width 150px
    animation sheep 1.5s linear infinite alternate

  >:last-child
    margin 1em
    font-size 14px

@keyframes sheep
  from
    transform rotate(-5deg)

  to
    transform rotate(5deg)

@keyframes walk
  0%
    transform translateX(-200px) scaleX(1)

  49%
    transform translateX(200px) scaleX(1)

  50%
    transform translateX(200px) scaleX(-1)

  99%
    transform translateX(-200px) scaleX(-1)

  100%
    transform translateX(-200px) scaleX(1)
</style>

