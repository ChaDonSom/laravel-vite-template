<template>
  <th
      class="mdc-data-table__header-cell"
      :class="{ 'mdc-data-table__header-cell--numeric': numeric }"
  >
    <slot></slot>
  </th>
</template>

<script lang="ts" setup>
defineProps({
  numeric: {
    type: Boolean,
    required: false,
    default: () => false,
  }
})
</script>

<style scoped lang="scss">
</style>