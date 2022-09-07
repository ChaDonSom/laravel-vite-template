<template>
  <Teleport to="body">
    <aside class="mdc-snackbar" ref="elRef">
      <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
        <div class="mdc-snackbar__label" aria-atomic="false">
          <slot></slot>
        </div>
        <div class="mdc-snackbar__actions" aria-atomic="true">
          <slot name="actions"></slot>
        </div>
      </div>
    </aside>
  </Teleport>
</template>

<script lang="ts" setup>
import { MDCSnackbar } from '@material/snackbar';
import { onMounted, ref } from 'vue';

const emit = defineEmits([
  'opening', 'opened', 'closing', 'closed'
])
const props = defineProps({
  /**
    Default: 5 seconds; min 1000 max 10000 | -1 for indefinite 
   */
  timeout: {
    type: Number,
    default: () => 5000
  }
})

const snackbar = ref<MDCSnackbar|null>(null)
const elRef = ref<HTMLElement|null>(null)
onMounted(() => {
  if (elRef.value) snackbar.value = new MDCSnackbar(elRef.value)
  if (snackbar.value) {
    snackbar.value.timeoutMs = props.timeout
    snackbar.value.open()
    snackbar.value.listen('MDCSnackbar:opening', event => emit('opening', event))
    snackbar.value.listen('MDCSnackbar:opened',  event => emit('opened', event))
    snackbar.value.listen('MDCSnackbar:closing', event => emit('closing', event))
    snackbar.value.listen('MDCSnackbar:closed',  event => emit('closed', event))
  }
})
</script>

<style lang="scss" scoped>
@use "@/css/mdc-theme";
@use "@material/snackbar/mdc-snackbar";
</style>