<template>
  <i
      ref="mainRef"
      class="material-icons mdc-text-field__icon"
      :class="{
        'mdc-text-field__icon--leading': leading,
        'mdc-text-field__icon--trailing': trailing,
      }"
      tabindex="0"
      role="button"
      @click="redirectFocusBackToInput"
  ><slot></slot></i>
</template>

<script setup lang="ts">
import { MDCTextFieldIcon } from '@material/textfield/icon'
import { onMounted, ref } from 'vue'

const props = defineProps({
  leading: {
    type: Boolean,
    default: () => true,
  },
  trailing: Boolean,
})

const mainRef = ref<HTMLElement|null>(null)
const mdcIcon = ref<MDCTextFieldIcon|null>(null)
onMounted(() => {
  if (mainRef.value) mdcIcon.value = new MDCTextFieldIcon(mainRef.value)
})

function redirectFocusBackToInput(event: MouseEvent) {
  let input: HTMLInputElement|null|undefined = (event.target as HTMLElement)
    ?.parentElement?.querySelector('input.mdc-text-field__input')
  if (input) input.focus()
}
</script>

<style scoped lang="scss">
@use "@material/textfield/icon";

@include icon.icon-core-styles;
</style>