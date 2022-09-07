<template>
  <IconButton class="mdc-snackbar__dismiss" primary>
    <slot></slot>
  </IconButton>
</template>

<script lang="ts" setup>
import IconButton from '@/core/buttons/IconButton.vue';
</script>

<style lang="scss" scoped>
</style>