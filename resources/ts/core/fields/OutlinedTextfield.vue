<template>
  <div class="m-2 mt-4">
    <label class="mdc-text-field mdc-text-field--outlined" ref="mainRef">
      <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <span class="mdc-floating-label" :id="`textfield-label-${id}`"><slot /></span>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>
      <input
          :id="`textfield-input-${id}`"
          :type="type ?? 'text'"
          class="mdc-text-field__input"
          :aria-labelledby="`textfield-label-${id}`"
          :value="modelValue"
          :autofocus="autofocus"
          v-bind="bindableAttributes"
          @focus="autoselect ? ($event.target as HTMLInputElement).select() : null"
          @input="$emit('update:modelValue', ($event?.target as HTMLInputElement)?.value)"
      >
    </label>
    <div class="mdc-text-field-helper-line max-w-fit">
      <div 
          id="my-helper-id" 
          class="mdc-text-field-helper-text"
          aria-hidden="true"
          :style="{ opacity: 1, color: error ? 'rgb(181 30 30)' : undefined }"
      >
        {{ error ? error : (helper ? helper : '') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDCTextField } from '@material/textfield'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: String,
  error: String,
  helper: String,
  autoselect: Boolean,
  autofocus: Boolean,
  step: [String, Number],
})

const bindableAttributes = computed(() => {
  let result: { [key: string]: any } = {}
  if (props.step) result.step = props.step
  return result
})

const id = ref(Math.floor(Math.random() * 10000000))
const mainRef = ref<Element | null>(null)
const mdcTextfield = ref<MDCTextField | null>(null)
onMounted(() => {
  if (mainRef.value) mdcTextfield.value = new MDCTextField(mainRef.value)
  if (props.autofocus) mainRef.value?.querySelector('input')?.focus()
})
</script>

<style scoped lang="scss">
@use "@/css/mdc-theme";
@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";

@include textfield.core-styles;

.mdc-text-field {
  @include textfield.outline-shape-radius(mdc-theme.$textfield-shape-radius);
  // @include textfield.outlined-density(-4);
}

// Tailwind 'undo' RE MDC mess-up, recommended by Adam Wathan (fixes tons of borders showing up on focus in MDC)
*,
*::before,
*::after {
  border-width: 1px;
  border-style: none;
}

// For some reason, if we don't have this, date-type inputs don't show the calendar icon
input[type="date"]::-webkit-calendar-picker-indicator {
    display: block;
    -webkit-appearance: button;
}
</style>