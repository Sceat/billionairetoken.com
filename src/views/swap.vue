<template lang="pug">
    main
        swap
        xbl-footer
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    xblFooter: () => import('@cmp/swap/xblFooter.vue'),
    swap: () => import('@cmp/swap/swap.vue')
  }
})
export default class Home extends Vue {
}
</script>
