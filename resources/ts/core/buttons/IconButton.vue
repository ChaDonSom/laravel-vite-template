<template>
<button class="mdc-icon-button material-icons" ref="mainRef">
  <div class="mdc-icon-button__ripple"></div>
  <span class="mdc-icon-button__focus-ring"></span>
  <slot />
</button>
</template>

<script setup lang="ts">
import { MDCRipple } from '@material/ripple';
import { onMounted, ref } from 'vue';

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
@use "@material/icon-button/styles";
</style>