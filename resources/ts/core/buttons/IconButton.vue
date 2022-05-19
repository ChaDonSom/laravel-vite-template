<template>
<button
    ref="mainRef"
    class="mdc-icon-button material-icons"
    :class="{ [`density-${density}`]: density }"
>
  <div class="mdc-icon-button__ripple"></div>
  <span class="mdc-icon-button__focus-ring"></span>
  <slot />
</button>
</template>

<script setup lang="ts">
import { MDCRipple } from '@material/ripple';
import { onMounted, ref } from 'vue';

const props = defineProps({
  density: {
    type: Number,
    default: () => 0,
  },
})

const mainRef = ref(null)
const iconButtonRipple = ref<MDCRipple|null>(null)
onMounted(() => {
  if (mainRef.value) {
    iconButtonRipple.value = new MDCRipple(mainRef.value);
    iconButtonRipple.value.unbounded = true;
  }
})
</script>

<style scoped lang="scss">
@use "@/css/mdc-theme";
@use "@material/icon-button/icon-button";
@use "@material/icon-button/icon-button-theme";
@include icon-button.core-styles;

$densities: (-5, -4, -3, -2, -1);

.mdc-icon-button {
  @each $density in $densities {
    &.density-#{$density} {
      @include icon-button-theme.density($density);
    }
  }
}
</style>