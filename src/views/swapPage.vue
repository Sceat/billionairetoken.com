<template lang="pug">
    section.page
        navbl
        swap
        xbl-footer
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    xblFooter: () => import('@cmp/swap/xblFooter.vue'),
    swap: () => import('@cmp/swap/swap.vue'),
    navbl: () => import('@cmp/swap/navbar.vue')
  }
})
export default class SwapPage extends Vue { }
</script>
