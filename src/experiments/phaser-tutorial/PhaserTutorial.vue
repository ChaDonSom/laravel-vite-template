<template>
  <div class="w-screen h-screen">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

if (route.matched.length == 1) router.replace({ name: 'phaser-tutorial-start' })
</script>

<style scoped lang="scss">
@use "@/css/mdc-theme";
@use "@material/typography";
@include typography.core-styles;
</style>
