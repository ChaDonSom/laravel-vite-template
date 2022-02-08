<template>
  <!--
    The wrapping <div> allows us to apply Tailwind classes to our button, without MDC overwriting it.
  -->
  <div>
    <div class="mdc-touch-target-wrapper" ref="mainRef">
      <button
          class="mdc-button mdc-button--touch"
          :class="{
            'mdc-button--raised': raised,
            'secondary': secondary
          }"
      >
        <span class="mdc-button__ripple"></span>
        <span class="mdc-button__touch"></span>
        <span class="mdc-button__focus-ring"></span>
        <i class="material-icons mdc-button__icon" aria-hidden="true" v-if="$slots['leading-icon']">
          <slot name="leading-icon" />
        </i>
        <span class="mdc-button__label"><slot /></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { MDCRipple } from '@material/ripple'


export default defineComponent({
  props: {
    raised: Boolean,
    secondary: Boolean,
  },
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

.mdc-button {
  @include button.shape-radius(mdc-theme.$button-shape-radius);
  &.secondary {
    @include button.ink-color(mdc-theme.$secondary);
    .mdc-button__ripple::before, .mdc-button__ripple::after {
      --mdc-text-button-hover-state-layer-color: #{mdc-theme.$secondary};
    }
  }
  &.mdc-button--raised {
    @include button.filled-accessible(mdc-theme.$primary);
    &.secondary {
      @include button.filled-accessible(mdc-theme.$secondary);
    }
  }
}
</style>