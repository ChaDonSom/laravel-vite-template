<template>
  <IconButton class="mdc-snackbar__dismiss" primary>
    <slot></slot>
  </IconButton>
</template>

<script lang="ts" setup>
import Button from '@/ts/core/buttons/Button.vue';
import IconButton from '@/ts/core/buttons/IconButton.vue';
</script>

<style lang="scss" scoped>
</style>