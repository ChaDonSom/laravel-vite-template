<template>
  <div class="modal-mask bg-neutral-500/50 backdrop-blur-2xs" @click.self="$emit('close')" ref="elRef">
    <div class="modal-wrapper" @click.self="$emit('close')">
      <div class="modal-container" ref="containerRef">
        <div class="sticky top-0 bg-white z-10 top-shadow"
            :class="{
              'pb-1': $slots.title,
              'border-b-2 border-gray-300': scrollable,
              'scrolled-down border-gray-500': scrollable && !scroll.arrivedState.top,
            }"
        >
          <slot name="title" />
        </div>
        <slot />
        <div class="sticky bottom-0 bg-white bottom-shadow"
            :class="{
              'h-2': !$slots.actions,
              'border-t-2 border-gray-300': scrollable,
              'scrolled-up border-gray-500': scrollable && !scroll.arrivedState.bottom,
            }"
        >
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize, useScroll, useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'

const elRef = ref(null)
const containerRef = ref<HTMLElement | null>(null)
const scrollable = ref(false)
const scroll = useScroll(containerRef, {
  offset: {
    bottom: 4 // Allows the bottom sticky that comes up slightly to still register as the bottom of the modal
  }
})
const { width, height } = useWindowSize()
const { width: eWidth, height: eHeight } = useElementSize(containerRef)
watch(
  () => width.value + height.value + eWidth.value + eHeight.value,
  () => {
    scrollable.value = (containerRef.value?.scrollHeight ?? 0) > (containerRef.value?.clientHeight ?? 0)
  }
)
</script>

<style scoped lang="scss">
.border-t-2 {
  border-top-style: solid;
}

.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity .3s ease;
  display: flex;
  flex-direction: column;
}

.modal-wrapper {
  max-height: 95%;
  margin-top: auto;
  margin-bottom: auto;
  // overflow-y: auto;
}

.modal-container {
  width: fit-content;
  max-width: 80%;
  max-height: 95vh;
  margin: 0px auto;
  padding-left: 30px;
  padding-right: 30px;
  border-width: 0px;
  border-style: dashed;
  border-top: 20px dashed white;
  border-bottom: 20px dashed white;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .2s ease-in;
  overflow-y: auto;
  overflow-x: hidden;
}

.full-height-modal {
  .modal-container {
    height: 90%;
    overflow-y: auto;
  }
}

.top-shadow, .bottom-shadow {
  z-index: 2;
  overflow: visible;
  transition: border 200ms ease-out;
  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 5px;
    width: 110%;
    left: -5%;
    background-color: white;
    z-index: 1;
  }
  &::after {
    opacity: 0;
    transition: opacity 200ms ease-out;
    content: "";
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    // left: 1%;
    box-shadow: 0 0 4px rgb(0 0 0 / 0.8);
    z-index: 0;
  }
  &.scrolled-up::after, &.scrolled-down::after {
    opacity: 1;
  }
}

.top-shadow::before {
  bottom: 0;
}
.top-shadow::after {
  bottom: -2px;
}
.bottom-shadow::before {
  top: 0;
}
.bottom-shadow::after {
  top: -2px;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}
</style>