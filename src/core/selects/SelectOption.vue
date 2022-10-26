<template>
  <li
      :class="{ 'mdc-deprecated-list-item--selected': selected }"
      class="mdc-deprecated-list-item"
      :aria-selected="selected"
      role="option"
  >
    <span class="mdc-deprecated-list-item__ripple"></span>
    <span class="mdc-deprecated-list-item__text">
      <slot></slot>
    </span>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  selected: {
    type: Boolean,
    default: () => false,
  },
})
</script>