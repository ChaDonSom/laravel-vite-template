<template>
  <li
      :class="{ 'mdc-deprecated-list-item--selected': selected }"
      class="mdc-deprecated-list-item"
      :aria-selected="selected"
      :data-value="modelValue"
      role="option"
  >
    <span class="mdc-deprecated-list-item__ripple"></span>
    <span class="mdc-deprecated-list-item__text">
      <slot></slot>
    </span>
  </li>
</template>

<script lang="ts" setup>
import { computed, inject, type Ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: () => ''
  }
})

const selectValue = inject('select-value') as Ref<string|number>
const selected = computed(() => props.modelValue == selectValue.value)
</script>