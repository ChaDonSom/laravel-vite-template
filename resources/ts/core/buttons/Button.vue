<template>
  <div class="mdc-touch-target-wrapper" ref="mainRef">
    <button class="mdc-button mdc-button--touch">
      <span class="mdc-button__ripple"></span>
      <span class="mdc-button__touch"></span>
      <span class="mdc-button__focus-ring"></span>
      <span class="mdc-button__label"><slot /></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { MDCRipple } from '@material/ripple'


export default defineComponent({
  setup() {
    const mainRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      let mdcButton: HTMLElement | null | undefined = mainRef.value?.querySelector('.mdc-button')
      if (mdcButton) {
        const buttonRipple = new MDCRipple(mdcButton)
      }
    })
    
    return {
      mainRef,
    }
  },
})
</script>

<style lang="scss" scoped>
@use "@/css/mdc-theme"; // modify styles to our specifications
@use "@material/button/styles"; // apply all styles
@use "@material/button"; // allow customizing, via @include button._____
</style>