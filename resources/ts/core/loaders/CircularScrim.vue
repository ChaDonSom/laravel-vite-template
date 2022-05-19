<template>
  <Teleport to="body">
    <transition name="circular-scrim" mode="out-in">
      <div
          v-if="loading"
          class="fixed w-full h-full top-0 left-0 z-50 bg-neutral-500/50 backdrop-blur-2xs flex items-center place-content-center"
      >
        <Circular />
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import Circular from '@/ts/core/loaders/Circular.vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false,
  }
})
</script>

<style scoped lang="scss">
@use "@/css/transitions";
</style>