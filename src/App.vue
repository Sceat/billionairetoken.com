<template lang="pug">
    main
      router-view
      utils
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    utils: () => import('@cmp/utils/index.vue')
  }
})
export default class App extends Vue { }
</script>

<style lang="stylus">
@require '~@stl/utils'
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,500,900')

:root
  font-size 18px

*
  sc-reset()
  sc-disableScollBar()
  font-family 'Roboto', sans-serif
  outline none
  scroll-behavior smooth

  a
    :active
      color #e1c79b
      fill #e1c79b
</style>
