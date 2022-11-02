<template>
  <div class="m-4 inline-flex gap-3">
    <button
        :id="`basic-switch-${randomId}`"
        class="mdc-switch"
        :class="{
          'mdc-switch--unselected': !modelValue,
          'mdc-switch--selected': modelValue
        }"
        type="button"
        role="switch"
        :aria-checked="modelValue"
        ref="mdcSwitchEl"
        :disabled="disabled"
    >
      <div class="mdc-switch__track"></div>
      <div class="mdc-switch__handle-track">
        <div class="mdc-switch__handle">
          <div class="mdc-switch__shadow">
            <div class="mdc-elevation-overlay"></div>
          </div>
          <div class="mdc-switch__ripple"></div>
          <div class="mdc-switch__icons">
            <!-- <svg class="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24">
              <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
            </svg> -->
            <!-- <svg class="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24">
              <path d="M20 13H4v-2h16v2z" />
            </svg> -->
          </div>
        </div>
      </div>
      <span class="mdc-switch__focus-ring-wrapper">
        <div class="mdc-switch__focus-ring"></div>
      </span>
    </button>
    <label :for="`basic-switch-${randomId}`">
      <slot v-if="$slots.default"></slot>
      <span v-if="!$slots.default && label">{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { MDCSwitch } from '@material/switch'
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  }
})

const emit = defineEmits([
  'update:modelValue'
])

const randomId = ref(Math.round(Math.random() * 100000).toFixed(0))
const mdcSwitchEl = ref<HTMLButtonElement|null>(null)
const mdcSwitch = ref<MDCSwitch|null>(null)
watch(
  () => mdcSwitchEl.value,
  () => {
    if (mdcSwitchEl.value) {
      mdcSwitch.value = new MDCSwitch(mdcSwitchEl.value)
      mdcSwitch.value.listen('click', () => {
        emit('update:modelValue', mdcSwitch.value?.selected)
      })
    }
  }
)

watch(
  () => props.disabled,
  () => {
    if (mdcSwitch.value) {
      mdcSwitch.value.disabled = props.disabled
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@use "@/css/mdc-theme";
@use '@material/switch';
@use '@material/switch/styles';
@use '@material/theme/color-palette';
@use '@material/theme/shadow-dom';

.mdc-switch {
  @include switch.theme((
    track-height: 22px,
    track-shape: 44px,
    handle-height: 18px,
    handle-width: 18px
  ))
}
</style>